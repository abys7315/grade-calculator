const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/User"); // Make sure you have a User model
const jwt = require("jsonwebtoken");

// Send OTP
router.post("/send-otp", async (req, res) => {
  try {
    console.log("Send OTP body:", req.body);
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    // Call Python OTP API to send email
    const pythonApiUrl = process.env.PYTHON_OTP_API_URL || "https://abys2875.pythonanywhere.com";
    const response = await axios.post(`${pythonApiUrl}/send-otp`, { email });

    if (response.data.success) {
      // Save user as not verified in our database
      await User.findOneAndUpdate(
        { email },
        { isVerified: false },
        { upsert: true }
      );

      console.log(`OTP request sent to Python API for ${email}`);
      res.json({ message: "OTP sent" });
    } else {
      throw new Error("Failed to send OTP via Python API");
    }
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

    // Call Python OTP API to verify OTP
    const pythonApiUrl = process.env.PYTHON_OTP_API_URL || "https://abys2875.pythonanywhere.com";
    const response = await axios.post(`${pythonApiUrl}/verify-otp`, { email, otp });

    if (response.data.success) {
      // Update user as verified in our database
      const user = await User.findOneAndUpdate(
        { email },
        { isVerified: true },
        { new: true }
      );

      // Create JWT token
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.json({ token, message: "OTP verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (err) {
    console.error("Verify OTP error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

module.exports = router;
