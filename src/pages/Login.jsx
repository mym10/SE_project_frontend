import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import { loginUser } from "../services/api";

const Login = ({ setIsLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // For error handling
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const data = await loginUser(username, password);
            alert(data.message || "Login successful!");
            setIsLogin(true);
            navigate(`/${username}`); // Change this route based on your app structure
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div className="container login-container">
            <div className="header">
                <div className="text">Login</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
                <div className="input">
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
            </div>
            <div className="switch">
                Don't have an account?{" "}
                <span onClick={() => { setIsLogin(false); navigate("/signup"); }}>
                    Click here!
                </span>
            </div>
            <div className="login-submit-container">
                <button className="submit" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default Login;
