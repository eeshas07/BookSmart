import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${API_URL}/api/auth/login`,
                {
                    email,
                    password
                }
            );

            // Save JWT token
            localStorage.setItem("token", response.data.token);

            // Save basic user information
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            setMessage("Login successful");

            // We'll create this page next
            navigate("/home");

        } catch (error) {
            setMessage(
                error.response?.data?.message || "Login failed"
            );
        }
    };

   return (
    <div className="auth-page">

        <div className="auth-card">

            <div className="auth-logo">
                <h1>BookSmart</h1>
                <p>
                    Track your reading journey and share book reviews
                </p>
            </div>

            <form onSubmit={handleSubmit}>

                <div className="auth-field">
                    <label>Email ID</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="auth-field">
                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="auth-button"
                >
                    Login
                </button>

            </form>

            <p className="auth-switch">
                Don't have an account?{" "}
                <Link to="/register">
                    Register
                </Link>
            </p>

        </div>

    </div>
);
}

export default Login;