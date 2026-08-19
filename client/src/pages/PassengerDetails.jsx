import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../styles/PassengerDetails.css";


const PassengerDetails = () => {

    const { journeyId } = useParams();

    const location = useLocation();

    const navigate = useNavigate();


    const selectedSeats =
        location.state?.selectedSeats || [];


    const [passengers, setPassengers] = useState(

        selectedSeats.map((seat) => ({

            seatNumber: seat,

            name: "",

            age: "",

            gender: ""

        }))

    );


    // ===============================
    // Handle Passenger Change
    // ===============================

    const handleChange = (
        index,
        field,
        value
    ) => {

        setPassengers((previous) => {

            const updated = [...previous];

            updated[index] = {

                ...updated[index],

                [field]: value

            };

            return updated;

        });

    };


    // ===============================
    // Submit
    // ===============================

    const handleContinue = (e) => {

        e.preventDefault();


        const incompletePassenger =
            passengers.some(
                (passenger) =>
                    !passenger.name ||
                    !passenger.age ||
                    !passenger.gender
            );


        if (incompletePassenger) {

            alert(
                "Please enter all passenger details."
            );

            return;

        }


        navigate(
            `/booking/${journeyId}/confirm`,
            {
                state: {
                    selectedSeats,
                    passengers
                }
            }
        );

    };


    // ===============================
    // No Seats
    // ===============================

    if (selectedSeats.length === 0) {

        return (

            <div className="passenger-message">

                <div className="message-card">

                    <h2>
                        No Seats Selected
                    </h2>

                    <p>
                        Please select at least one seat
                        before entering passenger details.
                    </p>

                    <button
                        onClick={() =>
                            navigate(-1)
                        }
                    >
                        Back to Seat Selection
                    </button>

                </div>

            </div>

        );

    }


    return (

        <div className="passenger-page">

            {/* =================================
                Page Header
            ================================= */}

            <div className="passenger-header">

                <h1>
                    Passenger Details
                </h1>

                <p>
                    Enter the details of each passenger
                    travelling with you.
                </p>

            </div>


            {/* =================================
                Selected Seats Summary
            ================================= */}

            <div className="selected-seat-summary">

                <div className="summary-icon">
                    ✓
                </div>

                <div>

                    <span>
                        Selected Seats
                    </span>

                    <strong>
                        {selectedSeats.join(", ")}
                    </strong>

                </div>

            </div>


            {/* =================================
                Passenger Form
            ================================= */}

            <form
                className="passenger-form"
                onSubmit={handleContinue}
            >

                {passengers.map(
                    (passenger, index) => (

                        <div
                            className="passenger-card"
                            key={passenger.seatNumber}
                        >

                            {/* Card Header */}

                            <div className="passenger-card-header">

                                <div>

                                    <h2>
                                        Passenger {index + 1}
                                    </h2>

                                    <p>
                                        Enter passenger information
                                    </p>

                                </div>


                                <div className="seat-badge">

                                    Seat{" "}
                                    {passenger.seatNumber}

                                </div>

                            </div>


                            {/* Form Fields */}

                            <div className="passenger-fields">

                                {/* Full Name */}

                                <div className="form-group full-width">

                                    <label>
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            passenger.name
                                        }
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter passenger name"
                                    />

                                </div>


                                {/* Age */}

                                <div className="form-group">

                                    <label>
                                        Age
                                    </label>

                                    <input
                                        type="number"
                                        min="1"
                                        max="120"
                                        value={
                                            passenger.age
                                        }
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                "age",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter age"
                                    />

                                </div>


                                {/* Gender */}

                                <div className="form-group">

                                    <label>
                                        Gender
                                    </label>

                                    <select
                                        value={
                                            passenger.gender
                                        }
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                "gender",
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="">
                                            Select Gender
                                        </option>

                                        <option value="Male">
                                            Male
                                        </option>

                                        <option value="Female">
                                            Female
                                        </option>

                                        <option value="Other">
                                            Other
                                        </option>

                                    </select>

                                </div>

                            </div>

                        </div>

                    )
                )}


                {/* =================================
                    Continue Button
                ================================= */}

                <div className="passenger-actions">

                    <button
                        type="button"
                        className="back-button"
                        onClick={() =>
                            navigate(-1)
                        }
                    >
                        Back
                    </button>


                    <button
                        type="submit"
                        className="continue-button"
                    >
                        Continue to Confirmation
                        <span>→</span>
                    </button>

                </div>

            </form>

        </div>

    );

};


export default PassengerDetails;