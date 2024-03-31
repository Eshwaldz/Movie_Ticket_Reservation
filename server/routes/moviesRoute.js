const router = require("express").Router();
const Movie = require("../models/movieModel");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * เส้นทางสำหรับเพิ่มภาพยนตร์ใหม่
 * @name POST /api/movies/add-movie
 * @function
 * @memberof movieRoutes
 * @inner
 * @param {Object} req - อ็อบเจ็กต์คำขอ Express
 * @param {Object} req.body - ข้อมูลภาพยนตร์ที่จะเพิ่ม
 * @param {Object} res - อ็อบเจ็กต์คำตอบ Express
 * @returns {Object} สถานะและข้อความสำเร็จหรือข้อความผิดพลาด
 */
router.post("/add-movie", authMiddleware, async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.send({
      success: true,
      message: "Movie now added",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

/**
 * เส้นทางสำหรับแสดงภาพยนตร์ทั้งหมด
 * @name GET /api/movies/get-all-movies
 * @function
 * @memberof movieRoutes
 * @inner
 * @param {Object} req - อ็อบเจ็กต์คำขอ Express
 * @param {Object} res - อ็อบเจ็กต์คำตอบ Express
 * @returns {Object} สถานะและข้อความสำเร็จพร้อมกับอาร์เรย์ของภาพยนตร์หรือข้อความผิดพลาด
 */
router.get("/get-all-movies", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.send({
      success: true,
      message: "Movies fetched successfully",
      data: movies,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

/**
 * เส้นทางสำหรับอัปเดตภาพยนตร์
 * @name POST /api/movies/update-movie
 * @function
 * @memberof movieRoutes
 * @inner
 * @param {Object} req - อ็อบเจ็กต์คำขอ Express
 * @param {Object} req.body - ข้อมูลที่จะใช้ในการอัปเดตภาพยนตร์
 * @param {string} req.body.movieId - รหัสภาพยนตร์ที่ต้องการอัปเดต
 * @param {Object} res - อ็อบเจ็กต์คำตอบ Express
 * @returns {Object} สถานะและข้อความสำเร็จหรือข้อความผิดพลาด
 */
router.post("/update-movie", authMiddleware, async (req, res) => {
  try {
    await Movie.findByIdAndUpdate(req.body.movieId, req.body);
    res.send({
      success: true,
      message: "Movie updated",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

/**
 * เส้นทางสำหรับลบภาพยนตร์
 * @name POST /api/movies/delete-movie
 * @function
 * @memberof movieRoutes
 * @inner
 * @param {Object} req - อ็อบเจ็กต์คำขอ Express
 * @param {Object} req.body - ข้อมูลคำขอ
 * @param {string} req.body.movieId - รหัสภาพยนตร์ที่ต้องการลบ
 * @param {Object} res - อ็อบเจ็กต์คำตอบ Express
 * @returns {Object} สถานะและข้อความสำเร็จหรือข้อความผิดพลาด
 */
router.post("/delete-movie", authMiddleware, async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.body.movieId);
    res.send({
      success: true,
      message: "Movie deleted",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

/**
 * เส้นทางสำหรับดึงข้อมูลภาพยนตร์ตามรหัส
 * @name GET /api/movies/get-movie-by-id/:id
 * @function
 * @memberof movieRoutes
 * @inner
 * @param {Object} req - อ็อบเจ็กต์คำขอ Express
 * @param {string} req.params.id - รหัสภาพยนตร์
 * @param {Object} res - อ็อบเจ็กต์คำตอบ Express
 * @returns {Object} สถานะและข้อความสำเร็จพร้อมกับข้อมูลภาพยนตร์หรือข้อความผิดพลาด
 */
router.get("/get-movie-by-id/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.send({
      success: true,
      message: "Movie fetched",
      data: movie,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
