import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import { loginUser } from "../services/api";
import { useEffect } from "react";

const Login = ({ setIsLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // For error handling
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Login component mounted");
    }, []);      

    const handleLogin = async () => {
        try {
            console.log("Logging in", { username, password });
            const data = await loginUser(username, password);
            console.log("Response:", data);
    
            setIsLogin(true);
    
            navigate(data.redirect);
    
        } catch (error) {
            console.error("Login error:", error);
            setError(error.message || "Login failed.");
        }
    };
    

    return (
        <div className="container login-container">
            <div className="header">
                <div className="text">Login</div>
                <div className="underline"></div>
            </div>
            
            {error && <div className="error-message">{error}</div>}
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
            <button className="submit" type="button" onClick={() => { 
                    console.log("Button clicked");
                    handleLogin();
                }}>Login</button>
            </div>
        </div>
    );
};

export default Login;
