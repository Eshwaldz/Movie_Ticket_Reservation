const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * เส้นทางสำหรับลงทะเบียนผู้ใช้ใหม่
 * @name POST /api/users/register
 * @function
 * @memberof userRoutes
 * @inner
 * @param {Object} req - อ็อบเจ็กต์คำขอ Express
 * @param {Object} req.body - ข้อมูลคำขอ
 * @param {string} req.body.email - อีเมลของผู้ใช้
 * @param {string} req.body.password - รหัสผ่านของผู้ใช้
 * @param {Object} res - อ็อบเจ็กต์คำตอบ Express
 * @returns {Object} สถานะและข้อความสำเร็จหรือข้อความผิดพลาด
 */
router.post("/register", async (req, res) => {
  try {
    // ตรวจสอบอีเมลที่ไม่ซ้ำกัน
    const usersExists = await User.findOne({ email: req.body.email });
    if (usersExists) {
      return res.send({
        success: false,
        message: "This user already exists.",
      });
    }

    // แฮชรหัสผ่าน
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    // บันทึกข้อมูลผู้ใช้
    const newUser = new User(req.body);
    await newUser.save();

    res.send({ success: true, message: "Successfully created a user account!" });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

/**
 * เส้นทางสำหรับเข้าสู่ระบบ
 * @name POST /api/users/login
 * @function
 * @memberof userRoutes
 * @inner
 * @param {Object} req - อ็อบเจ็กต์คำขอ Express
 * @param {Object} req.body - ข้อมูลคำขอ
 * @param {string} req.body.email - อีเมลของผู้ใช้
 * @param {string} req.body.password - รหัสผ่านของผู้ใช้
 * @param {Object} res - อ็อบเจ็กต์คำตอบ Express
 * @returns {Object} สถานะและข้อความสำเร็จพร้อมกับ Token หรือข้อความผิดพลาด
 */
router.post("/login", async (req, res) => {
  try {
    // ตรวจสอบการเข้าสู่ระบบ
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        success: false,
        message: "Incorrect email or password!",
      });
    }

    // ตรวจสอบรหัสผ่าน
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.send({
        success: false,
        message: "Incorrect email or password!",
      });
    }

    // สร้าง Token สำหรับผู้ใช้
    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
      expiresIn: "1d",
    });

    res.send({
      success: true,
      message: "User has logged in successfully.",
      data: token,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

/**
 * เส้นทางสำหรับดึงรายละเอียดผู้ใช้ตามไอดี
 * @name GET /api/users/get-current-user
 * @function
 * @memberof userRoutes
 * @inner
 * @param {Object} req - อ็อบเจ็กต์คำขอ Express
 * @param {string} req.body.userId - ไอดีของผู้ใช้
 * @param {Object} res - อ็อบเจ็กต์คำตอบ Express
 * @returns {Object} สถานะและข้อความสำเร็จพร้อมกับข้อมูลผู้ใช้หรือข้อความผิดพลาด
 */
router.get("/get-current-user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId).select("-password");
    res.send({
      success: true,
      message: "User details fetched!",
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
