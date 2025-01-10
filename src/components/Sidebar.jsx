import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo1 from "../assets/img/logo1.png";
import icon1 from "../assets/img/sidebar/icon-1.png";
import icon2 from "../assets/img/sidebar/icon-2.png";
import icon3 from "../assets/img/sidebar/icon-3.png";
import icon7 from "../assets/img/sidebar/icon-7.png";

import icon10 from "../assets/img/sidebar/icon-10.png";
import icon18 from "../assets/img/sidebar/icon-18.png";

import adminIcon from "../assets/img/admin.png";
import ChangePasswordModal from "./ChangePasswordModal";
import icon21 from "../assets/img/sidebar/icon-21.png";

import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

import { useAuth } from "../context/AuthContext";
const Sidebar = ({ PageComponent }) => {
  const [showTeachers, setShowTeachers] = useState(false);
  const [showStudents, setShowStudents] = useState(false);
  const [showParents, setShowParents] = useState(false);
  const [showSubjects, setShowSubjects] = useState(false);
  const [showAccounts, setShowAccounts] = useState(false);
  const [showAcademicYear, setShowAcademicYear] = useState(false);
  const [showClass, setShowClass] = useState(false);
  const [slideNav, setSlideNav] = useState(false);
  const { logout } = useAuth();
  const toggleSubMenu = (subMenuState, setSubMenuState) => {
    setSubMenuState(!subMenuState);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

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
                {/* <form action="search.html">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search here"
                  />
                  <button className="btn" type="submit">
                    <i className="fa fa-search"></i>
                  </button>
                </form> */}
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
                <span className="ml-2">Admin</span>
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
                  onClick={() => logout()}
                >
                  Logout
                </a>
              </div>
            </li>
          </ul>
          {/* <div className="dropdown mobile-user-menu float-right">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-ellipsis-v"></i>
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <a className="dropdown-item" href="profile.html">
                My Profile
              </a>
              <a className="dropdown-item" href="edit-profile.html">
                Edit Profile
              </a>
              <a className="dropdown-item" href="settings.html">
                Settings
              </a>
              <a className="dropdown-item" href="login.html">
                Logout
              </a>
            </div>
          </div> */}
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
              <a href="/dashboard" className="logo">
                {/* <img src={logo1} width="40" height="40" alt="" /> */}
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
                <Link to="/dashboard">
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
                  <img src={icon18} alt="icon" /> <span>Academic Year</span>
                  <span className="menu-arrow"></span>
                </a>
                <ul
                  className="list-unstyled"
                  style={{ display: showAcademicYear ? "block" : "none" }}
                >
                  <li>
                    <Link to="/manage-academic-year">
                      <span>Add/Set Academic Year</span>
                    </Link>
                  </li>
                </ul>
              </li>

              <li
                className="submenu"
                onClick={() => toggleSubMenu(showClass, setShowClass)}
              >
                <a href="#">
                  <img src={icon2} alt="icon" /> <span>Classes</span>
                  <span className="menu-arrow"></span>
                </a>
                <ul
                  className="list-unstyled"
                  style={{ display: showClass ? "block" : "none" }}
                >
                  <li>
                    <Link to="/add-class">
                      <span>Add Class</span>
                    </Link>
                  </li>
                  <Link to="/manage-class">
                    <span>Manage Class</span>
                  </Link>
                </ul>
              </li>

              <li
                className="submenu"
                onClick={() => toggleSubMenu(showTeachers, setShowTeachers)}
              >
                <a href="#">
                  <img src={icon2} alt="icon" /> <span> Teachers</span>
                  <span className="menu-arrow"></span>
                </a>
                <ul
                  className="list-unstyled"
                  style={{ display: showTeachers ? "block" : "none" }}
                >
                  <li>
                    <Link to="/all-teachers">
                      <span>All Teachers</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/add-teachers">
                      <span>Add Teacher</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/view-all-teachers-attendence">
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
                    <Link to="/all-students">
                      <span>All Students</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/add-students">
                      <span>Add Student</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/view-all-students-attendence">
                      <span>View Attendence</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/all-inactive-students">
                      <span>In-Active Students</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="/all-alumni">
                      <span>Alumni</span>
                    </Link>
                  </li>
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

              <li
                className="submenu"
                onClick={() => toggleSubMenu(showSubjects, setShowSubjects)}
              >
                <a href="#">
                  <img src={icon7} alt="icon" /> <span>Subjects</span>
                  <span className="menu-arrow"></span>
                </a>
                <ul
                  className="list-unstyled"
                  style={{ display: showSubjects ? "block" : "none" }}
                >
                  <li>
                    <Link to="/add-subjects">
                      <span>Add Subjects</span>
                    </Link>
                  </li>
                  <Link to="/manage-subjects">
                    <span>Manage Subjects</span>
                  </Link>
                </ul>
              </li>
              <li
                className="submenu"
                onClick={() => toggleSubMenu(showAccounts, setShowAccounts)}
              >
                <a href="#">
                  <img src={icon10} alt="icon" />
                  <span> Accounts </span> <span className="menu-arrow"></span>
                </a>
                <ul
                  className="list-unstyled"
                  style={{ display: showAccounts ? "block" : "none" }}
                >
                  <li>
                    <Link to="/add-fee-payment">
                      <span>Add Fee Payment</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/fee-collections">
                      <span>Fee Collections</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/add-expense-type">
                      <span>Add Expense Type</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/add-expense">
                      <span>Add Expenses</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/expenses">
                      <span>Expenses</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="/budget">
                      <span>Budget</span>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ChangePasswordModal
        isOpen={isModalOpen}
        handleClose={handleModalClose}
      />
      <div className="page-wrapper">
        {/* {component here} */}
        {PageComponent}
      </div>
    </div>
  );
};

export default Sidebar;
