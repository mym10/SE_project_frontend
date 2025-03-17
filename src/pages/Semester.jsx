import React, { PureComponent } from 'react';
import { 
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Legend 
} from 'recharts';
import Navbar from '../components/Navbar';
import '../css/semester.css';

const data = [
  { SNo: 1, courseCode: 'MA0101', courseName: 'Mathematics', totalMarks: 80, credit: 3.5, grade: 'A', percentage: 80.00, passFail: 'Pass' },
  { SNo: 2, courseCode: 'CH1010', courseName: 'Chemistry', totalMarks: 70, credit: 3, grade: 'B+', percentage: 70.00, passFail: 'Pass' },
  { SNo: 3, courseCode: 'CS3201', courseName: 'Software Engineering', totalMarks: 75, credit: 4, grade: 'B+', percentage: 75.00, passFail: 'Pass' },
  { SNo: 4, courseCode: 'PH0111', courseName: 'Physics', totalMarks: 20, credit: 3, grade: 'F', percentage: 20.00, passFail: 'Fail' },
  { SNo: 5, courseCode: 'HS0101', courseName: 'French', totalMarks: 45, credit: 1.5, grade: 'C', percentage: 45.00, passFail: 'Pass' },
];

export default class Semester extends PureComponent {
  render() {
    const gpaDistribution = [
      { range: '0.0-1.0', students: 0 },
      { range: '1.1-2.0', students: 0 },
      { range: '2.1-3.0', students: 1 },
      { range: '3.1-4.0', students: 2 },
      { range: '4.1-5.0', students: 4 },
      { range: '5.1-6.0', students: 5 },
      { range: '6.1-7.0', students: 7 },
      { range: '7.1-8.0', students: 10 },
      { range: '8.1-9.0', students: 4 },
      { range: '9.1-10.0', students: 1 },
    ];

    const studentGPA = 6.67;

    return (
      <div className="semester-container">
        <Navbar/>
        <h1><u>Semester 1</u></h1>

        {/* Radar Chart */}
        <h4>Radar Chart</h4>
        <div style={{ width: '80%', height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="courseName" />
              <PolarRadiusAxis domain={[0, 100]} />
              <Radar dataKey="totalMarks" stroke="#00FFFF" fill="#00FFFF" fillOpacity={0.6} />
              
              {/* Custom Tooltip for Radar Chart */}
              <Tooltip
                formatter={(value) => [`${value} Marks`, 'Score']}
                labelFormatter={(value) => `Subject: ${value}`}
                content={({ payload }) => {
                  if (payload && payload.length) {
                    const { courseName, totalMarks } = payload[0].payload;
                    return (
                      <div className="custom-tooltip">
                        <p>{courseName}: {totalMarks} Marks</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Table */}
        <h4>Subject GPA Table</h4>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Total marks</th>
                <th>Credit Point</th>
                <th>Grade</th>
                <th>Percentage</th>
                <th>Pass/Fail</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.SNo}>
                  <td>{item.SNo}</td>
                  <td><a href={`/Semester/${item.courseCode}`} className="course-link">{item.courseCode}</a></td>
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

        {/* GPA Distribution Chart */}
        <h4>GPA Distribution</h4>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={gpaDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Line type="monotone" dataKey="students" stroke="#00FFFF" activeDot={{ r: 6 }} />
              
              {/* Custom Tooltip for GPA Chart */}
              <Tooltip
                formatter={(value) => [`${value} Students`, 'Count']}
                labelFormatter={(value) => `GPA Range: ${value}`}
                content={({ payload }) => {
                  if (payload && payload.length) {
                    const { range, students } = payload[0].payload;
                    return (
                      <div className="custom-tooltip">
                        <p>{`${students} students`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              {/* Highlight Student GPA */}
              <Line
                type="monotone"
                dataKey="students"
                stroke="transparent"
                dot={(props) => {
                  const { cx, cy, payload } = props;
                  const lowerBound = parseFloat(payload.range.split('-')[0]);
                  const upperBound = parseFloat(payload.range.split('-')[1]);

                  if (lowerBound <= studentGPA && studentGPA <= upperBound) {
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
  }
}
