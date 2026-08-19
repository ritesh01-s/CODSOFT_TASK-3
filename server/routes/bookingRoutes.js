const express = require("express");

const {
    createBooking,
    getMyBookings,
    getBookingById,
    cancelBooking
} = require("../controllers/bookingController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// Create booking
router.post("/", protect, createBooking);

// Get logged-in user's bookings
router.get("/my-bookings", protect, getMyBookings);

// Get single booking

router.get("/:id", protect, getBookingById);

// Cancel booking
router.patch("/:id/cancel", protect, cancelBooking);


module.exports = router;