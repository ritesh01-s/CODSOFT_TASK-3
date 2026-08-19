const mongoose = require("mongoose");


// ===============================
// Passenger Schema
// ===============================

const passengerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        age: {
            type: Number,
            required: true,
            min: 1
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            required: true
        }
    },
    {
        _id: false
    }
);


// ===============================
// Booking Schema
// ===============================

const bookingSchema = new mongoose.Schema(
    {
        bookingReference: {
            type: String,
            required: true,
            unique: true
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        journey: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Journey",
            required: true
        },

        selectedSeats: {
            type: [String],
            required: true,
            validate: {
                validator: function (seats) {
                    return seats.length > 0;
                },
                message: "At least one seat must be selected."
            }
        },

        passengers: {
            type: [passengerSchema],
            required: true
        },

        totalAmount: {
            type: Number,
            required: true,
            min: 0
        },

        status: {
            type: String,
            enum: [
                "confirmed",
                "cancelled",
                "completed"
            ],
            default: "confirmed"
        }
    },
    {
        timestamps: true
    }
);


const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;