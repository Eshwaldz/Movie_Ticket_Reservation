const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");

const Theatre = require("../models/theatreModel");
const Show = require("../models/showModel");

// ADD THEATRE
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

// GET ALL THEATRES
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

// GET THEATRES BY OWNER
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

// UPDATE
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

// DELETE
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

// ADD MOVIE SHOW
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

// MOVIE SHOW IN THEATRE
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

// DELETE MOVIE SHOW IN THEATRE
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

// GET ALL UNIQUE THEATRES
router.post("/get-all-theatres-by-movie", authMiddleware, async (req, res) => {
  try {
    const { movie, date } = req.body;

    //MOVIE SHOW
    const shows = await Show.find({ movie, date })
      .populate("theatre")
      .sort({ createdAt: -1 });

    // UNIQUE THEATRES
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

// GET SHOW BY ID
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

// *******