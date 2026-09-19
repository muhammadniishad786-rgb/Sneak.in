import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  console.log("AdminRoute token:", token);
  console.log("AdminRoute role:", role);

  // User is not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // User is logged in but is not an admin
  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // User is an admin
  return <Outlet />;
}

export default AdminRoute;

