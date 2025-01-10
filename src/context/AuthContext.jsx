// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    const role = sessionStorage.getItem("role");
    // const refreshToken =sessionStorage.getItem("refreshToken");

    if (email) {
      // You can check if tokens are still valid here
      // If they are valid, you can set authentication to true
      setAuth(true);
    }
  }, []);

  const login = () => {
    setAuth(true);

    // Authentication successful
  };

  const logout = () => {
    // Remove the tokens fromsessionStorage and reset authentication

    sessionStorage.removeItem("email");
    sessionStorage.removeItem("role");
    setUser(null);
    setAuth(false);
  };

  const isAuth = () => {
    // Check for the presence of both tokens insessionStorage
    // return auth;
    return (
      !!sessionStorage.getItem("email") &&
      sessionStorage.getItem("role") === "admin"
    );
  };

  const isAuthTeacher = () => {
    // Check for the presence of both tokens insessionStorage
    // return auth;
    return (
      !!sessionStorage.getItem("email") &&
      sessionStorage.getItem("role") === "teacher"
    );
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuth, isAuthTeacher, auth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
