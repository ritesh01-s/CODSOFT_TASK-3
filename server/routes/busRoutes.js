const express = require("express");

const {
    createBus,
    getBuses
} = require("../controllers/busController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();


// ===============================
// Admin Routes
// ===============================

// Create bus
router.post("/", protect, admin, createBus);


// ===============================
// Public Routes
// ===============================

// Get available buses
router.get("/", getBuses);


module.exports = router;