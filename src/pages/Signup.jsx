import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Signup.css";
import { signupUser } from "../services/api";

const Signup = ({ setIsLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [branch, setBranch] = useState("CSE");
    const [passwordError, setPasswordError] = useState("");
    const [error, setError] = useState(""); // For error handling
    const navigate = useNavigate();

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        setPasswordError(newConfirmPassword !== password ? 
            <span className="error-text">Passwords do not match!</span> : 
            ""
        );
    };
    

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match!");
            return;
        }
    
        try {
            const data = await signupUser({
                Username: username, // Ensure capitalization matches backend
                Name: username, // change it to name when student_details schema is created
                Password: password,
                Role: role,
                Branch: branch,
            });
            alert(data.message || "Signup successful!");
            setIsLogin(true);
            navigate(`/${username}`);
        } catch (error) {
            setError(error.response?.data?.message || "Signup failed.");
        }
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
                <button className="submit" onClick={handleSignup}>sign up</button>
            </div>
        </div>
    );
};

export default Signup;
