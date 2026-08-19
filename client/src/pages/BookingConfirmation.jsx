import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/BookingConfirmation.css";


const BookingConfirmation = () => {

    const { journeyId } = useParams();

    const location = useLocation();

    const navigate = useNavigate();


    const selectedSeats =
        location.state?.selectedSeats || [];

    const passengers =
        location.state?.passengers || [];


    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [journey, setJourney] = useState(null);


    // ===============================
    // Fetch Journey
    // ===============================

    useEffect(() => {

        const fetchJourney = async () => {

            try {

                setError("");

                const response =
                    await api.get(
                        `/journeys/${journeyId}`
                    );

                setJourney(
                    response.data.journey
                );

            } catch (error) {

                console.error(
                    "Journey Fetch Error:",
                    error
                );

                setError(
                    "Unable to load journey details."
                );

            }

        };


        fetchJourney();

    }, [journeyId]);


    // ===============================
    // Confirm Booking
    // ===============================

    const handleConfirmBooking = async () => {

        try {

            setLoading(true);
            setError("");


            const response = await api.post(
                "/bookings",
                {
                    journeyId,
                    selectedSeats,
                    passengers
                }
            );


            setBooking(
                response.data.booking
            );


        } catch (error) {

            console.error(
                "Booking Error:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Unable to complete booking."
            );


        } finally {

            setLoading(false);

        }

    };


    // ===============================
    // Missing Booking Information
    // ===============================

    if (
        selectedSeats.length === 0 ||
        passengers.length === 0
    ) {

        return (

            <div className="confirmation-message">

                <div className="confirmation-message-card">

                    <div className="warning-icon">
                        !
                    </div>

                    <h2>
                        Booking Information Missing
                    </h2>

                    <p>
                        Please select your seats and
                        enter passenger details before
                        continuing.
                    </p>

                    <button
                        onClick={() => navigate("/")}
                    >
                        Back to Home
                    </button>

                </div>

            </div>

        );

    }


    // ===============================
    // Booking Success
    // ===============================

    if (booking) {

        return (

            <div className="booking-success-page">

                <div className="success-card">

                    <div className="success-icon">
                        ✓
                    </div>

                    <h1>
                        Booking Confirmed!
                    </h1>

                    <p className="success-message">
                        Your ticket has been booked
                        successfully.
                    </p>


                    {/* Booking Reference */}

                    <div className="booking-reference">

                        <span>
                            Booking Reference
                        </span>

                        <strong>
                            {booking.bookingReference}
                        </strong>

                    </div>


                    {/* Booking Summary */}

                    <div className="success-summary">

                        <div>
                            <span>
                                Selected Seats
                            </span>

                            <strong>
                                {booking.selectedSeats.join(", ")}
                            </strong>
                        </div>


                        <div>
                            <span>
                                Total Amount
                            </span>

                            <strong>
                                ₹{booking.totalAmount}
                            </strong>
                        </div>


                        <div>
                            <span>
                                Status
                            </span>

                            <strong className="confirmed-status">
                                {booking.status}
                            </strong>
                        </div>

                    </div>


                    {/* Success Actions */}

                    <div className="success-actions">

                        <button
                            className="primary-action"
                            onClick={() =>
                                navigate("/my-bookings")
                            }
                        >
                            View My Bookings
                        </button>


                        <button
                            className="secondary-action"
                            onClick={() =>
                                navigate("/")
                            }
                        >
                            Back to Home
                        </button>

                    </div>

                </div>

            </div>

        );

    }


    // ===============================
    // Calculate Total
    // ===============================

    const pricePerSeat =
        journey?.bus?.price || 0;

    const totalAmount =
        pricePerSeat *
        selectedSeats.length;


    return (

        <div className="confirmation-page">

            {/* =================================
                Header
            ================================= */}

            <div className="confirmation-header">

                <h1>
                    Confirm Your Booking
                </h1>

                <p>
                    Review your journey and passenger
                    details before confirming your ticket.
                </p>

            </div>


            {/* =================================
                Journey Card
            ================================= */}

            <div className="journey-summary-card">

                <div className="journey-main">

                    <div>

                        <span className="summary-label">
                            BUS
                        </span>

                        <h2>
                            {journey?.bus?.busName ||
                                "Loading..."}
                        </h2>

                        <p>
                            {journey?.bus?.busType}
                        </p>

                    </div>

                </div>


                <div className="route-details">

                    <div className="route-point">

                        <strong>
                            {journey?.bus?.departureTime}
                        </strong>

                        <span>
                            {journey?.bus?.source}
                        </span>

                    </div>


                    <div className="route-line">

                        <span></span>

                        <small>
                            {journey?.bus?.duration}
                        </small>

                        <span></span>

                    </div>


                    <div className="route-point">

                        <strong>
                            {journey?.bus?.arrivalTime}
                        </strong>

                        <span>
                            {journey?.bus?.destination}
                        </span>

                    </div>

                </div>


                <div className="journey-date">

                    <span>
                        Journey Date
                    </span>

                    <strong>
                        {journey?.journeyDate
                            ? new Date(
                                journey.journeyDate
                            ).toLocaleDateString(
                                "en-IN",
                                {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric"
                                }
                            )
                            : "Loading..."}
                    </strong>

                </div>

            </div>


            {/* =================================
                Main Content
            ================================= */}

            <div className="confirmation-content">


                {/* =================================
                    Selected Seats
                ================================= */}

                <div className="confirmation-card">

                    <div className="card-heading">

                        <div className="heading-icon">
                            💺
                        </div>

                        <div>

                            <h2>
                                Selected Seats
                            </h2>

                            <p>
                                Seats selected for this journey
                            </p>

                        </div>

                    </div>


                    <div className="selected-seat-list">

                        {selectedSeats.map(
                            (seat) => (

                                <span
                                    key={seat}
                                    className="confirmation-seat"
                                >
                                    {seat}
                                </span>

                            )
                        )}

                    </div>

                </div>


                {/* =================================
                    Passenger Details
                ================================= */}

                <div className="confirmation-card">

                    <div className="card-heading">

                        <div className="heading-icon">
                            👤
                        </div>

                        <div>

                            <h2>
                                Passenger Details
                            </h2>

                            <p>
                                Review passenger information
                            </p>

                        </div>

                    </div>


                    <div className="passenger-review-list">

                        {passengers.map(
                            (passenger, index) => (

                                <div
                                    className="passenger-review"
                                    key={
                                        passenger.seatNumber
                                    }
                                >

                                    <div className="review-number">
                                        {index + 1}
                                    </div>


                                    <div className="review-details">

                                        <strong>
                                            {passenger.name}
                                        </strong>

                                        <span>
                                            Seat{" "}
                                            {passenger.seatNumber}
                                        </span>

                                    </div>


                                    <div className="review-info">

                                        <span>
                                            Age
                                        </span>

                                        <strong>
                                            {passenger.age}
                                        </strong>

                                    </div>


                                    <div className="review-info">

                                        <span>
                                            Gender
                                        </span>

                                        <strong>
                                            {passenger.gender}
                                        </strong>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                </div>


                {/* =================================
                    Payment Summary
                ================================= */}

                <div className="payment-card">

                    <div className="card-heading">

                        <div className="heading-icon">
                            ₹
                        </div>

                        <div>

                            <h2>
                                Payment Summary
                            </h2>

                            <p>
                                Your final booking amount
                            </p>

                        </div>

                    </div>


                    <div className="payment-details">

                        <div>

                            <span>
                                Number of Seats
                            </span>

                            <strong>
                                {selectedSeats.length}
                            </strong>

                        </div>


                        <div>

                            <span>
                                Price per Seat
                            </span>

                            <strong>
                                ₹{pricePerSeat}
                            </strong>

                        </div>


                        <div className="payment-total">

                            <span>
                                Total Amount
                            </span>

                            <strong>
                                ₹{totalAmount}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* =================================
                    Error
                ================================= */}

                {error && (

                    <div className="booking-error">

                        <strong>
                            Booking Failed
                        </strong>

                        <span>
                            {error}
                        </span>

                    </div>

                )}


                {/* =================================
                    Actions
                ================================= */}

                <div className="confirmation-actions">

                    <button
                        className="confirmation-back"
                        onClick={() =>
                            navigate(-1)
                        }
                        disabled={loading}
                    >
                        ← Back
                    </button>


                    <button
                        className="confirm-booking-button"
                        onClick={handleConfirmBooking}
                        disabled={
                            loading ||
                            !journey
                        }
                    >

                        {loading
                            ? "Booking..."
                            : "Confirm & Book Ticket"
                        }

                        {!loading && (
                            <span>
                                →
                            </span>
                        )}

                    </button>

                </div>

            </div>

        </div>

    );

};


export default BookingConfirmation;