require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./config/db");
const cors = require("cors");
const otpRoutes = require("./routes/otp");
const auth = require("./middleware/auth");

const startServer = async () => {
  try {
    await connectDB();
    const port = process.env.PORT || 5000;
    
    app.use(cors({
      origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
      credentials: true
    }));
    app.use(express.json());

    // Fixed routes: OTP on /api/auth, user auth on /api/user
    app.use("/api/auth", otpRoutes);
    app.use("/api/user", require("./routes/authRoutes"));

    app.use("/api/courses", require("./routes/courseRoutes"));
    app.use("/api/slots", require("./routes/slotRoutes"));
    app.use("/api/marks", require("./routes/marks"));
    app.use("/api/admin", require("./routes/adminRoutes"));

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};

startServer();
