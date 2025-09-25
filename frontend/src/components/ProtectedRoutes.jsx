import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils";

const ProtectedRoutes = ({ children }) => {
  if (!isAuthenticated()) {
    // User is not authenticated, redirect to login
    alert("Please login");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoutes;
