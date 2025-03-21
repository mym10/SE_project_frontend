import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentPage from "./pages/StudentPage";
import Semester from './pages/Semester';
//app.js is the parent of everything. all are connected through app.js.
//everytime you create a page, it HAS to come here in app.js.


function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
        <Route path="/signup" element={<Signup setIsLogin={setIsLogin} />} />
        <Route path="/:username" element={<StudentPage />} />
        <Route path="/semester" element={<Semester />} />
      </Routes>
    </Router>
  );
}

export default App;
