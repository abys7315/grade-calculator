const router = require("express").Router();
const User = require("../models/User");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/auth");


router.get("/me", auth, (req, res) => {
  res.json({ email: req.user.email, role: req.user.role });
});

router.post("/feedback", auth, async (req, res) => {
  const { feedback } = req.body;
  if (!feedback) return res.status(400).json({ message: "Feedback is required" });

  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.feedback.push(feedback);
    await user.save();
    res.json({ message: "Feedback submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
