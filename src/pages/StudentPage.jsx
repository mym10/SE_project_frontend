// Updated dynamic StudentPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Cards from "../components/Cards";
import "../css/studentPage.css";

const calculateGrade = (total) => {
  if (total >= 90) return "A+";
  if (total >= 80) return "A";
  if (total >= 70) return "B+";
  if (total >= 60) return "B";
  if (total >= 50) return "C";
  return "F";
};

const getStatus = (grade) => (grade === "F" ? "Fail" : "Pass");

const calculateGradePoint = (total) => {
  if (total >= 90) return 10;
  if (total >= 80) return 9;
  if (total >= 70) return 8;
  if (total >= 60) return 7;
  if (total >= 50) return 6;
  if (total >= 40) return 5;
  return 0; // F
};

const computeGPA = (courses) => {
  let totalWeighted = 0;
  let totalCredits = 0;

  courses.forEach((course) => {
    const total =
      (course.Minor1 * course["Minor1_Weightage (%)"] +
        course.Minor2 * course["Minor2_Weightage (%)"] +
        course.EndSem * course["EndSem_Weightage (%)"]) /
      100;

    const gradePoint = calculateGradePoint(total);
    const credit = course.credit || 3;

    totalWeighted += gradePoint * credit;
    totalCredits += credit;
  });

  return totalCredits ? totalWeighted / totalCredits : 0;
};

const StudentPage = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [semesterData, setSemesterData] = useState([]);
  const [gpaData, setGpaData] = useState([]);
  const [backlogs, setBacklogs] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/${username}`)
      .then((res) => {
        const data = res.data; // { Sem1: [...], Sem2: [...], ... }
        const semList = [];
        const gpaList = [];
        const backlogList = [];

        Object.entries(data).forEach(([semKey, courses]) => {
          const radarSubjects = [];

          courses.forEach((course) => {
            const total =
              (course.Minor1 * course["Minor1_Weightage (%)"] +
                course.Minor2 * course["Minor2_Weightage (%)"] +
                course.EndSem * course["EndSem_Weightage (%)"]) /
              100;

            const credit = course.credit || 3;
            const grade = calculateGrade(total);
            const subjectObj = {
              subject: course.courseCode,
              score: Math.round(total),
            };
            radarSubjects.push(subjectObj);

            if (grade === "F") backlogList.push(course.courseCode);
          });

          const gpa = computeGPA(courses);

          semList.push({
            semester: semKey,
            gpa: parseFloat(gpa.toFixed(2)),
            subjects: radarSubjects,
            backlogs: radarSubjects
              .filter((s) => backlogList.includes(s.subject))
              .map((b) => b.subject),
          });

          gpaList.push({ semester: semKey, gpa: parseFloat(gpa.toFixed(2)) });
        });

        setSemesterData(semList);
        setGpaData(gpaList);
        setBacklogs(backlogList);
      })
      .catch((err) => console.error(err));
  }, [username]);

  return (
    <div style={{ background: "#0a0f2d", minHeight: "100vh", color: "white" }}>
      <Navbar />
      <div className="welcome-board">
        <h1>Welcome, {username}!</h1>
        <p>This is your personalized dashboard.</p>
      </div>
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
                <YAxis tick={{ fill: "white" }} domain={[0, 10]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="gpa"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
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
            <div
              key={index}
              onClick={() => navigate(`/${username}/${index + 1}`)}
              style={{ cursor: "pointer" }}
            >
              <Cards semesterData={[semester]} username={username} showGpa />
            </div>
          ))}
        </Box>

        {/* Backlogs Section */}
        <Box sx={{ marginTop: "40px", textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            Backlogs
          </Typography>
          {backlogs.length === 0 ? (
            <Typography
              sx={{ fontSize: "1.2rem", fontWeight: "bold", color: "white" }}
            >
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
                {backlogs.map((subject, index) => (
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
                    onMouseEnter={(e) =>
                      (e.target.style.background = "rgba(255,255,255,0.2)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.background = "transparent")
                    }
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