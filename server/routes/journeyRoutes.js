const express = require("express");

const {
    createJourney,
    getJourneys,
    getJourneyById
} = require("../controllers/journeyController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();


// ===============================
// Admin
// ===============================

router.post(
    "/",
    protect,
    admin,
    createJourney
);


// ===============================
// Public
// ===============================

router.get(
    "/",
    getJourneys
);

router.get(
    "/:id",
    getJourneyById
);


module.exports = router;