import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Auth.css";
import cityBus from "../assets/city_bus.avif";

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

            const token = response.data.token;

            if (!token) {

                setError(
                    "Login successful but token was not received."
                );

                return;
            }

            localStorage.setItem(
                "safarToken",
                token
            );

            navigate("/");

        } catch (error) {

            console.error(
                "Login Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Login failed."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div
            className="auth-container"
            style={{
                backgroundImage: `url(${cityBus})`
            }}
        >

            <div className="auth-card">

                <h1>Safar</h1>

                <h3>
                    Login to Continue
                </h3>


                {error && (

                    <div className="auth-error">
                        {error}
                    </div>

                )}


                <form onSubmit={handleLogin}>

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />


                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />


                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"
                        }

                    </button>


                    <div className="auth-links">

                        <Link
                            to="/forgot-password"
                            className="forgot-link"
                        >
                            Forgot Password?
                        </Link>


                        <p>
                            Don't have an account?

                            {" "}

                            <Link to="/signup">
                                Sign Up
                            </Link>
                        </p>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default Login;