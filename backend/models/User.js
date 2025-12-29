const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String },
  isVerified: { type: Boolean, default: false },
  role: { type: String, default: 'user' }, // 'user' or 'admin'
  feedback: [{ type: String }]
});

module.exports = mongoose.model("User", userSchema);
