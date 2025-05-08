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
  const [failingSubjects, setFailingSubjects] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/${username}/studentProfile`);
        const data = res.data;

        const profile = {
          fullName: data.Name,
          studentID: data.Username,
          email: `${data.Username.toLowerCase()}@mahindrauniversity.edu.in`,
          branch: data.Branch,
          year: "3",
          currentGPA: "Loading...",
          enrolledCourses: data["Enrolled Courses"].map((code) => ({
            id: code,
            name: code,
          })),
        };

        setProfileData(profile);

        const gpaRes = await axios.get(`http://localhost:5000/${username}/gpa`);
        setProfileData((prev) => ({ ...prev, currentGPA: gpaRes.data.gpa }));

        const failingSubjectsPromises = profile.enrolledCourses.map(async (course) => {
          try {
            const matchRes = await axios.get(
              `http://localhost:5000/match-peers/${course.id}?studentID=${profile.studentID}`
            );
            return {
              course: course.id,
              matches: matchRes.data.matches,
            };
          } catch (err) {
            return null;
          }
        });

        const failingSubjectsResults = await Promise.all(failingSubjectsPromises);
        setFailingSubjects(failingSubjectsResults.filter((result) => result && result.matches.length > 0));
      } catch (err) {
        console.error("Failed to fetch student profile or GPA:", err);
      }
    };

    fetchProfile();
  }, [username]);

  if (!profileData) return <div className="sprofile-container">Loading...</div>;

  const coursesBySemester = {};
  profileData.enrolledCourses.forEach((course) => {
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

      {/* Enrolled Courses Table */}
      <div className="bigger-container">
        <Typography variant="h5" gutterBottom fontFamily={"Plus Jakarta Sans"} textAlign="center">
          Enrolled Courses
        </Typography>

        {profileData.enrolledCourses.length === 0 ? (
          <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold", color: "white" }} textAlign="center">
            No Courses Enrolled
          </Typography>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  {Object.keys(coursesBySemester).map((sem, index) => (
                    <th key={index}>{sem}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {Object.values(coursesBySemester).map((courseList, index) => (
                    <td key={index}>
                      {courseList.map((code, i) => (
                        <div key={i}>{code}</div>
                      ))}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Failing Subjects and Mentors Table */}
      <div className="bigger-container">
        <Typography variant="h5" gutterBottom fontFamily={"Plus Jakarta Sans"} textAlign="center">
          Failing Subjects and Mentors
        </Typography>

        {failingSubjects.length === 0 ? (
          <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold", color: "white" }} textAlign="center">
            No failing subjects found.
          </Typography>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Course ID</th>
                  <th>Mentor Name</th>
                  <th>Mentor ID</th>
                  <th>Mentor Email</th>
                  <th>Mentor Score</th>
                </tr>
              </thead>
              <tbody>
                {failingSubjects.flatMap((subject) =>
                  subject.matches.map((match, i) => (
                    <tr key={`${subject.course}-${i}`}>
                      <td>{subject.course}</td>
                      <td>{match.mentor.name}</td>
                      <td>{match.mentor.id}</td>
                      <td>{`${match.mentor.id}@mahindrauniversity.edu.in`}</td>
                      <td>{match.mentor.finalScore}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;