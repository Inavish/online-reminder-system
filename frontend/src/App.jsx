import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import React from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </Router>
  );
}
