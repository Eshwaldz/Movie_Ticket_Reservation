const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

// REGISTER NEW USER
router.post("/register", async (req, res) => {
  try {
    // CHECK EMAIL UNIQUE
    const usersExists = await User.findOne({ email: req.body.email });
    if (usersExists) {
      return res.send({
        success: false,
        message: "This user already exists.",
      });
    }

    //HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    // SAVE USER DOC
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

// LOGIN
router.post("/login", async (req, res) => {
  try {
    // CHECK
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        success: false,
        message: "Incorrect email or password!",
      });
    }

    // CHECK PASSWORD
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

    // CREATE TOKEN FOR USER
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

// GET USER DETAILS WITH ID
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
