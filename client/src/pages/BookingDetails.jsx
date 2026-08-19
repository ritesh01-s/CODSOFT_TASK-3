import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/BookingDetails.css";


const BookingDetails = () => {

    const { bookingId } = useParams();
    const navigate = useNavigate();

    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ===============================
    // Fetch Booking
    // ===============================

    useEffect(() => {

        const fetchBooking = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await api.get(
                        `/bookings/${bookingId}`
                    );

                setBooking(
                    response.data.booking
                );

            } catch (error) {

                console.error(
                    "Fetch Booking Error:",
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
                    "Unable to load booking details."
                );

            } finally {

                setLoading(false);

            }

        };


        fetchBooking();

    }, [bookingId, navigate]);


    // ===============================
    // Loading
    // ===============================

    if (loading) {

        return (

            <div>

                <h2>
                    Loading ticket...
                </h2>

            </div>

        );

    }


    // ===============================
    // Error
    // ===============================

    if (error) {

        return (

            <div>

                <h2>
                    Unable to load ticket
                </h2>

                <p>
                    {error}
                </p>

                <button
                    onClick={() =>
                        navigate("/my-bookings")
                    }
                >
                    Back to My Bookings
                </button>

            </div>

        );

    }


    if (!booking) {

        return (

            <div>

                <h2>
                    Booking not found.
                </h2>

            </div>

        );

    }


    return (

        <div className="ticket-page">

        <div className="ticket-card" id="safar-ticket">


            {/* ===============================
                Header
            =============================== */}

            <div className="ticket-header">

                <div>

                    <h1 className="ticket-logo">
                        SAFAR
                    </h1>

                    <p className="ticket-tagline">
                        Your Journey, Simplified.
                    </p>

                </div>


                <div className="ticket-label">

                    <span>
                        E-TICKET
                    </span>

                </div>

            </div>


            {/* ===============================
                Route
            =============================== */}

            <div className="route-section">

                <div className="route-location">

                    <h2>
                        {booking.journey.bus.source}
                    </h2>

                    <p>
                        Departure
                    </p>

                    <strong>
                        {booking.journey.bus.departureTime}
                    </strong>

                </div>


                <div className="route-arrow">
                    →
                </div>


                <div className="route-location">

                    <h2>
                        {booking.journey.bus.destination}
                    </h2>

                    <p>
                        Arrival
                    </p>

                    <strong>
                        {booking.journey.bus.arrivalTime}
                    </strong>

                </div>

            </div>


            {/* ===============================
                Journey Information
            =============================== */}

            <div className="journey-info">

                <div>

                    <span>
                        Journey Date
                    </span>

                    <strong>
                        {new Date(
                            booking.journey.journeyDate
                        ).toLocaleDateString(
                            "en-IN",
                            {
                                day: "2-digit",
                                month: "short",
                                year: "numeric"
                            }
                        )}
                    </strong>

                </div>


                <div>

                    <span>
                        Bus
                    </span>

                    <strong>
                        {booking.journey.bus.busName}
                    </strong>

                </div>


                <div>

                    <span>
                        Bus Number
                    </span>

                    <strong>
                        {booking.journey.bus.busNumber}
                    </strong>

                </div>

            </div>


            {/* ===============================
                Booking Reference
            =============================== */}

            <div className="booking-reference">

                <span>
                    BOOKING REFERENCE
                </span>

                <h2>
                    {booking.bookingReference}
                </h2>

            </div>


            {/* ===============================
                Seats
            =============================== */}

            <div className="ticket-section">

                <h3>
                    SEATS
                </h3>

                <div className="seat-list">

                    {booking.selectedSeats.map(
                        (seat) => (

                            <span
                                className="seat-badge"
                                key={seat}
                            >
                                {seat}
                            </span>

                        )
                    )}

                </div>

            </div>


            {/* ===============================
                Passengers
            =============================== */}

            <div className="ticket-section">

                <h3>
                    PASSENGERS
                </h3>


                <div className="passenger-header">

                    <span>
                        Name
                    </span>

                    <span>
                        Seat
                    </span>

                    <span>
                        Age
                    </span>

                    <span>
                        Gender
                    </span>

                </div>


                {booking.passengers.map(
                    (passenger, index) => (

                        <div
                            className="passenger-row"
                            key={index}
                        >

                            <span>
                                {passenger.name}
                            </span>

                            <span>
                                {passenger.seatNumber}
                            </span>

                            <span>
                                {passenger.age}
                            </span>

                            <span>
                                {passenger.gender}
                            </span>

                        </div>

                    )
                )}

            </div>


            {/* ===============================
                Payment
            =============================== */}

            <div className="ticket-total">

                <div>

                    <span>
                        TOTAL AMOUNT
                    </span>

                    <h2>
                        ₹{booking.totalAmount}
                    </h2>

                </div>


                <div className="ticket-status">

                    <span>
                        STATUS
                    </span>

                    <strong>
                        {booking.status.toUpperCase()}
                    </strong>

                </div>

            </div>


            {/* ===============================
                Actions
            =============================== */}

            <div className="ticket-actions">

                <button
                    className="print-button"
                    onClick={() =>
                        window.print()
                    }
                >
                    🖨 Print / Save Ticket
                </button>


                <button
                    className="back-button"
                    onClick={() =>
                        navigate("/my-bookings")
                    }
                >
                    ← Back to My Bookings
                </button>

            </div>


        </div>

    </div>

);

};


export default BookingDetails;