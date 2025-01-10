import React, { useState, useEffect } from "react";
import dash1 from "../assets/img/dash/dash-1.png";
import dash2 from "../assets/img/dash/dash-2.png";
import dash3 from "../assets/img/dash/dash-3.png";
import dash4 from "../assets/img/dash/dash-4.png";
import GenderChart from "../components/GenderChart";
import axios from "axios";
import { baseUrl } from "../api/api-url";
import { Link } from "react-router-dom";

const TeacherDashboard = () => {
  const [totalStudents, setTotalStudents] = useState("");
  const [studentAttendance, setStudentAttendance] = useState("");
  const [teacherAttendance, setTeacherAttendance] = useState("");
  const [currentAcademicYear, setCurrentAcademicYear] = useState("");
  const [currentTerm, setCurrentTerm] = useState("");
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
    const email = sessionStorage.getItem("email");

    axios
      .post(
        `${baseUrl.baseUrl}/get-teacher-info`,
        {
          email: email,
        },
        {
          headers: {
            // authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        // Assuming res.data contains the teacher information
        const teacherInfo = res.data;

        // Store individual pieces of information in session storage
        sessionStorage.setItem("teacherFirstName", teacherInfo.first_name);
        sessionStorage.setItem("teacherClass", teacherInfo.class);
        sessionStorage.setItem("teacherId", teacherInfo.id);
        sessionStorage.setItem("teacherPhoneNumber", teacherInfo.phone_number);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const Class = sessionStorage.getItem("teacherClass");
    axios
      .post(
        `${baseUrl.baseUrl}/count-active-students-in-class`,
        {
          Class,
        },
        {
          headers: {
            // authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setTotalStudents(res.data.active_students_count);
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
    const Class = sessionStorage.getItem("teacherClass");
    axios
      .post(
        `${baseUrl.baseUrl}/get-today-teacher-attendance-count-in-class`,

        {
          CurrentDate: currentDate,
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
    const Class = sessionStorage.getItem("teacherClass");
    axios
      .post(
        `${baseUrl.baseUrl}/get-today-student-attendance-count-in-class`,

        {
          CurrentDate: currentDate,
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
        setStudentAttendance(res.data[0].count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const totalMales = 75; // Total number of male students
  const totalFemales = 45; // Total number of female students
  return (
    <div class="content container-fluid">
      <div class="page-header">
        <div class="row">
          <div class="col-md-6">
            <h3 class="page-title mb-0">Teacher Dashboard</h3>
          </div>
          <div class="col-md-6">
            <ul class="breadcrumb mb-0 p-0 float-right">
              <li class="breadcrumb-item">
                <a href="index.html">
                  <i class="fas fa-home"></i> Home
                </a>
              </li>
              <li class="breadcrumb-item">
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

      <div class="row">
        <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
          <Link to="/view-students-attendence">
            <div class="dash-widget dash-widget5">
              <div class="dash-widget-info d-inline-block text-left">
                <span>Student Attendence</span>
                <h3>{studentAttendance}</h3>
              </div>
              <span class="float-right">
                <img src={dash4} alt="" width="80" />
              </span>
            </div>
          </Link>
        </div>

        <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
          <Link to="/view-teacher-attendence">
            <div class="dash-widget dash-widget5">
              <div class="dash-widget-info d-inline-block text-left">
                <span>Teacher Attendence</span>
                <h3>{teacherAttendance}</h3>
              </div>
              <span class="float-right">
                <img src={dash4} alt="" width="80" />
              </span>
            </div>
          </Link>
        </div>
        <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
          <div class="dash-widget dash-widget5">
            <span class="float-left">
              <img src={dash1} alt="" width="80" />
            </span>
            <div class="dash-widget-info text-right">
              <span>Total Students</span>
              <h3>{totalStudents}</h3>
            </div>
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

      {/* <div class="row">
        <div class="col-lg-6 d-flex">
          <div class="card flex-fill">
            <div class="row align-items-center">
              <div class="col-auto">
                <div class="page-title">Gender Distribution of Students</div>
              </div>
            </div>

            <GenderChart totalMales={totalMales} totalFemales={totalFemales} />
          </div>
        </div>

        <div class="col-lg-6 d-flex">
          <div class="card flex-fill">
            <div class="row align-items-center">
              <div class="col-auto">
                <div class="page-title">Gender Distribution of Teachers</div>
              </div>
            </div>

            <GenderChart totalMales={totalMales} totalFemales={totalFemales} />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default TeacherDashboard;
