const router = require("express").Router();
const stripe = require("stripe")(process.env.stripe_key);
const authMiddleware = require("../middlewares/authMiddleware");

const Booking = require("../models/bookingModel");
const Show = require("../models/showModel");

/**
 * เส้นทางสำหรับการทำการชำระเงิน
 * @name POST /api/bookings/make-payment
 * @function
 * @memberof bookingRoutes
 * @inner
 * @param {Object} req - อ็อบเจ็กต์คำขอ Express
 * @param {Object} req.body - ข้อมูลคำขอ
 * @param {Object} req.body.token - โทเค็นการชำระเงิน
 * @param {string} req.body.token.email - อีเมลของผู้ใช้
 * @param {string} req.body.token.id - รหัสโทเค็นการชำระเงิน
 * @param {number} req.body.amount - จำนวนเงิน
 * @param {Object} res - อ็อบเจ็กต์คำตอบ Express
 * @returns {Object} สถานะและข้อความสำเร็จพร้อมกับรหัสธุรกรรมหรือข้อความผิดพลาด
 */
router.post("/make-payment", authMiddleware, async (req, res) => {
  try {
    const { token, amount } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const charge = await stripe.charges.create({
      amount: amount,
      currency: "thb",
      customer: customer.id,
      receipt_email: token.email,
      description: "Ticket Booked for Movie",
    });

    const transactionId = charge.id;

    res.send({
      success: true,
      message: "Payment successful",
      data: transactionId,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

/**
 * เส้นทางสำหรับการจองตั๋วการแสดง
 * @name POST /api/bookings/book-show
 * @function
 * @memberof bookingRoutes
 * @inner
 * @param {Object} req - อ็อบเจ็กต์คำขอ Express
 * @param {Object} req.body - ข้อมูลคำขอ
 * @param {Object} req.body.show - รายละเอียดการแสดง
 * @param {string} req.body.show._id - รหัสการแสดง
 * @param {string[]} req.body.seats - อาร์เรย์ของหมายเลขที่นั่ง
 * @param {Object} res - อ็อบเจ็กต์คำตอบ Express
 * @returns {Object} สถานะและข้อความสำเร็จพร้อมกับข้อมูลการจองใหม่หรือข้อความผิดพลาด
 */
router.post("/book-show", authMiddleware, async (req, res) => {
  try {
    // บันทึกการจอง
    const newBooking = new Booking(req.body);
    await newBooking.save();

    const show = await Show.findById(req.body.show);
    // อัปเดตที่นั่ง
    await Show.findByIdAndUpdate(req.body.show, {
      bookedSeats: [...show.bookedSeats, ...req.body.seats],
    });

    res.send({
      success: true,
      message: "Show booked successfully",
      data: newBooking,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

/**
 * เส้นทางสำหรับการดึงข้อมูลการจองทั้งหมดของผู้ใช้
 * @name GET /api/bookings/get-bookings
 * @function
 * @memberof bookingRoutes
 * @inner
 * @param {Object} req - อ็อบเจ็กต์คำขอ Express
 * @param {string} req.body.userId - รหัสผู้ใช้
 * @param {Object} res - อ็อบเจ็กต์คำตอบ Express
 * @returns {Object} สถานะและข้อความสำเร็จพร้อมกับอาร์เรย์ของการจองหรือข้อความผิดพลาด
 */
router.get("/get-bookings", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.body.userId })
      .populate("show")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate("user")
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "theatres",
        },
      });

    res.send({
      success: true,
      message: "Bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;