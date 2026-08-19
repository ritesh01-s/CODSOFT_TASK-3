const Booking = require("../models/Booking");
const Journey = require("../models/Journey");


// ===============================
// Generate Booking Reference
// ===============================

const generateBookingReference = () => {

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let reference = "SAFAR-";

    for (let i = 0; i < 6; i++) {
        reference += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }

    return reference;
};


// ===============================
// Create Booking
// ===============================

const createBooking = async (req, res) => {

    try {

        const {
            journeyId,
            selectedSeats,
            passengers
        } = req.body;


        // ===============================
        // Validate Input
        // ===============================

        if (
            !journeyId ||
            !selectedSeats ||
            !passengers
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all booking details."
            });
        }


        if (
            !Array.isArray(selectedSeats) ||
            selectedSeats.length === 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Please select at least one seat."
            });
        }

        // ===============================
        // Check Duplicate Seats
        // ===============================

        const uniqueSeats = new Set(selectedSeats);

        if (uniqueSeats.size !== selectedSeats.length) {

            return res.status(400).json({
                success: false,
                message: "Duplicate seats cannot be selected."
            });

        }


        if (
            !Array.isArray(passengers) ||
            passengers.length !== selectedSeats.length
        ) {
            return res.status(400).json({
                success: false,
                message: "Passenger count must match selected seats."
            });
        }


        // ===============================
        // Find Journey
        // ===============================

        const journey = await Journey.findById(journeyId);

        if (!journey || journey.status !== "scheduled") {

            return res.status(404).json({
                success: false,
                message: "Journey not found or unavailable."
            });

        }


        // ===============================
        // Atomically Reserve Seats
        // ===============================

        const seatReservation = await Journey.findOneAndUpdate(

            {
                _id: journeyId,

                status: "scheduled",

                // Every requested seat must exist
                // and be available
                $expr: {
                    $eq: [
                        {
                            $size: {
                                $setIntersection: [
                                    selectedSeats,
                                    {
                                        $map: {
                                            input: {
                                                $filter: {
                                                    input: "$seats",
                                                    as: "seat",
                                                    cond: {
                                                        $eq: [
                                                            "$$seat.status",
                                                            "available"
                                                        ]
                                                    }
                                                }
                                            },
                                            as: "availableSeat",
                                            in: "$$availableSeat.seatNumber"
                                        }
                                    }
                                ]
                            }
                        },
                        selectedSeats.length
                    ]
                }
            },

            {
                $set: {
                    "seats.$[seat].status": "booked"
                },

                $inc: {
                    availableSeats: -selectedSeats.length
                }
            },

            {
                new: true,

                arrayFilters: [
                    {
                        "seat.seatNumber": {
                            $in: selectedSeats
                        }
                    }
                ]
            }

        );

        if (!seatReservation) {

            return res.status(409).json({

                success: false,

                message:
                    "Some selected seats are no longer available."

            });

        }

        // ===============================
        // Get Bus
        // ===============================

        await journey.populate("bus");


        if (!journey.bus) {

            return res.status(404).json({
                success: false,
                message: "Associated bus not found."
            });

        }


        // ===============================
        // Calculate Amount
        // ===============================

        const totalAmount =
            journey.bus.price * selectedSeats.length;


        // ===============================
        // Generate Booking Reference
        // ===============================

        let bookingReference;

        let referenceExists = true;

        while (referenceExists) {

            bookingReference =
                generateBookingReference();

            const existingBooking =
                await Booking.findOne({
                    bookingReference
                });

            referenceExists =
                !!existingBooking;
        }


        // ===============================
        // Create Booking
        // ===============================

        let booking;

        try {

            booking = await Booking.create({

                bookingReference,

                user: req.user._id,

                journey: journey._id,

                selectedSeats,

                passengers,

                totalAmount,

                status: "confirmed"

            });

        } catch (bookingError) {

            console.error(
                "Booking Creation Error:",
                bookingError
            );


            // ===============================
            // Release Reserved Seats
            // ===============================

            await Journey.findByIdAndUpdate(

                journeyId,

                {
                    $set: {
                        "seats.$[seat].status": "available"
                    },

                    $inc: {
                        availableSeats:
                            selectedSeats.length
                    }
                },

                {
                    arrayFilters: [
                        {
                            "seat.seatNumber": {
                                $in: selectedSeats
                            }
                        }
                    ]
                }

            );


            return res.status(500).json({

                success: false,

                message:
                    "Booking could not be created. Seats have been released."

            });

        }


        // ===============================
        // Response
        // ===============================

        res.status(201).json({

            success: true,

            message: "Ticket booked successfully.",

            booking: {

                id: booking._id,

                bookingReference:
                    booking.bookingReference,

                journey:
                    booking.journey,

                selectedSeats:
                    booking.selectedSeats,

                passengers:
                    booking.passengers,

                totalAmount:
                    booking.totalAmount,

                status:
                    booking.status

            }

        });


    } catch (error) {

        console.error(
            "Create Booking Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Server error while creating booking."

        });

    }

};

// ===============================
// Get My Bookings
// ===============================

const getMyBookings = async (req, res) => {

    try {

        const bookings = await Booking.find({
            user: req.user._id
        })
            .populate({
                path: "journey",
                populate: {
                    path: "bus",
                    select:
                        "busName busNumber busType source destination departureTime arrivalTime duration price"
                }
            })
            .sort({
                createdAt: -1
            });


        res.status(200).json({

            success: true,

            count: bookings.length,

            bookings

        });


    } catch (error) {

        console.error(
            "Get My Bookings Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Server error while fetching bookings."

        });

    }

};

// ===============================
// Get Single Booking
// ===============================

const getBookingById = async (req, res) => {

    try {

        const { id } = req.params;


        const booking = await Booking.findOne({

            _id: id,

            user: req.user._id

        })
        .populate({
            path: "journey",
            populate: {
                path: "bus"
            }
        });


        if (!booking) {

            return res.status(404).json({

                success: false,

                message:
                    "Booking not found or you are not authorized to view it."

            });

        }


        res.status(200).json({

            success: true,

            booking

        });


    } catch (error) {

        console.error(
            "Get Booking By ID Error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Server error while fetching booking."

        });

    }

};

// ===============================
// Cancel Booking
// ===============================

const cancelBooking = async (req, res) => {

    try {

        const { id } = req.params;


        // Find booking belonging to logged-in user

        const booking = await Booking.findOne({
            _id: id,
            user: req.user._id
        });


        if (!booking) {

            return res.status(404).json({
                success: false,
                message: "Booking not found."
            });

        }


        // Check booking status

        if (booking.status !== "confirmed") {

            return res.status(400).json({
                success: false,
                message: "This booking cannot be cancelled."
            });

        }


        // Find the bus

        const journey = await Journey.findById(booking.journey);


        if (!journey) {

            return res.status(404).json({
                success: false,
                message: "Associated bus not found."
            });

        }


        // Release booked seats

        booking.selectedSeats.forEach(selectedSeat => {

            const seat = journey.seats.find(
                s => s.seatNumber === selectedSeat
            );

            if (seat && seat.status === "booked") {
                seat.status = "available";
            }

        });


        // Increase available seats

        journey.availableSeats =
            journey.availableSeats + booking.selectedSeats.length;


        await journey.save();


        // Update booking status

        booking.status = "cancelled";

        await booking.save();


        // Response

        res.status(200).json({

            success: true,

            message: "Booking cancelled successfully.",

            booking: {

                id: booking._id,

                bookingReference:
                    booking.bookingReference,

                selectedSeats:
                    booking.selectedSeats,

                status:
                    booking.status

            }

        });


    } catch (error) {

        console.error("Cancel Booking Error:", error);

        res.status(500).json({

            success: false,

            message: "Server error while cancelling booking."

        });

    }

};


module.exports = {
    createBooking,
    getMyBookings,
    getBookingById,
    cancelBooking
};