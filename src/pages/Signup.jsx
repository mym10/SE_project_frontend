import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Signup.css";
import { signupUser } from "../services/api";

const Signup = ({ setIsLogin }) => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [branch, setBranch] = useState("CSE");
    const [passwordError, setPasswordError] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        setPasswordError(newConfirmPassword !== password ? 
            <span className="error-text">Passwords do not match!</span> : 
            ""
        );
    };
    
    const handleSignup = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");
        setPasswordError("");

        // Validate all required fields
        if (!username || !password || !role) {
            setError("Username, password and role are required");
            setIsSubmitting(false);
            return;
        }

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match!");
            setIsSubmitting(false);
            return;
        }
    
        try {
            console.log("Submitting:", { Username: username, Name: name || username, Password: password, Role: role, Branch: branch });
            const data = await signupUser({
                Username: username, // Matches backend exactly
                Name: name || username, // Defaults to username if name not provided
                Password: password,
                Role: role,
                Branch: branch
            });
            
            if (data.message === "User already exists!") {
                setError("Username is already taken");
                return;
            }
            
            //alert(data.message || "Signup successful!");
            setIsLogin(true);
            navigate(data.redirect || `/${username}`);
        } catch (error) {
            console.error("Signup error:", error);
            setError(error.response?.data?.message || "Signup failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="container signup-container" onSubmit={handleSignup}>
            <div className="header">
                <div className="text">Sign Up</div>
                <div className="underline"></div>
            </div>
            
            {error && <div className="error-message">{error}</div>}

            <div className="inputs">
                <div className="input">
                    <input 
                        type="text" 
                        placeholder="Username*" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required
                    />
                </div>
                <div className="input">
                    <input 
                        type="text" 
                        placeholder="Name " 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                <div className="input">
                    <input 
                        type="password" 
                        placeholder="Password*" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                        minLength="6"
                    />
                </div>
                <div className="input">
                    <input 
                        type="password" 
                        placeholder="Confirm Password*" 
                        value={confirmPassword} 
                        onChange={handleConfirmPasswordChange} 
                        required
                    />
                </div>
                {passwordError && <div className="error">{passwordError}</div>}

                <div className="input role-selection">
                    <label>
                        <input 
                            type="radio" 
                            name="role" 
                            value="Student" 
                            checked={role === "Student"} 
                            onChange={() => setRole("Student")} 
                            required
                        /> Student
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="role" 
                            value="Professor" 
                            checked={role === "Professor"} 
                            onChange={() => setRole("Professor")} 
                        /> Professor
                    </label>
                </div>

                {/* Modified branch dropdown section */}
                <div className="input dropdown-container">
                    <select 
                        className="branch-dropdown" 
                        value={branch} 
                        onChange={(e) => setBranch(e.target.value)}
                    >
                        <option value="" disabled hidden>Branch*</option>
                        <option value="CSE">CSE</option>
                        <option value="AI">AI</option>
                    </select>
                    <span className="dropdown-arrow">▼</span>
                </div>
            </div>

            <div className="switch">
                Already have an account?{" "}
                <span onClick={() => { setIsLogin(true); navigate("/login"); }}>
                    Click here!
                </span>
            </div>

            <div className="signup-submit-container">
                <button 
                    className="submit" 
                    type="submit"
                    disabled={isSubmitting || !username || !password || !confirmPassword || !role}
                >
                    {isSubmitting ? "Processing..." : "Sign Up"}
                </button>
            </div>
        </form>
    );
};

export default Signup;