import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import "../css/studentProfile.css";

const getSemesterFromCode = (code) => {
  if (/..11../.test(code)) return "Sem 1";
  if (/..12../.test(code)) return "Sem 2";
  if (/..21../.test(code)) return "Sem 3";
  if (/..22../.test(code)) return "Sem 4";
  if (/..31../.test(code)) return "Sem 5";
  if (/..32../.test(code)) return "Sem 6";
  if (/..41../.test(code)) return "Sem 7";
  if (/..42../.test(code)) return "Sem 8";
  return "Others";
};

const StudentProfile = () => {
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Step 1: Fetch profile
        const res = await axios.get(`http://localhost:5000/${username}/studentProfile`);
        const data = res.data;

        const profile = {
          fullName: data.Name,
          studentID: data.Username,
          email: `${data.Username.toLowerCase()}@mahindrauniversity.edu.in`,
          branch: data.Branch,
          year: "3",
          currentGPA: "Loading...",
          enrolledCourses: data["Enrolled Courses"].map(code => ({
            id: code,
            name: code
          })),
        };

        setProfileData(profile);

        // Step 2: Fetch GPA
        const gpaRes = await axios.get(`http://localhost:5000/${username}/gpa`);
        setProfileData(prev => ({ ...prev, currentGPA: gpaRes.data.gpa }));
      } catch (err) {
        console.error("Failed to fetch student profile or GPA:", err);
      }
    };

    fetchProfile();
  }, [username]);

  if (!profileData) return <div className="sprofile-container">Loading...</div>;

  const coursesBySemester = {};
  profileData.enrolledCourses.forEach(course => {
    const sem = getSemesterFromCode(course.id);
    if (!coursesBySemester[sem]) {
      coursesBySemester[sem] = [];
    }
    coursesBySemester[sem].push(course.id);
  });

  return (
    <div className="sprofile-container">
      <h1 className="title">Student's Profile</h1>

      {/* Main Info */}
      <div className="profile-main">
        <div className="profile-left">
          <FaUserCircle className="profile-icon" size="140px" />
        </div>
        <div className="profile-right">
          <h2>{profileData.fullName}</h2>
          <p><strong>Branch:</strong> {profileData.branch}</p>
          <p><strong>Year:</strong> {profileData.year}</p>
          <p><strong>Student ID:</strong> {profileData.studentID}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Current GPA:</strong> {profileData.currentGPA}</p>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bigger-container">
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5" gutterBottom fontFamily={"Plus Jakarta Sans"}>
            Enrolled Courses
          </Typography>

          {profileData.enrolledCourses.length === 0 ? (
            <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold", color: "white" }}>
              No Courses Enrolled
            </Typography>
          ) : (
            <Box sx={{
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
            }}>
              <Box sx={{
                overflowX: "auto",
                marginTop: "20px",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "10px",
              }}>
                <table style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "center",
                  color: "white"
                }}>
                  <thead>
                    <tr>
                      {Object.keys(coursesBySemester).map((sem, index) => (
                        <th key={index} style={{ padding: "10px", borderBottom: "1px solid rgba(255,255,255,0.3)" }}>
                          {sem}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {Object.values(coursesBySemester).map((courseList, index) => (
                        <td key={index} style={{ verticalAlign: "top", padding: "10px" }}>
                          {courseList.map((code, i) => (
                            <div key={i} style={{ padding: "5px 0" }}>{code}</div>
                          ))}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </Box>
            </Box>
          )}
        </Box>
      </div>
    </div>
  );
};

export default StudentProfile;
