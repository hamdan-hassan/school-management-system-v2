import React, { useState } from "react";
import logo from "../assets/img/logo.png";
import { baseUrl } from "../api/api-url";
import axios from "axios";
import Loader2 from "../loader/Loader2";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    axios
      .post(
        `${baseUrl.baseUrl}/login`,

        {
          email: email,
          password: password,
        },
      
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (
          response.data.email &&
          response.status === 200 &&
          response.data.role === "admin"
        ) {
          sessionStorage.setItem("email", response.data.email);
          sessionStorage.setItem("role", response.data.role);
          login();

          navigate("/dashboard");
        } else if (
          response.data.email &&
          response.status === 200 &&
          response.data.role === "teacher"
        ) {
          sessionStorage.setItem("email", response.data.email);
          sessionStorage.setItem("role", response.data.role);
          navigate("/teacher-dashboard");
        } else {
          setLoading(false);
          setError("Invalid credentials. Please try again.");
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        // if (error.response.status === 404) {
        setError("Server Error. Please try again.");
        // } else {
        //   setError(error.response.data);
        // }
      });
  };
  return (
    <div className="main-wrapper">
      <div className="account-page">
        <div className="container">
          <h3 className="account-title text-white">Login</h3>
          <div className="account-box">
            <div className="account-wrapper">
              <div className="account-logo">
                <a href="index.html">
                  <img src={logo} alt="SchoolAdmin" />
                </a>
                {/* <h3>Hope of Glory Jaz Int. School</h3> */}
              </div>
              {loading && <Loader2 />}
              <form>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group text-center custom-mt-form-group">
                  <button
                    className="btn btn-primary btn-block account-btn"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                </div>
                {error && (
                  <div class="text-center text-red">
                    <h4>Error</h4>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
