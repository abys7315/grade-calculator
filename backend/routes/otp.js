const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const User = require("../models/User"); // Make sure you have a User model
const jwt = require("jsonwebtoken");

// Send OTP
router.post("/send-otp", async (req, res) => {
  try {
    console.log("Send OTP body:", req.body);  // <--- add this
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    // Generate 8-digit OTP
    const otp = Math.floor(10000000 + Math.random() * 90000000).toString();

    // Save OTP to database (upsert if not exists)
    await User.findOneAndUpdate(
      { email },
      { otp, isVerified: false },
      { upsert: true }
    );

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP for Grade Calculator",
      text: `Your OTP is ${otp}`
    });

    console.log(`OTP sent to ${email}: ${otp}`);
    res.json({ message: "OTP sent" });
  } catch (err) {
    console.error("Send OTP error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// Verify OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required" });

    const user = await User.findOne({ email, otp });
    if (!user) return res.status(400).json({ message: "Invalid OTP" });

    user.isVerified = true;
    await user.save();

    // Create JWT token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, message: "OTP verified successfully" });
  } catch (err) {
    console.error("Verify OTP error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

module.exports = router;
