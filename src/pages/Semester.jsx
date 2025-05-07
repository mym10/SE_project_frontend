import React, { useEffect, useState } from 'react';
import axios from "axios";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';
import Navbar from '../components/Navbar';
import { useParams, useNavigate } from "react-router-dom";
import '../css/semester.css';

const calculateGrade = (total) => {
  if (total >= 90) return 'A+';
  if (total >= 80) return 'A';
  if (total >= 70) return 'B+';
  if (total >= 60) return 'B';
  if (total >= 50) return 'C';
  return 'F';
};

const getStatus = (grade) => grade === 'F' ? 'Fail' : 'Pass';

const calculateGradePoint = (total) => {
  if (total >= 90) return 10;
  if (total >= 80) return 9;
  if (total >= 70) return 8;
  if (total >= 60) return 7;
  if (total >= 50) return 6;
  if (total >= 40) return 5;
  return 0;
};

const computeGPA = (courses) => {
  let totalWeighted = 0;
  let totalCredits = 0;

  courses.forEach((course) => {
    const total = (
      course.Minor1 * course["Minor1_Weightage (%)"] +
      course.Minor2 * course["Minor2_Weightage (%)"] +
      course.EndSem * course["EndSem_Weightage (%)"]
    ) / 100;

    const gradePoint = calculateGradePoint(total);
    const credit = course.credit || 3;

    totalWeighted += gradePoint * credit;
    totalCredits += credit;
  });

  return totalCredits ? totalWeighted / totalCredits : 0;
};

const Semester = () => {
  const { username, semNumber } = useParams();
  const navigate = useNavigate();
  const [semesterData, setSemesterData] = useState({});
  const [studentGPA, setStudentGPA] = useState(6.67);
  const [gpaDistribution, setGpaDistribution] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/${username}/${semNumber}`)
      .then((res) => {
        setSemesterData(res.data);

        const courses = Object.values(res.data)[0];
        if (courses && courses.length > 0) {
          const gpa = computeGPA(courses);
          setStudentGPA(gpa);
        }
      })
      .catch((err) => console.error(err));

    axios.get(`http://localhost:5000/gpa-distribution/${semNumber}`)
      .then((res) => {
        setGpaDistribution(res.data);
      })
      .catch((err) => console.error(err));
  }, [username, semNumber]);

  return (
    <div className="semester-container">
      <Navbar />
      <h1><u>{username}'s Semester Data</u></h1>

      {Object.entries(semesterData).map(([semName, courses], index) => {
        const radarData = courses.map((course, i) => {
          const total = (
            course.Minor1 * course["Minor1_Weightage (%)"] +
            course.Minor2 * course["Minor2_Weightage (%)"] +
            course.EndSem * course["EndSem_Weightage (%)"]
          ) / 100;
          return {
            SNo: i + 1,
            courseCode: course.courseCode,
            courseName: course.courseCode,
            totalMarks: Math.round(total),
            credit: course.credit || 3,
            grade: calculateGrade(total),
            percentage: total,
            passFail: getStatus(calculateGrade(total))
          };
        });

        return (
          <div key={index}>
            <h2>{semName}</h2>

            <h4>Radar Chart</h4>
            <div style={{ width: '80%', height: '400px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="courseName" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar dataKey="totalMarks" stroke="#00FFFF" fill="#00FFFF" fillOpacity={0.6} />
                  <Tooltip formatter={(value) => [`${value} Marks`, 'Score']} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <h4>Subject GPA Table</h4>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Course Code</th>
                    <th>Course Name</th>
                    <th>Total Marks</th>
                    <th>Credit Point</th>
                    <th>Grade</th>
                    <th>Percentage</th>
                    <th>Pass/Fail</th>
                  </tr>
                </thead>
                <tbody>
                  {radarData.map((item, i) => (
                    <tr key={i}>
                      <td>{item.SNo}</td>
                      <td><a href={`/${username}/${semNumber}/${item.courseCode}`} className="course-link">{item.courseCode}</a></td>
                      <td>{item.courseName}</td>
                      <td>{item.totalMarks}</td>
                      <td>{item.credit}</td>
                      <td>{item.grade}</td>
                      <td>{item.percentage.toFixed(2)}%</td>
                      <td className={item.passFail === 'Pass' ? 'pass' : 'fail'}>{item.passFail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      <h4>GPA Distribution</h4>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={gpaDistribution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Line type="monotone" dataKey="students" stroke="#00FFFF" activeDot={{ r: 6 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="students"
              stroke="transparent"
              dot={(props) => {
                const { cx, cy, payload } = props;
                const [low, high] = payload.range.split('-').map(parseFloat);
                if (low <= studentGPA && studentGPA <= high) {
                  return <circle cx={cx} cy={cy} r={8} fill="red" />;
                }
                return null;
              }}
            />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Semester;