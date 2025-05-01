import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosAnalytics } from "react-icons/io";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navbar.css';
import { FaUserCircle } from "react-icons/fa";
import { useEffect } from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation(); 

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
                <IoIosAnalytics className="icon" onClick={() => navigate("/")}/>
                <a className="navbar-brand" onClick={() => navigate("/")}>VoSS</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    {pathname === "/" ? ( 
                        <div>
                            <button className="btn btn-outline-light me-2" onClick={() => navigate("/login")}>Login</button>
                            <button  className="btn btn-primary" onClick={() => navigate("/signup")}>Signup</button>
                        </div>
                    ) : (
                        <div>
                            <FaUserCircle size="30px"/>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
