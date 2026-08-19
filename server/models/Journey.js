const mongoose = require("mongoose");


// ===============================
// Journey Seat Schema
// ===============================

const journeySeatSchema = new mongoose.Schema(
    {
        seatNumber: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: ["available", "booked"],
            default: "available"
        }
    },
    {
        _id: false
    }
);


// ===============================
// Journey Schema
// ===============================

const journeySchema = new mongoose.Schema(
    {
        bus: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bus",
            required: true
        },

        journeyDate: {
            type: Date,
            required: true
        },

        seats: {
            type: [journeySeatSchema],
            required: true
        },

        totalSeats: {
            type: Number,
            required: true,
            min: 1
        },

        availableSeats: {
            type: Number,
            required: true,
            min: 0
        },

        status: {
            type: String,
            enum: [
                "scheduled",
                "completed",
                "cancelled"
            ],
            default: "scheduled"
        }
    },
    {
        timestamps: true
    }
);


// ===============================
// Prevent Duplicate Bus Journey
// ===============================

journeySchema.index(
    {
        bus: 1,
        journeyDate: 1
    },
    {
        unique: true
    }
);


const Journey = mongoose.model("Journey", journeySchema);

module.exports = Journey;