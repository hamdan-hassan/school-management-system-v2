import React, { useState, useEffect } from "react";
import dash1 from "../assets/img/dash/dash-1.png";
import dash2 from "../assets/img/dash/dash-2.png";
import dash3 from "../assets/img/dash/dash-3.png";
import dash4 from "../assets/img/dash/dash-4.png";
import GenderChart from "../components/GenderChart";
import axios from "axios";
import { baseUrl } from "../api/api-url";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const totalMales = 75; // Total number of male students
  const totalFemales = 45; // Total number of female students
  const [currentAcademicYear, setCurrentAcademicYear] = useState("");
  const [currentTerm, setCurrentTerm] = useState("");
  const [totalStudents, setTotalStudents] = useState("");
  const [totalTeachers, setTotalTeachers] = useState("");
  const [totalBudget, setTotalBudget] = useState("");
  const [totalExpense, setTotalExpense] = useState("");
  const [totalFees, setTotalFees] = useState("");
  const [studentAttendance, setStudentAttendance] = useState("");
  const [teacherAttendance, setTeacherAttendance] = useState("");

  useEffect(() => {
    let date = new Date();
    let day = String(date.getDate()).padStart(2, "0");
    let month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
    let year = date.getFullYear();

    let currentDate = `${year}-${month}-${day}`;

    axios
      .post(
        `${baseUrl.baseUrl}/get-today-student-attendance-count`,

        {
          CurrentDate: currentDate,
        },

        {
          headers: {
            // authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setStudentAttendance(res.data[0].count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let date = new Date();
    let day = String(date.getDate()).padStart(2, "0");
    let month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
    let year = date.getFullYear();

    let currentDate = `${year}-${month}-${day}`;

    axios
      .post(
        `${baseUrl.baseUrl}/get-today-teacher-attendance-count`,

        {
          CurrentDate: currentDate,
        },

        {
          headers: {
            // authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setTeacherAttendance(res.data[0].count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let date = new Date();
    let day = String(date.getDate()).padStart(2, "0");
    let month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
    let year = date.getFullYear();

    let currentDate = `${year}-${month}-${day}`;
    console.log(currentDate);
    axios
      .get(`${baseUrl.baseUrl}/get-current-academic-year`, {
        headers: {
          // authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setCurrentAcademicYear(res.data[0].academic_year);
        setCurrentTerm(res.data[0].term);

        sessionStorage.setItem("academic year", res.data[0].academic_year);
        sessionStorage.setItem("term", res.data[0].term);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${baseUrl.baseUrl}/count-active-students`, {
        headers: {
          // authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setTotalStudents(res.data.active_students_count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${baseUrl.baseUrl}/count-active-teachers`, {
        headers: {
          // authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setTotalTeachers(res.data.active_teachers_count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${baseUrl.baseUrl}/get-budget-amount`, {
        headers: {
          // authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setTotalBudget(res.data.amount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${baseUrl.baseUrl}/get-total-expenses`, {
        headers: {
          // authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setTotalExpense(res.data.totalExpenses);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${baseUrl.baseUrl}/get-total-fees`, {
        headers: {
          // authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setTotalFees(res.data.sum);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="content container-fluid">
      <div className="page-header">
        <div className="row">
          <div className="col-md-6">
            <h3 className="page-title mb-0">Dashboard</h3>
          </div>
          <div className="col-md-6">
            <ul className="breadcrumb mb-0 p-0 float-right">
              <li className="breadcrumb-item">
                <a href="/dashboard">
                  <i className="fas fa-home"></i> Home
                </a>
              </li>
              <li className="breadcrumb-item">
                <span>Dashboard</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row m-4">
        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
          <h3>Current Academic Year: {currentAcademicYear}</h3>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
          <h3>Current Term: {currentTerm}</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
          <Link to="/view-all-students-attendence">
            <div className="dash-widget dash-widget5">
              <div className="dash-widget-info d-inline-block text-left">
                <span>Student Attendence</span>
                <h3>{studentAttendance}</h3>
              </div>
              <span className="float-right">
                <img src={dash4} alt="" width="80" />
              </span>
            </div>
          </Link>
        </div>

        <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
          <Link to="/view-all-teachers-attendence">
            <div className="dash-widget dash-widget5">
              <div className="dash-widget-info d-inline-block text-left">
                <span>Teacher Attendence</span>
                <h3>{teacherAttendance}</h3>
              </div>

              <span className="float-right">
                <img src={dash4} alt="" width="80" />
              </span>
            </div>
          </Link>
        </div>
        <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
          <div className="dash-widget dash-widget5">
            <span className="float-left">
              <img src={dash1} alt="" width="80" />
            </span>
            <div className="dash-widget-info text-right">
              <span>Total Students</span>
              <h3>{totalStudents}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
          <div className="dash-widget dash-widget5">
            <div className="dash-widget-info text-left d-inline-block">
              <span>Total Teachers</span>
              <h3>{totalTeachers}</h3>
            </div>
            <span className="float-right">
              <img src={dash2} width="80" alt="" />
            </span>
          </div>
        </div>
        {/* <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
          <div class="dash-widget dash-widget5">
            <span class="float-left">
              <img src={dash3} alt="" width="80" />
            </span>
            <div class="dash-widget-info text-right">
              <span>Parents</span>
              <h3>1000</h3>
            </div>
          </div>
        </div> */}

        <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
          <div className="dash-widget dash-widget5">
            <div className="dash-widget-info d-inline-block text-left">
              <span>Total Budget</span>
              <h3>₵{totalBudget}</h3>
            </div>
            <span className="float-right">
              <img src={dash4} alt="" width="80" />
            </span>
          </div>
        </div>

        <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
          <div className="dash-widget dash-widget5">
            <div className="dash-widget-info d-inline-block text-left">
              <span>Total Expense</span>
              <h3>₵{totalExpense}</h3>
            </div>
            <span className="float-right">
              <img src={dash4} alt="" width="80" />
            </span>
          </div>
        </div>

        <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
          <div className="dash-widget dash-widget5">
            <div className="dash-widget-info d-inline-block text-left">
              <span>Total Fees</span>
              <h3>₵{totalFees}</h3>
            </div>
            <span className="float-right">
              <img src={dash4} alt="" width="80" />
            </span>
          </div>
        </div>

        {/* <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
          <div class="dash-widget dash-widget5">
            <div class="dash-widget-info d-inline-block text-left">
              <span>Paid Fees</span>
              <h3>100</h3>
            </div>
            <span class="float-right">
              <img src={dash4} alt="" width="80" />
            </span>
          </div>
        </div> */}

        {/* <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
          <div class="dash-widget dash-widget5">
            <div class="dash-widget-info d-inline-block text-left">
              <span>UnPaid Fees</span>
              <h3>100</h3>
            </div>
            <span class="float-right">
              <img src={dash4} alt="" width="80" />
            </span>
          </div>
        </div> */}
      </div>

      {/* <div className="row">
        <div className="col-lg-6 d-flex">
          <div className="card flex-fill">
            <div className="row align-items-center">
              <div className="col-auto">
                <div className="page-title">
                  Gender Distribution of Students
                </div>
              </div>
            </div>

            <GenderChart totalMales={totalMales} totalFemales={totalFemales} />
          </div>
        </div>

        <div className="col-lg-6 d-flex">
          <div className="card flex-fill">
            <div className="row align-items-center">
              <div className="col-auto">
                <div className="page-title">
                  Gender Distribution of Teachers
                </div>
              </div>
            </div>

            <GenderChart totalMales={totalMales} totalFemales={totalFemales} />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
