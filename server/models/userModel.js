const mongoose = require("mongoose");

// กำหนดโครงสร้างข้อมูลสำหรับผู้ใช้
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // ให้ค่าของอีเมล์เป็นค่าที่ไม่ซ้ำกัน
    },
    password: {
      type: String,
      required: true,
    },
    isEmployee: {
      type: Boolean,
      required: true,
      default: false, // ค่าเริ่มต้นเป็น false
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false, // ค่าเริ่มต้นเป็น false
    },
  },
  {
    timestamps: true, // เพิ่ม timestamps สำหรับ createdAt และ updatedAt
  }
);

// สร้างและ export โมเดล User
module.exports = mongoose.model("users", userSchema);