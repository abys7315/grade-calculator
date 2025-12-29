const router = require("express").Router();
const User = require("../models/User");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/auth");


router.get("/me", auth, (req, res) => {
  res.json({ email: req.user.email, role: req.user.role });
});

module.exports = router;
