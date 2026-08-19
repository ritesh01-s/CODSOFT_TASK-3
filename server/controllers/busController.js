const Bus = require("../models/Bus");


// ===============================
// Create Bus
// ===============================

const createBus = async (req, res) => {

    try {

        const {
            busName,
            busNumber,
            busType,
            source,
            destination,
            departureTime,
            arrivalTime,
            duration,
            price,
            totalSeats
        } = req.body;


        // Validate required fields

        if (
            !busName ||
            !busNumber ||
            !busType ||
            !source ||
            !destination ||
            !departureTime ||
            !arrivalTime ||
            !duration ||
            price === undefined ||
            !totalSeats
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required bus details."
            });
        }


        // Check duplicate bus number

        const existingBus = await Bus.findOne({
            busNumber: busNumber.trim()
        });

        if (existingBus) {
            return res.status(409).json({
                success: false,
                message: "A bus with this bus number already exists."
            });
        }


        // Generate seats

        const seats = [];

        for (let i = 1; i <= totalSeats; i++) {

            seats.push({
                seatNumber: `S${i}`,
                status: "available"
            });

        }


        // Create bus

        const bus = await Bus.create({

            busName: busName.trim(),

            busNumber: busNumber.trim(),

            busType,

            source: source.trim(),

            destination: destination.trim(),

            departureTime,

            arrivalTime,

            duration,

            price,

            totalSeats,

            availableSeats: totalSeats,

            seats

        });


        res.status(201).json({

            success: true,

            message: "Bus created successfully.",

            bus

        });


    } catch (error) {

        console.error("Create Bus Error:", error);

        res.status(500).json({

            success: false,

            message: "Server error while creating bus."

        });

    }

};


// ===============================
// Get / Search Buses
// ===============================

const getBuses = async (req, res) => {

    try {

        const {
            source,
            destination
        } = req.query;


        // ===============================
        // Build Search Filter
        // ===============================

        const filter = {
            isActive: true
        };


        // Source filter

        if (source) {

            filter.source = {
                $regex: `^${source.trim()}$`,
                $options: "i"
            };

        }


        // Destination filter

        if (destination) {

            filter.destination = {
                $regex: `^${destination.trim()}$`,
                $options: "i"
            };

        }


        // ===============================
        // Find Buses
        // ===============================

        const buses = await Bus.find(filter)
            .sort({
                departureTime: 1
            });


        // ===============================
        // Response
        // ===============================

        res.status(200).json({

            success: true,

            count: buses.length,

            search: {
                source: source || null,
                destination: destination || null
            },

            buses

        });


    } catch (error) {

        console.error("Get Buses Error:", error);

        res.status(500).json({

            success: false,

            message: "Server error while fetching buses."

        });

    }

};


module.exports = {
    createBus,
    getBuses
};