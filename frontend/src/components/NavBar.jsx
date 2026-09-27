import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <nav className="navbar">

            <div className="navbar-left">
                <Link to="/home" className="navbar-logo">
                    BookSmart
                </Link>

                <Link to="/home">
                    Home
                </Link>

                <Link to="/my-books">
                    My Books
                </Link>
            </div>

            <div className="navbar-right">

                {user && (
                    <>
                       <span className="user-name">
    {user.name}
</span>

                        <button
                            className="logout-button"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                )}

            </div>

        </nav>
    );
}

export default Navbar;