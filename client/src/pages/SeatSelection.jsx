import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/SeatSelection.css";


const SeatSelection = () => {

    const { journeyId } = useParams();
    const navigate = useNavigate();

    const [journey, setJourney] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ===============================
    // Fetch Journey
    // ===============================

    useEffect(() => {

        const fetchJourney = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await api.get(`/journeys/${journeyId}`);

                setJourney(response.data.journey);

            } catch (error) {

                console.error(
                    "Fetch Journey Error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Unable to load journey details."
                );

            } finally {

                setLoading(false);

            }

        };

        fetchJourney();

    }, [journeyId]);


    // ===============================
    // Loading
    // ===============================

    if (loading) {

        return (
            <div className="seat-page-message">
                <h2>
                    Loading seat information...
                </h2>
            </div>
        );

    }


    // ===============================
    // Error
    // ===============================

    if (error) {

        return (
            <div className="seat-page-message">

                <h2>
                    Unable to load journey
                </h2>

                <p>
                    {error}
                </p>

                <button
                    onClick={() => navigate("/search")}
                >
                    Back to Search
                </button>

            </div>
        );

    }


    // ===============================
    // Journey Not Found
    // ===============================

    if (!journey) {

        return (
            <div className="seat-page-message">

                <h2>
                    Journey not found
                </h2>

                <button
                    onClick={() => navigate("/")}
                >
                    Back to Home
                </button>

            </div>
        );

    }


    // ===============================
    // Handle Seat Selection
    // ===============================

    const handleSeatClick = (seat) => {

        if (seat.status === "booked") {
            return;
        }

        setSelectedSeats((previousSeats) => {

            if (
                previousSeats.includes(
                    seat.seatNumber
                )
            ) {

                return previousSeats.filter(
                    (seatNumber) =>
                        seatNumber !== seat.seatNumber
                );

            }

            return [
                ...previousSeats,
                seat.seatNumber
            ];

        });

    };


    // ===============================
    // Continue
    // ===============================

    const handleContinue = () => {

        if (selectedSeats.length === 0) {
            return;
        }

        navigate(
            `/booking/${journey._id}`,
            {
                state: {
                    selectedSeats
                }
            }
        );

    };


    // ===============================
    // Total Amount
    // ===============================

    const totalAmount =
        selectedSeats.length *
        (journey.bus?.price || 0);


    // ===============================
    // Create Bus Rows
    // ===============================

    const seatRows = [];

    for (
        let i = 0;
        i < journey.seats.length;
        i += 4
    ) {

        seatRows.push(
            journey.seats.slice(i, i + 4)
        );

    }


    return (

        <div className="seat-selection-page">


            {/* =================================
                Journey Information
            ================================= */}

            <div className="seat-journey-info">

                <h1>
                    Select Your Seats
                </h1>

                <h2>
                    {journey.bus?.busName}
                </h2>

                <p>
                    {journey.bus?.source}
                    {" → "}
                    {journey.bus?.destination}
                </p>

                <p>
                    Journey Date:{" "}
                    {new Date(
                        journey.journeyDate
                    ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    })}
                </p>

                <p>
                    Departure:{" "}
                    {journey.bus?.departureTime}
                    {"  •  "}
                    Arrival:{" "}
                    {journey.bus?.arrivalTime}
                </p>

                <p>
                    Price per seat: ₹
                    {journey.bus?.price}
                </p>

            </div>


            {/* =================================
                Bus
            ================================= */}

            <div className="bus-container">


                {/* Bus Front */}

                <div className="bus-front">

                    <div className="driver-area">

                        <span className="steering">
                            🛞
                        </span>

                        <span>
                            Driver
                        </span>

                    </div>

                </div>


                {/* Seat Layout */}

                <div className="seat-grid">

                    {seatRows.map(
                        (row, rowIndex) => (

                            <div
                                className="seat-row"
                                key={rowIndex}
                            >

                                {/* Left Seat 1 */}

                                {row[0] && (
                                    <SeatButton
                                        seat={row[0]}
                                        selectedSeats={
                                            selectedSeats
                                        }
                                        onSeatClick={
                                            handleSeatClick
                                        }
                                    />
                                )}


                                {/* Left Seat 2 */}

                                {row[1] && (
                                    <SeatButton
                                        seat={row[1]}
                                        selectedSeats={
                                            selectedSeats
                                        }
                                        onSeatClick={
                                            handleSeatClick
                                        }
                                    />
                                )}


                                {/* Central Aisle */}

                                <div className="aisle"></div>


                                {/* Right Seat 1 */}

                                {row[2] && (
                                    <SeatButton
                                        seat={row[2]}
                                        selectedSeats={
                                            selectedSeats
                                        }
                                        onSeatClick={
                                            handleSeatClick
                                        }
                                    />
                                )}


                                {/* Right Seat 2 */}

                                {row[3] && (
                                    <SeatButton
                                        seat={row[3]}
                                        selectedSeats={
                                            selectedSeats
                                        }
                                        onSeatClick={
                                            handleSeatClick
                                        }
                                    />
                                )}

                            </div>

                        )
                    )}

                </div>


                {/* =================================
                    Legend
                ================================= */}

                <div className="legend">

                    <div>
                        <span className="sample available"></span>
                        Available
                    </div>

                    <div>
                        <span className="sample selected"></span>
                        Selected
                    </div>

                    <div>
                        <span className="sample occupied"></span>
                        Booked
                    </div>

                </div>

            </div>


            {/* =================================
                Bottom Summary
            ================================= */}

            <div className="seat-container">

                <div className="seat-summary">

                    <div className="summary-item">

                        <span>
                            Selected Seats
                        </span>

                        <strong>
                            {selectedSeats.length}
                        </strong>

                    </div>


                    <div className="summary-item">

                        <span>
                            Seats
                        </span>

                        <strong>
                            {selectedSeats.length > 0
                                ? selectedSeats.join(", ")
                                : "None"
                            }
                        </strong>

                    </div>


                    <div className="summary-item">

                        <span>
                            Total Amount
                        </span>

                        <strong>
                            ₹{totalAmount}
                        </strong>

                    </div>


                    <button
                        className="seat-continue"
                        disabled={
                            selectedSeats.length === 0
                        }
                        onClick={handleContinue}
                    >
                        Continue
                    </button>

                </div>

            </div>

        </div>

    );

};


// =================================
// Seat Button Component
// =================================

const SeatButton = ({
    seat,
    selectedSeats,
    onSeatClick
}) => {

    const isSelected =
        selectedSeats.includes(
            seat.seatNumber
        );

    const isBooked =
        seat.status === "booked";


    return (

        <label
            className={`seat ${
                isBooked
                    ? "occupied"
                    : isSelected
                        ? "selected"
                        : "available"
            }`}
        >

            <input
                type="checkbox"
                checked={isSelected}
                disabled={isBooked}
                onChange={() =>
                    onSeatClick(seat)
                }
            />

            <span>
                {seat.seatNumber}
            </span>

        </label>

    );

};


export default SeatSelection;