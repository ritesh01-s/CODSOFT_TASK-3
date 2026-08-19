const Journey = require("../models/Journey");
const Bus = require("../models/Bus");


// ===============================
// Create Journey
// ===============================

const createJourney = async (req, res) => {

    try {

        const {
            busId,
            journeyDate
        } = req.body;


        // ===============================
        // Validate Input
        // ===============================

        if (!busId || !journeyDate) {

            return res.status(400).json({
                success: false,
                message: "Bus ID and journey date are required."
            });

        }


        // ===============================
        // Validate Date
        // ===============================

        const date = new Date(journeyDate);

        if (isNaN(date.getTime())) {

            return res.status(400).json({
                success: false,
                message: "Invalid journey date."
            });

        }


        // ===============================
        // Find Bus
        // ===============================

        const bus = await Bus.findById(busId);

        if (!bus || !bus.isActive) {

            return res.status(404).json({
                success: false,
                message: "Bus not found or inactive."
            });

        }


        // ===============================
        // Check Existing Journey
        // ===============================

        const existingJourney = await Journey.findOne({
            bus: busId,
            journeyDate: date
        });

        if (existingJourney) {

            return res.status(409).json({
                success: false,
                message: "A journey for this bus already exists on this date."
            });

        }


        // ===============================
        // Create Seats
        // ===============================

        const seats = bus.seats.map(seat => ({
            seatNumber: seat.seatNumber,
            status: "available"
        }));


        // ===============================
        // Create Journey
        // ===============================

        const journey = await Journey.create({

            bus: bus._id,

            journeyDate: date,

            seats,

            totalSeats: bus.totalSeats,

            availableSeats: bus.totalSeats,

            status: "scheduled"

        });


        // ===============================
        // Response
        // ===============================

        res.status(201).json({

            success: true,

            message: "Journey created successfully.",

            journey

        });


    } catch (error) {

        console.error("Create Journey Error:", error);

        res.status(500).json({

            success: false,

            message: "Server error while creating journey."

        });

    }

};


// ===============================
// Get Journeys
// ===============================

const getJourneys = async (req, res) => {

    try {

        const {
            source,
            destination,
            date
        } = req.query;


        // Build bus filter

        const busFilter = {
            isActive: true
        };


        if (source) {

            busFilter.source = {
                $regex: `^${source.trim()}$`,
                $options: "i"
            };

        }


        if (destination) {

            busFilter.destination = {
                $regex: `^${destination.trim()}$`,
                $options: "i"
            };

        }


        // Find matching buses

        const buses = await Bus.find(busFilter)
            .select(
                "busName busNumber busType source destination departureTime arrivalTime duration price"
            );


        const busIds = buses.map(bus => bus._id);


        // Journey filter

        const journeyFilter = {
            bus: {
                $in: busIds
            },

            status: "scheduled"
        };


        if (date) {

            const startDate = new Date(date);

            if (isNaN(startDate.getTime())) {

                return res.status(400).json({
                    success: false,
                    message: "Invalid journey date."
                });

            }


            startDate.setHours(0, 0, 0, 0);


            const endDate = new Date(startDate);

            endDate.setDate(
                endDate.getDate() + 1
            );


            journeyFilter.journeyDate = {
                $gte: startDate,
                $lt: endDate
            };

        }


        // Find journeys

        const journeys = await Journey.find(journeyFilter)
            .populate(
                "bus",
                "busName busNumber busType source destination departureTime arrivalTime duration price"
            )
            .sort({
                journeyDate: 1
            });


        res.status(200).json({

            success: true,

            count: journeys.length,

            journeys

        });


    } catch (error) {

        console.error("Get Journeys Error:", error);

        res.status(500).json({

            success: false,

            message: "Server error while fetching journeys."

        });

    }

};

// ===============================
// Get Journey By ID
// ===============================

const getJourneyById = async (req, res) => {

    try {

        const { id } = req.params;

        const journey = await Journey.findById(id)
            .populate(
                "bus",
                "busName busNumber busType source destination departureTime arrivalTime duration price"
            );


        if (!journey) {

            return res.status(404).json({
                success: false,
                message: "Journey not found."
            });

        }


        res.status(200).json({

            success: true,

            journey

        });


    } catch (error) {

        console.error(
            "Get Journey By ID Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Server error while fetching journey."

        });

    }

};


module.exports = {
    createJourney,
    getJourneys,
    getJourneyById
};