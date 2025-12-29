const router = require("express").Router();
const User = require("../models/User");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/auth");

router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await User.findOneAndUpdate(
    { email },
    { otp, isVerified: false },
    { upsert: true }
  );

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    to: email,
    subject: "OTP Login",
    text: `Your OTP is ${otp}`
  });

  res.json({ message: "OTP sent" });
});

router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email, otp });

  if (!user) return res.status(400).json({ message: "Invalid OTP" });

  user.isVerified = true;
  user.role = (email === "abys78190@gmail.com" || email === "abys7315@gmail.com") ? "admin" : "user";
  await user.save();

  const token = jwt.sign({ email, role: user.role }, process.env.JWT_SECRET);
  res.json({ token });
});

router.get("/me", auth, (req, res) => {
  res.json({ email: req.user.email, role: req.user.role });
});

module.exports = router;
