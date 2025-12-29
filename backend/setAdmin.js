const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/User");

async function setAdmin(email) {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const user = await User.findOneAndUpdate(
      { email },
      { role: "admin" },
      { new: true }
    );
    if (user) {
      console.log(`User ${email} set as admin`);
    } else {
      console.log(`User ${email} not found`);
    }
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

// Usage: node setAdmin.js your-admin-email@example.com
const email = process.argv[2];
if (!email) {
  console.log("Usage: node setAdmin.js <email>");
} else {
  setAdmin(email);
}
