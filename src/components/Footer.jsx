import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaGithub  } from "react-icons/fa6";


const Footer = () => {
    return(
        <div className="container">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div className="col-md-4 d-flex align-items-center">
                <a href="/" className="mb-3 me-2 mb-md-0 text-decoration-none lh-1" style={{ color: "white" }}>
                    <svg className="bi" width="30" height="24"></svg>
                </a>
                <span className="mb-3 mb-md-0" style={{ color: "white" }}>© 2024 Company, Inc</span>
                </div>

                <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                <li className="ms-3"><a className="text-white" href="#"><FaXTwitter size={24}/></a></li>
                <li className="ms-3"><a className="text-white" href="#"><FaInstagram size={24}/></a></li>
                <li className="ms-3"><a className="text-white" href="#"><FaGithub size={24}/></a></li>
                </ul>
            </footer>
        </div>
    );
}

export default Footer;