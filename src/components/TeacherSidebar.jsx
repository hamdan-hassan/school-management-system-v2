import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo1 from "../assets/img/logo1.png";
import icon1 from "../assets/img/sidebar/icon-1.png";
import axios from "axios";
import icon3 from "../assets/img/sidebar/icon-3.png";
import icon7 from "../assets/img/sidebar/icon-7.png";
import { baseUrl } from "../api/api-url";
import icon18 from "../assets/img/sidebar/icon-18.png";
import ChangePasswordModal from "./ChangePasswordModal";
import adminIcon from "../assets/img/admin.png";
import { useAuth } from "../context/AuthContext";
import icon21 from "../assets/img/sidebar/icon-21.png";

import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

const TeacherSidebar = ({ PageComponent }) => {
  const navigate = useNavigate();
  const [showTeachers, setShowTeachers] = useState(false);
  const [showStudents, setShowStudents] = useState(false);
  const [teacherName, setTeacherName] = useState("");
  const [showAcademicYear, setShowAcademicYear] = useState(false);
  const [showClass, setShowClass] = useState(false);
  const [slideNav, setSlideNav] = useState(false);
  const { logout } = useAuth();
  const toggleSubMenu = (subMenuState, setSubMenuState) => {
    setSubMenuState(!subMenuState);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const Class = sessionStorage.getItem("teacherClass");
    axios
      .post(
        `${baseUrl.baseUrl}/get-teacher-name`,
        {
          Class: Class,
        },
        {
          headers: {
            // authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setTeacherName(`${res.data[0].first_name} ${res.data[0].last_name}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`main-wrapper ${slideNav ? "slide-nav" : ""}`}>
      <div className="header-outer">
        <div className="header">
          <a
            id="mobile_btn"
            className="mobile_btn float-left"
            onClick={() => setSlideNav(!slideNav)}
          >
            <i className="fas fa-bars" aria-hidden="true"></i>
          </a>
          <a id="toggle_btn" className="float-left" href="javascript:void(0);">
            <img src={icon21} alt="" />
          </a>

          <ul className="nav float-left">
            <li>
              <div className="top-nav-search">
                <a href="javascript:void(0);" className="responsive-search">
                  <i className="fa fa-search"></i>
                </a>
                <form action="search.html">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search here"
                  />
                  <button className="btn" type="submit">
                    <i className="fa fa-search"></i>
                  </button>
                </form>
              </div>
            </li>
            <li>
              <a
                href="index.html"
                className="mobile-logo d-md-block d-lg-none d-block"
              >
                <img src={logo1} alt="" width="30" height="30" />
              </a>
            </li>
          </ul>

          <ul className="nav user-menu float-right">
            <li className="nav-item dropdown has-arrow">
              <a href="#" className="nav-link user-link" data-toggle="dropdown">
                <span className="user-img">
                  <img
                    className="rounded-circle"
                    src={adminIcon}
                    width="30"
                    alt="Admin"
                  />
                  <span className="status online"></span>
                </span>
                <span className="ml-2">{teacherName}</span>
              </a>
              <div className="dropdown-menu">
                <p
                  className="dropdown-item"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={handleModalOpen}
                >
                  Change Password
                </p>

                <a
                  className="dropdown-item"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div
        className="sidebar"
        id="sidebar"
        style={{
          overflowY: "auto",
        }}
      >
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <div className="header-left">
              <a href="/teacher-dashboard" className="logo">
                <p
                  style={{
                    fontSize: 13,
                  }}
                >
                  HOPE OF GLORY JAZ INT SCHOOL
                </p>
              </a>
            </div>
            <ul className="sidebar-ul">
              <li className="menu-title">Menu</li>
              <li className="active">
                <Link to="/teacher-dashboard">
                  <img src={icon1} alt="icon" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li
                className="submenu"
                onClick={() =>
                  toggleSubMenu(showAcademicYear, setShowAcademicYear)
                }
              >
                <a href="#">
                  <img src={icon18} alt="icon" /> <span>Teacher</span>
                  <span className="menu-arrow"></span>
                </a>
                <ul
                  className="list-unstyled"
                  style={{ display: showAcademicYear ? "block" : "none" }}
                >
                  <li>
                    <Link to="/take-teacher-attendence">
                      <span>Take Attendence</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/view-teacher-attendence">
                      <span>View Attendence</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                className="submenu"
                onClick={() => toggleSubMenu(showStudents, setShowStudents)}
              >
                <a href="#">
                  <img src={icon3} alt="icon" /> <span> Students</span>
                  <span className="menu-arrow"></span>
                </a>
                <ul
                  className="list-unstyled"
                  style={{ display: showStudents ? "block" : "none" }}
                >
                  <li>
                    <Link to="/teacher-all-students">
                      <span>All Students</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/take-students-attendance">
                      <span>Take Attendence</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/view-students-attendence">
                      <span>View Attendence</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/promote-students">
                      <span>Promote Students</span>
                    </Link>
                  </li>
                </ul>
              </li>

              <li
                className="submenu"
                onClick={() => toggleSubMenu(showTeachers, setShowTeachers)}
              >
                <a href="#">
                  <img src={icon7} alt="icon" /> <span>Exams</span>
                  <span className="menu-arrow"></span>
                </a>
                <ul
                  className="list-unstyled"
                  style={{ display: showTeachers ? "block" : "none" }}
                >
                  <li>
                    <Link to="/add-marks">
                      <span>Add Exam Marks</span>
                    </Link>
                  </li>
                  <Link to="/view-marks">
                    <span>View Exam Marks</span>
                  </Link>
                </ul>
              </li>

              {/* <li
                className="submenu"
                onClick={() => toggleSubMenu(showParents, setShowParents)}
              >
                <a href="#">
                  <img src={icon4} alt="icon" /> <span> Parents</span>
                  <span className="menu-arrow"></span>
                </a>
                <ul
                  className="list-unstyled"
                  style={{ display: showParents ? "block" : "none" }}
                >
                  <li>
                    <Link to="/all-parents">
                      <span>All Parents</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/add-parents">
                      <span>Add Parent</span>
                    </Link>
                  </li>
                </ul>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
      <ChangePasswordModal
        isOpen={isModalOpen}
        handleClose={handleModalClose}
      />
      <div class="page-wrapper">
        {/* {component here} */}
        {PageComponent}
      </div>
    </div>
  );
};

export default TeacherSidebar;
