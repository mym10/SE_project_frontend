import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  Tooltip, LineChart, Line, CartesianGrid, XAxis, YAxis, Legend
} from 'recharts';
import Navbar from '../components/Navbar';
import '../css/subject.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

export default function Subject() {
  const { username, semNumber, subjectCode } = useParams();
  console.log("Params:", username, semNumber, subjectCode);

  const [assessmentData, setAssessmentData] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeAssessment, setActiveAssessment] = useState('Overall');
  const [distributionData, setDistributionData] = useState({});
  const [professorName, setProfessorName] = useState('');
  const [professorID, setProfessorID] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const subjectData = await axios.get(`http://localhost:5000/${username}/${semNumber}/${subjectCode}`);
        console.log("Response from backend:", subjectData.data);
        setAssessmentData(subjectData.data.marks);
        setStudentName(subjectData.data.name);

        // Use the class distribution data directly from backend
        setDistributionData(subjectData.data.classDistribution);
      } catch (err) {
        console.error("Failed to fetch subject data", err);
        setError("Failed to load subject data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [username, semNumber, subjectCode]);

  useEffect(() => {
    const fetchProfessor = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/professors/${subjectCode}`);
        setProfessorName(response.data.Name); 
        setProfessorID(response.data.professorID);
      } catch (err) {
        console.error("Failed to fetch professor", err);
        setProfessorName("Unknown");
        setProfessorID("");
      }
    };
    fetchProfessor();
  }, [subjectCode]);


  const pieData = assessmentData.map(item => ({
    name: item.name,
    value: item.marks,
  }));

  const calculatePercentile = (marks) => {
    return ((marks / 100) * 100).toFixed(2);
  };

  const formatPercentage = (marks, total, contribution) => {
    const percentageOfTotal = ((marks / total) * contribution).toFixed(2);
    return `${percentageOfTotal}/${contribution}`;
  };

  if (loading) return <div className="subject-container"><Navbar /><p>Loading...</p></div>;
  if (error) return <div className="subject-container"><Navbar /><p>{error}</p></div>;

  return (
    <div className="subject-container">
      <Navbar />
      <div className="subject-header">
        <h2>{subjectCode}</h2>
        <div className="course-info">
        <h4>
          Professor:{" "}
          <Link to={`/${username}/${semNumber}/${subjectCode}/${professorID}`}>
            {professorName}
          </Link>
        </h4>
        </div>
      </div>

      <div className="charts-section">
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
                    backgroundColor: 'white',
                    border: '1px solid #FF2AA8',
                    color: '#FF2AA8',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    padding: '10px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Marks Table */}
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
                {assessmentData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.marks}/{item.total}</td>
                    <td>{formatPercentage(item.marks, item.total, item.contribution)}</td>
                    <td>{calculatePercentile(item.marks)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="charts-section" style={{ width: '100%', overflow: 'hidden' }}>
        <div className="assessment-buttons">
          {['Overall', ...assessmentData.map(a => a.name)].map((name) => (
            <button
              key={name}
              onClick={() => setActiveAssessment(name)}
              className={activeAssessment === name ? "active" : ""}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="inner-box" style={{ width: '95%', margin: '0 auto', padding: '10px' }}>
          <h3 className="distribution-title">Marks Distribution</h3>
          <div className="linechart-wrapper" style={{ width: '100%', overflow: 'visible' }}>
            <div className="linechart-inner-box" style={{ width: '100%', height: '400px', minWidth: '0' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={distributionData[activeAssessment] || []}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="marks" 
                    angle={-45} 
                    textAnchor="end"
                    height={70}
                  />
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