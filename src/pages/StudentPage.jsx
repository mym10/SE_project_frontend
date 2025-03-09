import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Cards from "../components/Cards";

const gpaData = [
  { semester: "Sem 1", gpa: 7.2 },
  { semester: "Sem 2", gpa: 7.5 },
  { semester: "Sem 3", gpa: 8.1 },
  { semester: "Sem 4", gpa: 8.8 },
  { semester: "Sem 5", gpa: 9.4 },
  { semester: "Sem 6", gpa: 9.5 },
];

const semesterData = [
  {
    semester: "Sem 1",
    gpa: 7.2,
    subjects: [
      { subject: "Calculus", score: 80 },
      { subject: "Intro to EE", score: 85 },
      { subject: "English", score: 75 },
      { subject: "French", score: 70 },
      { subject: "Chemistry", score: 90 },
    ],
    backlogs: ["Calculus"],
  },
  {
    semester: "Sem 2",
    gpa: 7.5,
    subjects: [
      { subject: "M2", score: 78 },
      { subject: "Data Structures", score: 82 },
      { subject: "Biology", score: 80 },
      { subject: "Discrete Math", score: 75 },
    ],
    backlogs: ["Discrete Math"],
  },
  {
    semester: "Sem 3",
    gpa: 8.1,
    subjects: [
      { subject: "DAA", score: 80 },
      { subject: "Optimization Techniques", score: 85 },
      { subject: "Signals and Systems", score: 75 },
      { subject: "Physics", score: 70 },
      { subject: "Design Thinking", score: 50 },
    ],
    backlogs: ["Signals & Systems"],
  },
  {
    semester: "Sem 4",
    gpa: 8.8,
    subjects: [
      { subject: "Machine Learning", score: 80 },
      { subject: "AI", score: 85 },
      { subject: "DLD", score: 75 },
      { subject: "TOC", score: 70 },
    ],
    backlogs: [],
  },
  {
    semester: "Sem 5",
    gpa: 9.4,
    subjects: [
      { subject: "SE", score: 80 },
      { subject: "DNN", score: 85 },
      { subject: "CN", score: 75 },
    ],
    backlogs: [],
  },
];

const StudentPage = () => {
  const allBacklogs = semesterData.flatMap((sem) => sem.backlogs);

  return (
    <div style={{ background: "#0a0f2d", minHeight: "100vh", color: "white" }}>
      <Navbar />
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Overall Semester-wise Performance
        </Typography>

        <Card
          sx={{
            background: "rgba(0, 0, 0, 0.4)",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "15px",
          }}
        >
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={gpaData}>
                <XAxis dataKey="semester" tick={{ fill: "white" }} />
                <YAxis tick={{ fill: "white" }}domain={[0, 10]} /> 
                <Tooltip />
                <Line type="monotone" dataKey="gpa" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Grid Layout for Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          {semesterData.map((semester, index) => (
            <Cards key={index} semesterData={[semester]} showGpa />
          ))}
        </Box>

        {/* Backlogs Section */}
        <Box sx={{ marginTop: "40px", textAlign: "center" }}>
         <Typography variant="h5" gutterBottom>
             Backlogs
         </Typography>
        {allBacklogs.length === 0 ? (
     <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold", color: "white" }}>
             No Backlogs 🎉
     </Typography>
     ) : (
    <Box
      sx={{
        textAlign: "left",
        display: "inline-block",
        background: "rgba(0, 0, 0, 0.4)",
        padding: "20px",
        borderRadius: "15px",
        width: "50%",
        minWidth: "300px",
        fontSize: "1.2rem",
        fontWeight: "bold",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <ul style={{ margin: 0, padding: 0, listStyleType: "none" }}>
        {allBacklogs.map((subject, index) => (
          <li
            key={index}
            style={{
              padding: "12px 0",
              color: "#89CFF0",
              borderBottom: "1px solid rgba(255,255,255,0.2)",
              transition: "background 0.3s",
              borderRadius: "8px",
              paddingLeft: "10px",
            }}
            onMouseEnter={(e) => (e.target.style.background = "rgba(255,255,255,0.2)")}
            onMouseLeave={(e) => (e.target.style.background = "transparent")}
          >
            {subject}
          </li>
        ))}
      </ul>
    </Box>
  )}
</Box>

      </Box>
    </div>
  );
};

export default StudentPage;
