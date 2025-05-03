import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";
import { useNavigate } from "react-router-dom"; 

const Cards = ({ semesterData, username }) => {
  const navigate = useNavigate(); 

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "15px" }}>
      {semesterData.map((sem, index) => (
        <Card
          key={index}
          sx={{
            background: "rgba(0, 0, 0, 0.4)", 
            padding: "20px",
            cursor: "pointer",
            textAlign: "center",
            position: "relative",
            "&:hover": { background: "rgba(0, 0, 0, 0.7)" },
            borderRadius: "20px",
          }}
          onClick={() => {
            navigate(`/${username}/${index + 1}`);
          }}
        >
          <CardContent>
            <Typography 
              variant="body2" 
              sx={{ position: "absolute", top: 10, right: 10, color: "#89CFF0", fontWeight: "bold", fontFamily:"Plus Jakarta Sans" }}
            >GPA: {sem.gpa}
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: "10px", color: "#89CFF0", fontWeight: "bold", fontFamily:"Plus Jakarta Sans" }}>{sem.semester}</Typography>
            <RadarChart
              cx="50%" 
              cy="50%"
              outerRadius={65}
              width={250}
              height={200}
              data={sem.subjects}
            >
              <PolarGrid />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "#E0E0E0", fontSize: 10 }}
                tickLine={false}
              />
              <Radar
                dataKey="score"
                stroke="#FF4EC7"
                fill="#FF4EC7"
                fillOpacity={0.6}
              />
            </RadarChart>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Cards;
