import React from "react";
import { Navigate } from "react-router-dom";  // Remove Route import
import { useLocation } from "react-router-dom"; // For capturing the current location

const ProtectedRoute = ({ element, adminOnly, ...rest }) => {
  const user = JSON.parse(localStorage.getItem("user")); // Get user object from localStorage
  const location = useLocation(); // Capture current location

  console.log("User in ProtectedRoute:", user); // Debugging log

  const isAuthenticated = user && user.token;
  const isAdmin = user && user.role === "admin"; // Ensure role is checked

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (adminOnly && !isAdmin) {
    // Redirect to a different page if not an admin
    return <Navigate to="/dashboard" />;
  }

  // If everything is valid, render the protected route's element
  return element;
};

export default ProtectedRoute;
