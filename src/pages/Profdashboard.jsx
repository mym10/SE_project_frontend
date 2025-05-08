// No changes to imports needed
import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Box, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import "../css/Profdashboard.css";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const ProfProfile = () => {
  const profileData = {
    fullName: "Dr. Neha Patel",
    professorID: "MUF1117",
    email: "muf1117@mahindrauniversity.edu.in",
    department: "Computer Science",
    branch: "CSE",
    coursesTaught: [
      { id: "CS101", name: "Introduction to Programming" },
      { id: "CS201", name: "Data Structures" },
      { id: "CS301", name: "Algorithms" },
    ],
  };

  const distributionData = {
    overall: [
      { marks: "0-10", students: 2 },
      { marks: "10-20", students: 5 },
      { marks: "20-30", students: 8 },
      { marks: "30-40", students: 10 },
      { marks: "40-50", students: 6 },
      { marks: "50-60", students: 4 },
      { marks: "60-70", students: 7 },
      { marks: "70-80", students: 5 },
      { marks: "80-90", students: 3 },
      { marks: "90-100", students: 1 },
    ],
    minor1: [
      { marks: "0-10", students: 3 },
      { marks: "10-20", students: 6 },
      { marks: "20-30", students: 9 },
      { marks: "30-40", students: 8 },
      { marks: "40-50", students: 5 },
    ],
    minor2: [
      { marks: "0-10", students: 1 },
      { marks: "10-20", students: 4 },
      { marks: "20-30", students: 7 },
      { marks: "30-40", students: 10 },
      { marks: "40-50", students: 8 },
    ],
    endsem: [
      { marks: "0-10", students: 2 },
      { marks: "10-20", students: 3 },
      { marks: "20-30", students: 5 },
      { marks: "30-40", students: 7 },
      { marks: "40-50", students: 9 },
      { marks: "50-60", students: 6 },
      { marks: "60-70", students: 4 },
      { marks: "70-80", students: 2 },
    ],
  };

  const assessments = [
    { label: "Overall", value: "overall" },
    { label: "Minor 1", value: "minor1" },
    { label: "Minor 2", value: "minor2" },
    { label: "Endsem", value: "endsem" },
  ];

  const [activeAssessment, setActiveAssessment] = useState("overall");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const validAssessments = assessments.map(a => a.value);
    if (!validAssessments.includes(activeAssessment)) {
      console.warn(`Invalid activeAssessment: ${activeAssessment}. Resetting to "overall".`);
      setActiveAssessment("overall");
    }
  }, [activeAssessment]);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCourse(null);
  };

  return (
    <div className="sprofile-container">
      <h1 className="title">Professor's Dashboard</h1>

      {/* Profile Details */}
      <div className="profile-main">
        <div className="profile-left">
          <FaUserCircle className="profile-icon" size="140px" />
        </div>
        <div className="profile-right">
          <h2>{profileData.fullName}</h2>
          <p><strong>Department:</strong> {profileData.department}</p>
          <p><strong>Professor ID:</strong> {profileData.professorID}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Branch:</strong> {profileData.branch}</p>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bigger-container">
        <Box className="courses-taught-container">
          <Typography variant="h5" className="courses-taught-title">Courses Taught</Typography>
          {profileData.coursesTaught.length === 0 ? (
            <Typography className="no-courses-message">No Courses Taught</Typography>
          ) : (
            <Box className="courses-table-container">
              <Box className="courses-table-wrapper">
                <table className="courses-table">
                  <thead>
                    <tr>
                      <th>Course ID</th>
                      <th>Course Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profileData.coursesTaught.map((course) => (
                      <tr key={course.id} onClick={() => handleCourseClick(course)} className="course-row">
                        <td><a href="#" className="course-link">{course.id}</a></td>
                        <td>{course.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </Box>
          )}
        </Box>
      </div>

      {/* Dialog Popup with Chart */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>{selectedCourse ? selectedCourse.name : ""}</DialogTitle>
        <DialogContent>
          <div className="assessment-buttons">
            {assessments.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setActiveAssessment(value)}
                className={activeAssessment === value ? "active" : ""}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="line-inner-box">
            <h3 className="distributionn-title">Marks Distribution</h3>
            <div className="linechart-wrapperr">
              <div className="linechart-inner-boxx">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={distributionData[activeAssessment]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="marks" angle={-45} textAnchor="end" height={70} />
                    <YAxis />
                    <Tooltip
                      content={({ payload }) =>
                        payload && payload.length ? (
                          <div className="tooltip-content">
                            <p>Students: {payload[0].value}</p>
                          </div>
                        ) : null
                      }
                    />
                    <Legend />
                    <Line type="monotone" dataKey="students" stroke="#FF2AA8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} className="close-button">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfProfile;
