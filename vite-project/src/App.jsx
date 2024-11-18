import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Login.jsx";
import SignUpPage from "./SignUp.jsx";
import ViewerDashboard from "./page/user/DashBoard.jsx";
import OrganizerDashboard from "./page/organiser/DashBoard.jsx";
import AdminDashboard from "./page/Admin/DashBoard.jsx";
const App = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />}/>
        <Route path="/Viewer-dashboard" element={  <ViewerDashboard />}/>
        <Route path="/Organizer-dashboard"element={<OrganizerDashboard />}/>
        <Route path="/Admin-dashboard"element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
