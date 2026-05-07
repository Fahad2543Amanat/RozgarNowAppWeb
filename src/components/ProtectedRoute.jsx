/* eslint-disable no-unused-vars */
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {

  // localStorage se user check
  const user = localStorage.getItem("user");

  // agar login nahi ha
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // agar login ha
  return <Outlet />;
};

export default ProtectedRoute;