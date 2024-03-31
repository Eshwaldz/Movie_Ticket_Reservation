const jwt = require("jsonwebtoken");

/**
 * Middleware สำหรับตรวจสอบและยืนยันความถูกต้องของ Token JWT
 * @param {Object} req Object ที่แทนคำขอ (request) ที่ส่งมายังเซิร์ฟเวอร์
 * @param {Object} res Object ที่ใช้สำหรับส่งคำตอบ (response) กลับไปยังผู้ใช้
 * @param {Function} next Callback function ที่ใช้เรียกฟังก์ชัน middleware ถัดไป
 * @return {void}
 */
module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1]; // ดึง Token JWT ออกมาจาก header ของคำขอ
    const decoded = jwt.verify(token, process.env.jwt_secret); // ยืนยันความถูกต้องของ Token และถอดรหัสค่าใน Token
    req.body.userId = decoded.userId; // เพิ่ม userId จาก Token ลงใน req.body
    next(); // เรียกใช้งาน middleware ถัดไป
  } catch (error) {
    res.status(401).send({ success: false, message: "Invalid TK" }); // กรณีเกิดข้อผิดพลาดในการตรวจสอบหรือถอดรหัส Token
  }
};