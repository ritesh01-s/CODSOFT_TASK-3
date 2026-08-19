import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/MyBookings.css";


const MyBookings = () => {

    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ===============================
    // Fetch User Bookings
    // ===============================

    useEffect(() => {

        const fetchBookings = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await api.get("/bookings/my-bookings");

                setBookings(
                    response.data.bookings || []
                );

            } catch (error) {

                console.error(
                    "Fetch Bookings Error:",
                    error
                );

                if (
                    error.response?.status === 401
                ) {

                    localStorage.removeItem(
                        "safarToken"
                    );

                    navigate("/login");

                    return;
                }

                setError(
                    error.response?.data?.message ||
                    "Unable to load your bookings."
                );

            } finally {

                setLoading(false);

            }

        };

        fetchBookings();

    }, [navigate]);


    // ===============================
    // Cancel Booking
    // ===============================

    const handleCancelBooking = async (bookingId) => {

        const confirmed = window.confirm(
            "Are you sure you want to cancel this booking?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await api.patch(
                `/bookings/${bookingId}/cancel`
            );

            const response =
                await api.get(
                    "/bookings/my-bookings"
                );

            setBookings(
                response.data.bookings || []
            );

            alert(
                "Booking cancelled successfully."
            );

        } catch (error) {

            console.error(
                "Cancel Booking Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to cancel booking."
            );

        }

    };


    // ===============================
    // Loading
    // ===============================

    if (loading) {

        return (
            <div className="my-bookings-page">

                <div className="bookings-loading">

                    <h2>
                        Loading your bookings...
                    </h2>

                </div>

            </div>
        );

    }


    // ===============================
    // Error
    // ===============================

    if (error) {

        return (
            <div className="my-bookings-page">

                <div className="bookings-error">

                    <h2>
                        Unable to load bookings
                    </h2>

                    <p>
                        {error}
                    </p>

                </div>

            </div>
        );

    }


    return (

        <div className="my-bookings-page">

            {/* ===============================
                Page Header
            =============================== */}

            <div className="bookings-header">

                <h1>
                    My Bookings
                </h1>

                <p>
                    View and manage all your SAFAR bus bookings.
                </p>

            </div>


            {/* ===============================
                No Bookings
            =============================== */}

            {bookings.length === 0 && (

                <div className="no-bookings">

                    <div className="no-bookings-icon">
                        🎫
                    </div>

                    <h2>
                        No bookings found
                    </h2>

                    <p>
                        You haven't booked any tickets yet.
                    </p>

                    <button
                        className="search-buses-btn"
                        onClick={() => navigate("/")}
                    >
                        Search Buses
                    </button>

                </div>

            )}


            {/* ===============================
                Booking List
            =============================== */}

            {bookings.length > 0 && (

                <div className="bookings-list">

                    {bookings.map((booking) => {

                        const bus =
                            booking.journey?.bus;

                        const journeyDate =
                            booking.journey?.journeyDate;


                        return (

                            <div
                                className="booking-card"
                                key={booking._id}
                            >

                                {/* ===============================
                                    Booking Header
                                =============================== */}

                                <div className="booking-card-header">

                                    <div>

                                        <span className="booking-label">
                                            Booking Reference
                                        </span>

                                        <h2>
                                            {booking.bookingReference}
                                        </h2>

                                    </div>


                                    <span
                                        className={`booking-status ${booking.status}`}
                                    >
                                        {booking.status}
                                    </span>

                                </div>


                                {/* ===============================
                                    Bus Information
                                =============================== */}

                                <div className="bus-details">

                                    <div className="bus-title">

                                        <div>

                                            <h2>
                                                {bus?.busName ||
                                                    "Bus"}
                                            </h2>

                                            <span>
                                                {bus?.busNumber ||
                                                    "Bus Number unavailable"}
                                            </span>

                                        </div>

                                        <span className="bus-type">
                                            {bus?.busType ||
                                                "Bus Type"}
                                        </span>

                                    </div>


                                    {/* Route */}

                                    <div className="route-section">

                                        <div className="route-location">

                                            <span className="route-label">
                                                FROM
                                            </span>

                                            <strong>
                                                {bus?.source ||
                                                    "N/A"}
                                            </strong>

                                            <span>
                                                {bus?.departureTime ||
                                                    "--:--"}
                                            </span>

                                        </div>


                                        <div className="route-line">

                                            <span>
                                                🚌
                                            </span>

                                            <div></div>

                                            <span>
                                                →
                                            </span>

                                        </div>


                                        <div className="route-location destination">

                                            <span className="route-label">
                                                TO
                                            </span>

                                            <strong>
                                                {bus?.destination ||
                                                    "N/A"}
                                            </strong>

                                            <span>
                                                {bus?.arrivalTime ||
                                                    "--:--"}
                                            </span>

                                        </div>

                                    </div>


                                    {/* Journey Information */}

                                    <div className="journey-info">

                                        <div>

                                            <span>
                                                📅 Journey Date
                                            </span>

                                            <strong>
                                                {journeyDate
                                                    ? new Date(
                                                        journeyDate
                                                    ).toLocaleDateString(
                                                        "en-IN",
                                                        {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric"
                                                        }
                                                    )
                                                    : "N/A"}
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                ⏱ Duration
                                            </span>

                                            <strong>
                                                {bus?.duration ||
                                                    "N/A"}
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                💺 Price / Seat
                                            </span>

                                            <strong>
                                                ₹
                                                {bus?.price ||
                                                    0}
                                            </strong>

                                        </div>

                                    </div>

                                </div>


                                {/* ===============================
                                    Booking Summary
                                =============================== */}

                                <div className="booking-summary">

                                    <div>

                                        <span>
                                            Selected Seats
                                        </span>

                                        <strong>
                                            {
                                                booking.selectedSeats?.join(
                                                    ", "
                                                )
                                            }
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Passengers
                                        </span>

                                        <strong>
                                            {
                                                booking.passengers?.length ||
                                                0
                                            }
                                        </strong>

                                    </div>


                                    <div className="total-amount">

                                        <span>
                                            Total Amount
                                        </span>

                                        <strong>
                                            ₹
                                            {
                                                booking.totalAmount
                                            }
                                        </strong>

                                    </div>

                                </div>


                                {/* ===============================
                                    Passenger Details
                                =============================== */}

                                {booking.passengers?.length > 0 && (

                                    <div className="passenger-section">

                                        <h3>
                                            Passenger Details
                                        </h3>


                                        <div className="passenger-list">

                                            {booking.passengers.map(
                                                (
                                                    passenger,
                                                    index
                                                ) => (

                                                    <div
                                                        className="passenger-row"
                                                        key={
                                                            passenger._id ||
                                                            `${booking._id}-${index}`
                                                        }
                                                    >

                                                        <div className="passenger-number">
                                                            {index + 1}
                                                        </div>


                                                        <div>

                                                            <strong>
                                                                {
                                                                    passenger.name
                                                                }
                                                            </strong>

                                                            <span>
                                                                Seat{" "}
                                                                {
                                                                    passenger.seatNumber
                                                                }
                                                            </span>

                                                        </div>


                                                        <div>

                                                            <span>
                                                                Age
                                                            </span>

                                                            <strong>
                                                                {
                                                                    passenger.age
                                                                }
                                                            </strong>

                                                        </div>


                                                        <div>

                                                            <span>
                                                                Gender
                                                            </span>

                                                            <strong>
                                                                {
                                                                    passenger.gender
                                                                }
                                                            </strong>

                                                        </div>

                                                    </div>

                                                )
                                            )}

                                        </div>

                                    </div>

                                )}


                                {/* ===============================
                                    Actions
                                =============================== */}

                                <div className="booking-actions">

                                    <button
                                        className="view-ticket-btn"
                                        onClick={() =>
                                            navigate(
                                                `/ticket/${booking._id}`
                                            )
                                        }
                                    >
                                        View Ticket
                                    </button>


                                    {booking.status ===
                                        "confirmed" && (

                                        <button
                                            className="cancel-booking-btn"
                                            onClick={() =>
                                                handleCancelBooking(
                                                    booking._id
                                                )
                                            }
                                        >
                                            Cancel Booking
                                        </button>

                                    )}

                                </div>

                            </div>

                        );

                    })}

                </div>

            )}

        </div>

    );

};


export default MyBookings;