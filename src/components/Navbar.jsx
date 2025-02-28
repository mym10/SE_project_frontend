import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { IoIosAnalytics } from "react-icons/io";
import '../css/navbar.css';

const Navbar= () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
                <IoIosAnalytics className="icon" />
                <a className="navbar-brand" href="#">VoSS</a>
                <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                >
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <div>
                    <Link to="/login" className="btn btn-outline-light me-2">Sign In</Link>
                    <Link to="/signup" className="btn btn-primary">Sign Up</Link> 
                    {/* router-dom will help take you to these routes using content written in app.js */}
                </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;