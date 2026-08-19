const express = require("express");
const protect = require("../middleware/authMiddleware");

const router = express.Router();


// Protected Profile Test Route

router.get("/profile", protect, (req, res) => {

    res.status(200).json({
        success: true,
        message: "You are authenticated!",
        user: req.user
    });

});


module.exports = router;