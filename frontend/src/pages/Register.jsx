import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../api";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    // Password strength
    const getPasswordStrength = () => {
        if (password.length === 0) return "";

        if (password.length < 6) {
            return "Weak";
        } else if (password.length < 7) {
            return "Medium";
        } else {
            return "Strong";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post(
                `${API_URL}/api/auth/register`,
                {
                    name,
                    email,
                    password
                }
            );

            setMessage(response.data.message);

            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            // Go to login after successful registration
            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    const passwordStrength = getPasswordStrength();

    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-logo">
                    <h1>BookSmart</h1>

                    <p>
                        Track your reading journey and share
                        book reviews
                    </p>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="auth-field">
                        <label>Name</label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label>Email ID</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                        {passwordStrength && (
                            <p
                                className={`password-strength ${passwordStrength.toLowerCase()}`}
                            >
                                Password Strength:{" "}
                                <strong>
                                    {passwordStrength}
                                </strong>
                            </p>
                        )}
                    </div>

                    <div className="auth-field">
                        <label>Confirm Password</label>

                        <input
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(
                                    e.target.value
                                )
                            }
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-button"
                    >
                        Register
                    </button>

                </form>

                {message && (
                    <p className="auth-message">
                        {message}
                    </p>
                )}

                <p className="auth-switch">
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Register;