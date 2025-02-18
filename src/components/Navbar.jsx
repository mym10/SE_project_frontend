import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

const Navbar= () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="#">MyWebsite</a>
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
                    <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
                    <Link to="/signup" className="btn btn-primary">Sign Up</Link> 
                    {/* router-dom will help take you to these routes using content written in app.js */}
                </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

//imade a couple of changes in the nav bar and added login and signup buttons. when i click on signup, show be routed to /signup and same for login.