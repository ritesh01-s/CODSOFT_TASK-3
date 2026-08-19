const mongoose = require("mongoose");


// ===============================
// Seat Schema
// ===============================

const seatSchema = new mongoose.Schema(
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
// Bus Schema
// ===============================

const busSchema = new mongoose.Schema(
    {
        busName: {
            type: String,
            required: true,
            trim: true
        },

        busNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        busType: {
            type: String,
            enum: [
                "AC Sleeper",
                "Non-AC Sleeper",
                "AC Seater",
                "Non-AC Seater",
                "AC Sleeper/Seater",
                "Non-AC Sleeper/Seater"
            ],
            required: true
        },

        source: {
            type: String,
            required: true,
            trim: true
        },

        destination: {
            type: String,
            required: true,
            trim: true
        },

        departureTime: {
            type: String,
            required: true
        },

        arrivalTime: {
            type: String,
            required: true
        },

        duration: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true,
            min: 0
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

        seats: {
            type: [seatSchema],
            default: []
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);


const Bus = mongoose.model("Bus", busSchema);

module.exports = Bus;