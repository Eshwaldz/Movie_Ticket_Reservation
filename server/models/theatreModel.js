const mongoose = require("mongoose");

// กำหนดโครงสร้างข้อมูลสำหรับโรงหนัง
const theatreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // อ้างอิงไปยังโมเดล users
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // เพิ่ม timestamps สำหรับ createdAt และ updatedAt
);

// สร้างและ export โมเดล Theatre
module.exports = mongoose.model("theatres", theatreSchema);