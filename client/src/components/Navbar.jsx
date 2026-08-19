import { NavLink, Link, useNavigate } from "react-router-dom";
import safarLogo from "../assets/safar-logo.svg";

const Navbar = () => {

    const navigate = useNavigate();

    const token = localStorage.getItem("safarToken");


    const handleLogout = () => {

        localStorage.removeItem("safarToken");

        navigate("/login");

    };


    return (

        <header className="navbar">

            {/* ================= BRAND ================= */}

            <Link
                to="/"
                className="logo"
            >

                <img
                    src={safarLogo}
                    alt="SAFAR Logo"
                />


                <div className="brand-text">

                    <span className="brand-name">
                        SAFAR
                    </span>

                    <span className="tagline">
                        Your Journey, Simplified.
                    </span>

                </div>

            </Link>


            {/* ================= NAVIGATION ================= */}

            <nav className="nav-links">

                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    Home
                </NavLink>


                <NavLink
                    to="/search"
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    Buses
                </NavLink>


                {token && (

                    <NavLink
                        to="/my-bookings"
                        className={({ isActive }) =>
                            isActive ? "active" : ""
                        }
                    >
                        Bookings
                    </NavLink>

                )}


                <a href="#services">
                    Services
                </a>


                <a href="#about">
                    About
                </a>


                {/* ================= AUTH ================= */}

                {!token && (

                    <Link
                        to="/login"
                        className="nav-login"
                    >
                        Login
                    </Link>

                )}


                {!token && (

                    <Link
                        to="/register"
                        className="nav-signup"
                    >
                        Signup
                    </Link>

                )}


                {token && (

                    <button
                        type="button"
                        className="nav-logout"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                )}

            </nav>

        </header>

    );

};


export default Navbar;