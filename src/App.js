import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentPage from "./pages/StudentPage";
import Semester from './pages/Semester';
import SubjectPage from './pages/SubjectPage';
import ForumPage from './pages/ForumPage';
import ProfPage from './pages/ProfPage';
import StudentProfile from './pages/StudentProfile';
import Navbar from "./components/Navbar"; // Import Navbar
import Profdashboard from './pages/Profdashboard';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Router>
      <Navbar /> {/* Add Navbar here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
        <Route path="/signup" element={<Signup setIsLogin={setIsLogin} />} />
        <Route path="/:username" element={<StudentPage />} />
        <Route path="/professor/:username" element={<Profdashboard />} />
        <Route path="/:username/:semNumber" element={<Semester />} />
        <Route path="/:username/:semNumber/:subjectCode" element={<SubjectPage />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/:username/:semNumber/:subjectCode/:professorID" element={<ProfPage />} />
        <Route path="/:username/studentProfile" element={<StudentProfile />} /> 
        <Route path="/:professorID/professorProfile" element={<Profdashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
