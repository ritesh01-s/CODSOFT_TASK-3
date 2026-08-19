const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const busRoutes = require("./routes/busRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const journeyRoutes = require("./routes/journeyRoutes");

const app = express();

const PORT = process.env.PORT || 5000;


// ===============================
// Connect to MongoDB
// ===============================

connectDB();


// ===============================
// Middleware
// ===============================

app.use(cors());
app.use(express.json());

// ===============================
// Routes
// ===============================

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/journeys", journeyRoutes);

// ===============================
// Test Route
// ===============================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "SAFAR API is running successfully!"
    });
});


// ===============================
// Start Server
// ===============================

app.listen(PORT, () => {
    console.log(`SAFAR server running on http://localhost:${PORT}`);
});