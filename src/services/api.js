import axios from "axios";

const API_URL = "http://localhost:5000"; // Replace with your backend URL

// Login API
export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { 
            Username: username, 
            Password: password 
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Login failed. Please try again." };
    }
};

// Signup API
export const signupUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, userData, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
