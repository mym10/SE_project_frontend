import React, { useState } from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../css/subject.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const courseDetails = {
  "MA1101": { courseName: "Mathematics", professor: "Dr.Mahipal Jetta" },
  "CS1101": { courseName: "Chemistry", professor: "Dr.Shampa" },
  "CS1103": { courseName: "Software Engineering", professor: "Dr. Vijay Rao" },
  "CS1102": { courseName: "Physics", professor: "Dr.Dibakar" },
  "HS0101": { courseName: "French", professor: "Ms.Kumudham Balasubramanyam" }
};

const assessments = [
  { name: 'Minor 1', marks: 18, total: 20, contribution: 25 },
  { name: 'Quiz 1', marks: 8, total: 10, contribution: 10 },
  { name: 'Lab 1', marks: 19, total: 20, contribution: 15 },
  { name: 'Minor 2', marks: 17, total: 20, contribution: 25 },
  { name: 'Quiz 2', marks: 7, total: 10, contribution: 10 },
  { name: 'Lab 2', marks: 20, total: 20, contribution: 15 },
  { name: 'Endsem', marks: 65, total: 100, contribution: 50 }
];

const distributionData = {
  Overall: [
    { marks: 10, students: 2 }, { marks: 20, students: 5 }, { marks: 30, students: 8 },
    { marks: 40, students: 12 }, { marks: 50, students: 15 }, { marks: 60, students: 10 },
    { marks: 70, students: 5 }, { marks: 80, students: 3 }, { marks: 90, students: 2 }, { marks: 100, students: 1 }
  ],
  "Minor 1": [
    { marks: 10, students: 1 }, { marks: 20, students: 3 }, { marks: 30, students: 5 },
    { marks: 40, students: 7 }, { marks: 50, students: 8 }, { marks: 60, students: 6 },
    { marks: 70, students: 4 }, { marks: 80, students: 2 }, { marks: 90, students: 1 }, { marks: 100, students: 0 }
  ],
  "Quiz 1": [
    { marks: 0, students: 2 }, { marks: 2, students: 4 }, { marks: 4, students: 6 },
    { marks: 6, students: 10 }, { marks: 8, students: 12 }, { marks: 10, students: 8 }
  ],
  "Lab 1": [
    { marks: 10, students: 1 }, { marks: 12, students: 3 }, { marks: 14, students: 5 },
    { marks: 16, students: 7 }, { marks: 18, students: 10 }, { marks: 20, students: 12 }
  ],
  "Minor 2": [
    { marks: 10, students: 2 }, { marks: 20, students: 3 }, { marks: 30, students: 4 },
    { marks: 40, students: 8 }, { marks: 50, students: 12 }, { marks: 60, students: 7 },
    { marks: 70, students: 4 }, { marks: 80, students: 2 }, { marks: 90, students: 1 }, { marks: 100, students: 0 }
  ],
  "Quiz 2": [
    { marks: 0, students: 1 }, { marks: 2, students: 3 }, { marks: 4, students: 5 },
    { marks: 6, students: 9 }, { marks: 8, students: 11 }, { marks: 10, students: 6 }
  ],
  "Lab 2": [
    { marks: 10, students: 0 }, { marks: 12, students: 1 }, { marks: 14, students: 2 },
    { marks: 16, students: 5 }, { marks: 18, students: 8 }, { marks: 20, students: 14 }
  ],
  "Endsem": [
    { marks: 10, students: 2 }, { marks: 20, students: 5 }, { marks: 30, students: 7 },
    { marks: 40, students: 10 }, { marks: 50, students: 12 }, { marks: 60, students: 9 },
    { marks: 70, students: 6 }, { marks: 80, students: 3 }, { marks: 90, students: 2 }, { marks: 100, students: 1 }
  ]
};

const calculatePercentile = (marks, distribution) => {
  const sortedData = [...distribution].sort((a, b) => a.marks - b.marks);
  let count = 0;
  for (let i = 0; i < sortedData.length; i++) {
    if (sortedData[i].marks <= marks) {
      count += sortedData[i].students;
    }
  }
  const totalStudents = sortedData.reduce((sum, item) => sum + item.students, 0);
  const percentile = (count / totalStudents) * 100;
  return percentile.toFixed(2);
};

export default function Subject() {
  const { subjectCode } = useParams();
  console.log("Subject Code:", subjectCode);
  const [activeAssessment, setActiveAssessment] = useState('Overall');

  const courseName = courseDetails[subjectCode]?.courseName || "Unknown Course";
  const professorName = courseDetails[subjectCode]?.professor || "Unknown Professor";

  const formatPercentage = (marks, total, contribution) => {
    const percentageOfTotal = ((marks / total) * contribution).toFixed(2);
    return `${percentageOfTotal}/${contribution}`;
  };

  const updatedAssessments = assessments.map((assessment) => {
    const percentile = calculatePercentile(assessment.marks, distributionData[assessment.name]);
    return { ...assessment, percentile };
  });

  const pieData = updatedAssessments.map(item => ({ name: item.name, value: item.marks }));

  return (
    <div className="subject-container">
      <Navbar />
      <div className="subject-header">
        <h2>{courseName} ({subjectCode})</h2>
        <div className="course-info">
          <h4>Professor: <Link to="/Professor/Prof123" className="prof-link">{professorName}</Link></h4>
        </div>
      </div>

      <div className="charts-section">
        {/* Pie Chart Section */}
          <div className="inner-box">
            <h3 className="distribution-title">Assessment Distribution</h3>
              <div className="piechart-inner-box">
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      innerRadius={0}
                      dataKey="value"
                      label={({ name }) => name}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white', // Adds a white background
                        border: '1px solid #FF2AA8', // Optional: Adds a border with the desired color
                        color: '#FF2AA8', // Text color
                        fontWeight: 'bold', // Makes the text bold
                        borderRadius: '8px', // Optional: Adds rounded corners
                        padding: '10px', // Optional: Adds padding inside the tooltip
                      }}
                      wrapperStyle={{
                        color: '#FF2AA8', // Ensures wrapper text color is also #FF2AA8
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
          </div>

          {/* Marks Table Section */}
          <div className="inner-box">
            <h3 className="details-title">Assessment Details</h3>
            <div className="marks-table">
              <table>
                <thead>
                  <tr>
                    <th>Assessment</th>
                    <th>Marks</th>
                    <th>Percentage</th>
                    <th>Percentile</th>
                  </tr>
                </thead>
                <tbody>
                  {updatedAssessments.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.marks}/{item.total}</td>
                      <td>{formatPercentage(item.marks, item.total, item.contribution)}</td>
                      <td>{item.percentile}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        {/* Assessment Buttons */}
        <div className="assessment-buttons">
          {['Overall', ...updatedAssessments.map(a => a.name)].map((name) => (
            <button
              key={name}
              onClick={() => setActiveAssessment(name)}
              className={activeAssessment === name ? "active" : ""}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Line Chart Section */}
          <div className="inner-box">
            <h3 className="distribution-title">Line Chart</h3>
            <div className="linechart-wrapper">
              <div className="linechart-inner-box">
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart
                    data={distributionData[activeAssessment] || []}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="marks" />
                    <YAxis />
                    <Tooltip
                      content={({ payload }) => {
                        if (payload && payload.length) {
                          return (
                            <div
                              style={{
                                backgroundColor: 'white',
                                border: '1px solid #FF2AA8',
                                borderRadius: '8px',
                                padding: '10px',
                                fontWeight: 'bold',
                                color: '#FF2AA8',
                              }}
                            >
                              <p style={{ margin: 0 }}>students: {payload[0].value}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="students"
                      stroke="#FF2AA8"
                      activeDot={{
                        r: 8,
                        fill: '#FF2AA8',
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}