import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Home.css";

import busBackground from "../assets/bus_bgr.jpg";


const Home = () => {

    const navigate = useNavigate();

    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");


    // =========================================
    // Swap Source and Destination
    // =========================================

    const handleSwap = () => {

        setSource(destination);
        setDestination(source);

    };


    // =========================================
    // Search Buses
    // =========================================

    const handleSearch = (event) => {

        event.preventDefault();


        if (!source || !destination || !date) {

            alert(
                "Please select source, destination and journey date."
            );

            return;

        }


        if (
            source.trim().toLowerCase() ===
            destination.trim().toLowerCase()
        ) {

            alert(
                "Source and destination cannot be the same."
            );

            return;

        }


        navigate(
            `/search?source=${encodeURIComponent(
                source.trim()
            )}&destination=${encodeURIComponent(
                destination.trim()
            )}&date=${date}`
        );

    };


    return (

        <main className="home-page">


            {/* =====================================
                HERO SECTION
            ===================================== */}

            <section className="hero">


                <img
                    src={busBackground}
                    alt="SAFAR Bus"
                    className="hero-image"
                />


                <div className="hero-overlay"></div>


                <div className="hero-content">

                    <p className="hero-eyebrow">
                        TRAVEL WITH CONFIDENCE
                    </p>


                    <h1>
                        Your Journey,
                        <br />
                        <span>
                            Our Responsibility.
                        </span>
                    </h1>


                    <p className="hero-description">
                        Search buses, choose your seat and
                        book your journey with SAFAR.
                    </p>

                </div>


                {/* =====================================
                    SEARCH CARD
                ===================================== */}

                <form
                    className="search-card"
                    onSubmit={handleSearch}
                >


                    {/* FROM */}

                    <div className="input-group">

                        <label htmlFor="source">
                            FROM
                        </label>

                        <input
                            id="source"
                            type="text"
                            placeholder="Select Source"
                            value={source}
                            onChange={(event) =>
                                setSource(event.target.value)
                            }
                            required
                        />

                    </div>


                    {/* SWAP */}

                    <button
                        type="button"
                        className="swap-btn"
                        onClick={handleSwap}
                        aria-label="Swap source and destination"
                    >
                        ⇄
                    </button>


                    {/* TO */}

                    <div className="input-group">

                        <label htmlFor="destination">
                            TO
                        </label>

                        <input
                            id="destination"
                            type="text"
                            placeholder="Select Destination"
                            value={destination}
                            onChange={(event) =>
                                setDestination(event.target.value)
                            }
                            required
                        />

                    </div>


                    {/* DATE */}

                    <div className="input-group date-group">

                        <label htmlFor="journey-date">
                            JOURNEY DATE
                        </label>

                        <input
                            id="journey-date"
                            type="date"
                            value={date}
                            min={
                                new Date()
                                    .toISOString()
                                    .split("T")[0]
                            }
                            onChange={(event) =>
                                setDate(event.target.value)
                            }
                            required
                        />

                    </div>


                    {/* SEARCH BUTTON */}

                    <button
                        type="submit"
                        className="search-btn"
                    >
                        SEARCH BUSES
                    </button>


                </form>

            </section>


            {/* =====================================
                WHY SAFAR
            ===================================== */}

            <section
                className="why-safar"
                id="services"
            >

                <div className="section-heading">

                    <p>
                        WHY SAFAR?
                    </p>

                    <h2>
                        Travel made simple.
                    </h2>

                    <span>
                        Everything you need for a smooth
                        and convenient bus booking experience.
                    </span>

                </div>


                <div className="features">


                    {/* FEATURE 1 */}

                    <article className="feature-card">

                        <div className="feature-icon">
                            🔎
                        </div>

                        <h3>
                            Easy Search
                        </h3>

                        <p>
                            Find buses quickly by entering
                            your source, destination and
                            journey date.
                        </p>

                    </article>


                    {/* FEATURE 2 */}

                    <article className="feature-card">

                        <div className="feature-icon">
                            💺
                        </div>

                        <h3>
                            Choose Your Seat
                        </h3>

                        <p>
                            Select your preferred seat and
                            travel comfortably on your journey.
                        </p>

                    </article>


                    {/* FEATURE 3 */}

                    <article className="feature-card">

                        <div className="feature-icon">
                            🔒
                        </div>

                        <h3>
                            Secure Booking
                        </h3>

                        <p>
                            Your booking information is securely
                            stored and available whenever you need it.
                        </p>

                    </article>


                </div>

            </section>


        </main>

    );

};


export default Home;