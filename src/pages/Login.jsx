import React, { useState } from "react";
import "./Login.css";
import "./Signup.css";

const Signup = () => {
    const [login, setLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [branch, setBranch] = useState("CSE");
    const [passwordError, setPasswordError] = useState("");

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordError(e.target.value !== password ? "Passwords do not match!" : "");
    };

    const handleRoleChange = (selectedRole) => {
        setRole(selectedRole);
    };

    return (
        <div className={`container ${login ? "login-container" : "signup-container"}`}>
            <div className="header">
                <div className="text">{login ? "Login" : "Sign Up"}</div>
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
                {!login && (
                    <>
                        <div className="input">
                            <input 
                                type="password" 
                                placeholder="Confirm Password" 
                                value={confirmPassword} 
                                onChange={handleConfirmPasswordChange} 
                            />
                        </div>
                        {passwordError && <div className="error">{passwordError}</div>}
                        <div className="input role-selection">
                            <label>
                                <input type="checkbox" 
                                    checked={role === "Student"} 
                                    onChange={() => handleRoleChange("Student")} 
                                /> Student
                            </label>
                            <label>
                                <input type="checkbox" 
                                    checked={role === "Teacher"} 
                                    onChange={() => handleRoleChange("Teacher")} 
                                /> Teacher
                            </label>
                        </div>
                        <div className="branch-container">
                            <label className="branch-label">Branch:</label>
                            <select className="branch-dropdown" value={branch} onChange={(e) => setBranch(e.target.value)}>
                                <option value="CSE">CSE</option>
                                <option value="AI">AI</option>
                            </select>
                        </div>
                    </>
                )}
            </div>

            {login ? (
                <>
                    <div className="switch">
                        Don't have an account? <span onClick={() => setLogin(false)}>Click here!</span>
                    </div>
                    <div className="login-submit-container">
                        <button className="submit">Login</button>
                    </div>
                </>
            ) : (
                <>
                    <div className="switch">
                        Already have an account? <span onClick={() => setLogin(true)}>Click here!</span>
                    </div>
                    <div className="signup-submit-container">
                        <button className="submit">Sign Up</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Signup;
