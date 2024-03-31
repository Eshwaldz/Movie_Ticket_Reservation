const mongoose = require("mongoose");

// กำหนดโครงสร้างข้อมูลสำหรับการจอง
const bookingSchema = new mongoose.Schema(
  {
    show: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shows", // อ้างอิงไปยังโมเดล shows
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // อ้างอิงไปยังโมเดล users
    },
    seats: {
      type: Array,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // เพิ่ม timestamps สำหรับ createdAt และ updatedAt
);

// สร้างและ export โมเดล Booking
module.exports = mongoose.model("bookings", bookingSchema);