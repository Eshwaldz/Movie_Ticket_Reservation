const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");

const Theatre = require("../models/theatreModel");
const Show = require("../models/showModel");

/**
 * เส้นทางสำหรับเพิ่มโรงภาพยนตร์ใหม่
 * @name POST /api/theatres/add-theatre
 * @function
 * @memberof theatreRoutes
 * @inner
 * @param {Object} req - อ็อบเจ็กต์คำขอ Express
 * @param {Object} req.body - ข้อมูลโรงภาพยนตร์ที่จะเพิ่ม
 * @param {Object} res - อ็อบเจ็กต์คำตอบ Express
 * @returns {Object} สถานะและข้อความสำเร็จหรือข้อความผิดพลาด
 */
router.post("/add-theatre", authMiddleware, async (req, res) => {
  try {
    const newTheatre = new Theatre(req.body);
    await newTheatre.save();
    res.send({
      success: true,
      message: "Theatre ADDED",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

/**
 * เส้นทางสำหรับดึงข้อมูลโรงภาพยนตร์ทั้งหมด
 * @name GET /api/theatres/get-all-theatres
 * @function
 * @memberof theatreRoutes
 * @inner
 * @param {Object} req - อ็อบเจ็กต์คำขอ Express
 * @param {Object} res - อ็อบเจ็กต์คำตอบ Express
 * @returns {Object} สถานะและข้อความสำเร็จพร้อมกับอาร์เรย์ของโรงภาพยนตร์หรือข้อความผิดพลาด
 */
router.get("/get-all-theatres", authMiddleware, async (req, res) => {
  try {
    const theatres = await Theatre.find()
      .populate("owner")
      .sort({ createdAt: -1 });
    res.send({
      success: true,
      message: "Theatres fetched",
      data: theatres,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

/**
 * เส้นทางสำหรับดึงข้อมูลโรงภาพยนตร์โดยเจ้าของ
 * @name POST /api/theatres/get-all-theatres-by-owner
 * @function
 * @memberof theatreRoutes
 * @inner
 * @param {Object} req - อ็อบเจ็กต์คำขอ Express
 * @param {Object} req.body - ข้อมูลคำขอ
 * @param {string} req.body.owner - รหัสเจ้าของโรงภาพยนตร์
 * @param {Object} res - อ็อบเจ็กต์คำตอบ Express
 * @returns {Object} สถานะและข้อความสำเร็จพร้อมกับอาร์เรย์ของโรงภาพยนตร์หรือข้อความผิดพลาด
 */
router.post("/get-all-theatres-by-owner", authMiddleware, async (req, res) => {
  try {
    const theatres = await Theatre.find({ owner: req.body.owner }).sort({
      createdAt: -1,
    });
    res.send({
      success: true,
      message: "Theatres fetched by owner",
      data: theatres,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

/**
 * เส้นทางสำหรับอัปเดตข้อมูลโรงภาพยนตร์
 * @name POST /api/theatres/update-theatre
 * @function
 * @memberof theatreRoutes
 * @inner
 * @param {Object} req - อ็อบเจ็กต์คำขอ Express
 * @param {Object} req.body - ข้อมูลคำขอ
 * @param {string} req.body.theatreId - รหัสโรงภาพยนตร์ที่จะอัปเดต
 * @param {Object} req.body - ข้อมูลที่ต้องการอัปเดต
 * @param {Object} res - อ็อบเจ็กต์คำตอบ Express
 * @returns {Object} สถานะและข้อความสำเร็จหรือข้อความผิดพลาด
 */
router.post("/update-theatre", authMiddleware, async (req, res) => {
  try {
    await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);
    res.send({
      success: true,
      message: "Theatre updated",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

/**
 * เส้นทางสำหรับลบข้อมูลโรงภาพยนตร์
 * @name POST /api/theatres/delete-theatre
 * @function
 * @memberof theatreRoutes
 * @inner
 * @param {Object} req - อ็อบเจ็กต์คำขอ Express
 * @param {Object} req.body - ข้อมูลคำขอ
 * @param {string} req.body.theatreId - รหัสโรงภาพยนตร์ที่จะลบ
 * @param {Object} res - อ็อบเจ็กต์คำตอบ Express
 * @returns {Object} สถานะและข้อความสำเร็จหรือข้อความผิดพลาด
 */
router.post("/delete-theatre", authMiddleware, async (req, res) => {
  try {
    await Theatre.findByIdAndDelete(req.body.theatreId);
    res.send({
      success: true,
      message: "Theatre deleted",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

/**
 * เส้นทางสำหรับเพิ่มการแสดงภาพยนตร์ใหม่
 * @name POST /api/theatres/add-show
 * @function
 * @memberof theatreRoutes
 * @inner
 * @param {Object} req - อ็อบเจ็กต์คำขอ Express
 * @param {Object} req.body - ข้อมูลคำขอ
 * @param {Object} res - อ็อบเจ็กต์คำตอบ Express
 * @returns {Object} สถานะและข้อความสำเร็จหรือข้อความผิดพลาด
 */
router.post("/add-show", authMiddleware, async (req, res) => {
  try {
    const newShow = new Show(req.body);
    await newShow.save();
    res.send({
      success: true,
      message: "Show added",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

/**
 * เส้นทางสำหรับดึงข้อมูลการแสดงทั้งหมดโดยใช้โรงภาพยนตร์
 * @name POST /api/theatres/get-all-shows-by-theatre
 * @function
 * @memberof theatreRoutes
 * @inner
 * @param {Object} req - อ็อบเจ็กต์คำขอ Express
 * @param {Object} req.body - ข้อมูลคำขอ
 * @param {string} req.body.theatreId - รหัสโรงภาพยนตร์
 * @param {Object} res - อ็อบเจ็กต์คำตอบ Express
 * @returns {Object} สถานะและข้อความสำเร็จพร้อมกับอาร์เรย์ของการแสดงหรือข้อความผิดพลาด
 */
router.post("/get-all-shows-by-theatre", authMiddleware, async (req, res) => {
  try {
    const shows = await Show.find({ theatre: req.body.theatreId })
      .populate("movie")
      .sort({
        createdAt: -1,
      });

    res.send({
      success: true,
      message: "Shows fetched",
      data: shows,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

/**
 * เส้นทางสำหรับลบการแสดงภาพยนตร์ในโรงภาพยนตร์
 * @name POST /api/theatres/delete-show
 * @function
 * @memberof theatreRoutes
 * @inner
 * @param {Object} req - อ็อบเจ็กต์คำขอ Express
 * @param {Object} req.body - ข้อมูลคำขอ
 * @param {string} req.body.showId - รหัสการแสดงภาพยนตร์ที่จะลบ
 * @param {Object} res - อ็อบเจ็กต์คำตอบ Express
 * @returns {Object} สถานะและข้อความสำเร็จหรือข้อความผิดพลาด
 */
router.post("/delete-show", authMiddleware, async (req, res) => {
  try {
    await Show.findByIdAndDelete(req.body.showId);
    res.send({
      success: true,
      message: "Show deleted",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

/**
 * เส้นทางสำหรับดึงโรงภาพยนตร์ที่ไม่ซ้ำกันทั้งหมดสำหรับภาพยนตร์และวันที่ที่กำหนด
 * @name POST /api/theatres/get-all-theatres-by-movie
 * @function
 * @memberof theatreRoutes
 * @inner
 * @param {Object} req - อ็อบเจ็กต์คำขอ Express
 * @param {Object} req.body - ข้อมูลคำขอ
 * @param {string} req.body.movie - รหัสภาพยนตร์
 * @param {string} req.body.date - วันที่
 * @param {Object} res - อ็อบเจ็กต์คำตอบ Express
 * @returns {Object} สถานะและข้อความสำเร็จพร้อมกับอาร์เรย์ของโรงภาพยนตร์หรือข้อความผิดพลาด
 */
router.post("/get-all-theatres-by-movie", authMiddleware, async (req, res) => {
  try {
    const { movie, date } = req.body;

    // การแสดงภาพยนตร์
    const shows = await Show.find({ movie, date })
      .populate("theatre")
      .sort({ createdAt: -1 });

    // โรงภาพยนตร์ที่ไม่ซ้ำกัน
    let uniqueTheatres = [];
    shows.forEach((show) => {
      const theatre = uniqueTheatres.find(
        (theatre) => theatre._id == show.theatre._id
      );

      if (!theatre) {
        const showsForThisTheatre = shows.filter(
          (showObj) => showObj.theatre._id == show.theatre._id
        );
        uniqueTheatres.push({
          ...show.theatre._doc,
          shows: showsForThisTheatre,
        });
      }
    });

    res.send({
      success: true,
      message: "Theatres fetched successfully",
      data: uniqueTheatres,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

/**
 * เส้นทางสำหรับดึงข้อมูลการแสดงตามรหัสการแสดงที่กำหนด
 * @name POST /api/theatres/get-show-by-id
 * @function
 * @memberof theatreRoutes
 * @inner
 * @param {Object} req - อ็อบเจ็กต์คำขอ Express
 * @param {Object} req.body - ข้อมูลคำขอ
 * @param {string} req.body.showId - รหัสการแสดง
 * @param {Object} res - อ็อบเจ็กต์คำตอบ Express
 * @returns {Object} สถานะและข้อความสำเร็จพร้อมกับข้อมูลการแสดงหรือข้อความผิดพลาด
 */
router.post("/get-show-by-id", authMiddleware, async (req, res) => {
  try {
    const show = await Show.findById(req.body.showId)
      .populate("movie")
      .populate("theatre");
    res.send({
      success: true,
      message: "Show fetched",
      data: show,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;