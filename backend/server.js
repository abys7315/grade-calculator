require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const cors = require("cors");
const otpRoutes = require("./routes/otp");
const auth = require("./middleware/auth");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());


// Add this before your other routes
app.use("/api/auth", otpRoutes);

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/slots", require("./routes/slotRoutes"));
app.use("/api/marks", require("./routes/marks"));
app.use("/api/admin", require("./routes/adminRoutes"));

// Serve static files from the React app build directory
app.use(express.static(path.join(process.cwd(), "grade-calculator-frontend", "dist")));

// Catch all handler: send back React's index.html file for client-side routing
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(process.cwd(), "grade-calculator-frontend", "dist", "index.html"));
});

app.listen(process.env.PORT, () =>
  console.log("Server running on", process.env.PORT)
);
