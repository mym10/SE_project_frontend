
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Box, Typography } from "@mui/material";
import "../css/studentProfile.css";

const StudentProfile = () => {
  const profileData = {
    fullName: "Zara",
    studentID: "se22ucse144",
    email: "se22ucse144@mahi.edu.in",
    branch: "CSE",
    year: "3",
    currentGPA: 8.5,
    enrolledCourses: [
      { name: "Data Structures", id: "CS101" },
      { name: "Algorithms", id: "CS102" },
      { name: "Discrete Mathematics", id: "MATH101" },
      { name: "Operating Systems", id: "CS103" },
    ],
  };

  return (
    <div className="sprofile-container">
      <div className="profile-main">
        <div className="profile-left">
          <FaUserCircle className="profile-icon" size="140px" />
        </div>
        <div className="profile-right">
          <h2>{profileData.fullName}</h2>
          
          {/* Student Details */}
          <p><strong>Branch:</strong> {profileData.branch}</p>
          <p> <strong>Year:</strong> {profileData.year} </p>
          <p> <strong>Student ID:</strong> {profileData.studentID} </p>
          <p> <strong>Email:</strong> {profileData.email} </p>
          <p> <strong>Current GPA:</strong> {profileData.currentGPA}
          </p>
        </div>
      </div>

      {/* Enrolled Courses Section */}
      <div className="bigger-container">
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5" gutterBottom fontFamily={"Plus Jakarta Sans"}>
            Enrolled Courses
          </Typography>
          {profileData.enrolledCourses.length === 0 ? (
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "white",
                fontFamily: "Plus Jakarta Sans",
              }}
            >
              No Courses Enrolled
            </Typography>
          ) : (
            <Box
              sx={{
                textAlign: "left",
                display: "inline-block",
                background: "rgba(0, 0, 0, 0.4)",
                padding: "20px",
                borderRadius: "15px",
                width: "100%",
                maxWidth: "1300px",
                fontSize: "1.2rem",
                fontWeight: "bold",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              <ul style={{ margin: 0, padding: 0, listStyleType: "none" }}>
                {profileData.enrolledCourses.map((course, index) => (
                  <li
                    key={index}
                    className="backlog-item"
                    style={{ cursor: "pointer", padding: "10px 0" }}
                  >
                    {course.name}
                    <span className="course-code"> ({course.id})</span>
                  </li>
                ))}
              </ul>
            </Box>
          )}
        </Box>
      </div>
    </div>
  );
};

export default StudentProfile;
