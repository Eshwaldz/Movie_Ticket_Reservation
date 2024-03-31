const mongoose = require("mongoose");

// กำหนดโครงสร้างข้อมูลสำหรับหนัง
const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // เพิ่ม timestamps สำหรับ createdAt และ updatedAt
);

// สร้างและ export โมเดล Movie
module.exports = mongoose.model("movies", movieSchema);