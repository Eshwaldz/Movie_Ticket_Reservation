const router = require("express").Router();
const Movie = require("../models/movieModel");
const authMiddleware = require("../middlewares/authMiddleware");

// ADD NEW MOVIE
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

// DISPLAY ALL MOVIE PANEL
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

// UPDATE MOVIE
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

// DELETE MOVIE
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

// GET MOVIE BY ID
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
