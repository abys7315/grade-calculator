const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { Resend } = require("resend");

const resend = new Resend('re_B3ndsCjd_L8WqqwdVAcNyYkXHStvPDCPQ');

// Send OTP
router.post("/send-otp", async (req, res) => {
  try {
    console.log("Send OTP body:", req.body);
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    // Generate a random 6-digit OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP in the database
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, otp: generatedOtp });
    } else {
      user.otp = generatedOtp;
    }
    await user.save();

    // Send the OTP via Resend
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'abhay.23bce7190@vitapstudent.ac.in', // Using your registered email for testing due to Resend sandbox restrictions
      subject: `Login OTP for ${email} - Grade Calculator`,
      html: `<p>Your OTP for logging in as ${email} is: <strong>${generatedOtp}</strong></p><p>Please do not share this with anyone.</p>`
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ message: "Failed to send email OTP via Resend", error });
    }

    console.log(`Real OTP sent for ${email}`);
    res.json({ message: "OTP sent successfully!" });
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

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found. Please request an OTP first." });
    }

    // Verify the OTP
    if (user.otp === otp) {
      // Clear the OTP from DB so it can't be reused
      user.otp = null;
      user.isVerified = true;
      await user.save();

      // Sign the JWT token
      const token = jwt.sign({ email, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: "1h" });
      res.json({ token, message: "OTP verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid OTP. Please try again." });
    }
  } catch (err) {
    console.error("Verify OTP error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

module.exports = router;
