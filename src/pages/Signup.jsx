import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = ({ setIsLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [branch, setBranch] = useState("CSE");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordError(e.target.value !== password ? "Passwords do not match!" : "");
    };

    return (
        <div className="container signup-container">
            <div className="header">
                <div className="text">Sign Up</div>
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
                <div className="input">
                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        value={confirmPassword} 
                        onChange={handleConfirmPasswordChange} 
                    />
                </div>
                {passwordError && <div className="error">{passwordError}</div>}

                {/* role selection using radio buttons */}
                <div className="input role-selection">
                    <label>
                        <input 
                            type="radio" 
                            name="role" 
                            value="Student" 
                            checked={role === "Student"} 
                            onChange={() => setRole("Student")} 
                        /> Student
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="role" 
                            value="Teacher" 
                            checked={role === "Teacher"} 
                            onChange={() => setRole("Teacher")} 
                        /> Teacher
                    </label>
                </div>

                {/* branch dropdown */}
                <div className="branch-container">
                    <label className="branch-label">Branch:</label>
                    <select 
                        className="branch-dropdown" 
                        value={branch} 
                        onChange={(e) => setBranch(e.target.value)}
                    >
                        <option value="CSE">CSE</option>
                        <option value="AI">AI</option>
                    </select>
                </div>
            </div>

            {/* link to login page */}
            <div className="switch">
                already have an account?{" "}
                <span onClick={() => { setIsLogin(true); navigate("/login"); }}>
                    Click here!
                </span>
            </div>

            <div className="signup-submit-container">
                <button className="submit">sign up</button>
            </div>
        </div>
    );
};

export default Signup;
