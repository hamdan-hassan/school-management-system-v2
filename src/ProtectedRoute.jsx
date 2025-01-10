import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = () => {
  const { isAuth } = useAuth();

  // Check if the token exists in localStorage

  // If authorized (token exists and isAuth is true), return an outlet that will render child elements
  // If not, return an element that will navigate to the login page
  return isAuth() ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
