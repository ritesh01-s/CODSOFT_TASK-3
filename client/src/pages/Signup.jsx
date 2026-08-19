import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Auth.css";
import cityBus from "../assets/city_bus.avif";

const Signup = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const handleSignup = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");


        try {

            const response = await api.post(
                "/auth/register",
                {
                    name,
                    email,
                    phone,
                    password
                }
            );


            setSuccess(
                response.data.message ||
                "SAFAR account created successfully."
            );


            // Redirect to login after successful registration

            setTimeout(() => {

                navigate("/login");

            }, 1500);


        } catch (error) {

            console.error(
                "Signup Error:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Unable to create account."
            );


        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="auth-container" style={{
                backgroundImage: `url(${cityBus})`
            }}>

            <div className="auth-card">

                <h1>
                    Safar
                </h1>

                <h3>
                    Signup to Continue
                </h3>


                <form onSubmit={handleSignup}>

                    {/* Name */}

                    <input
                        type="text"
                        placeholder="Enter Your Name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        required
                    />


                    {/* Email */}

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />


                    {/* Phone */}

                    <input
                        type="tel"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) =>
                            setPhone(e.target.value)
                        }
                        required
                    />


                    {/* Password */}

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />


                    {/* Error */}

                    {error && (

                        <p
                            style={{
                                color: "#ff6b6b",
                                marginTop: "10px"
                            }}
                        >
                            {error}
                        </p>

                    )}


                    {/* Success */}

                    {success && (

                        <p
                            style={{
                                color: "#00C4A3",
                                marginTop: "10px"
                            }}
                        >
                            {success}
                        </p>

                    )}


                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Creating Account..."
                            : "Create Account"
                        }

                    </button>


                    <p>

                        Already have an account?

                        {" "}

                        <a
                            href="/login"
                            onClick={(e) => {

                                e.preventDefault();

                                navigate("/login");

                            }}
                        >
                            Log in
                        </a>

                    </p>

                </form>

            </div>

        </div>

    );

};


export default Signup;