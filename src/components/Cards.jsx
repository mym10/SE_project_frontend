import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";
import { useNavigate } from "react-router-dom"; 

const Cards = ({ semesterData }) => {
  const navigate = useNavigate(); 

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "15px" }}>
      {semesterData.map((sem, index) => (
        <Card
          key={index}
          sx={{
            background: "#222", 
            padding: "20px",
            cursor: "pointer",
            textAlign: "center",
            position: "relative",
            "&:hover": { background: "#444" },
          }}
          onClick={() => navigate(`/${sem.semester}`)} 
        >
          <CardContent>
            {/* GPA in the Top Right Corner */}
            <Typography 
              variant="body2" 
              sx={{ position: "absolute", top: 10, right: 10, color: "#89CFF0", fontWeight: "bold" }}
            >
              GPA: {sem.gpa}
            </Typography>
            
            <Typography variant="h6" sx={{ marginBottom: "10px", color: "#00E0FF", fontWeight: "bold" }}>{sem.semester}</Typography>

            <RadarChart width={180} height={180} data={sem.subjects}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "#E0E0E0", fontSize: 11 }} />
              <Radar dataKey="score" stroke="#4FC3F7" fill="#20C997" fillOpacity={0.6} />
        </RadarChart>


          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Cards;
