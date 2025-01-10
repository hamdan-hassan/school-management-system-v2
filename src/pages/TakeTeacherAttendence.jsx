import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../api/api-url";
import "../styles/Table.css";

const TakeTeacherAttendence = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [date, setDate] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [attendance, setAttendance] = useState("Present");
  const [showAttendenceForm, setShowAttendenceForm] = useState(false);
  const [teacherId, setTeacherId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const TakeAttendence = () => {
    const id = sessionStorage.getItem("teacherId");
    const firstName = sessionStorage.getItem("teacherFirstName");
    const Class = sessionStorage.getItem("teacherClass");
    const PhoneNumber = sessionStorage.getItem("teacherPhoneNumber");

    axios
      .post(
        `${baseUrl.baseUrl}/add-teacher-attendance`,

        {
          id: id,
          firstName: firstName,
          Class: Class,
          PhoneNumber: PhoneNumber,
          date: date,
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setShowAttendenceForm(true);
        setTeacherName(response.data[0].teacher_name);
        setAttendance(response.data[0].status);
        setTeacherId(response.data[0].teacher_id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitAttendance = () => {
    const id = sessionStorage.getItem("teacherId");
    axios
      .put(
        `${baseUrl.baseUrl}/submit-teacher-attendance`,

        {
          id: id,
          status: attendance,
          date: date,
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setShowAttendenceForm(false);
        setSubmitted(true);

        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="content container-fluid">
      <div className="page-header">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <h5 className="text-uppercase mb-0 mt-0 page-title">
              Take Attendance
            </h5>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <ul className="breadcrumb float-right p-0 mb-0">
              <li className="breadcrumb-item">
                <a href="index.html">
                  <i className="fas fa-home"></i> Home
                </a>
              </li>
              <li className="breadcrumb-item">
                <a href="index.html">Teacher</a>
              </li>
              <li className="breadcrumb-item">
                <span>Take Attendance</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="history-page">
        <h1
          style={{
            textAlign: "center",
          }}
        >
          Take Attendance
        </h1>
        {submitted && (
          <div
            style={{
              backgroundColor: "#4caf50",
              color: "white",
              textAlign: "center",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            Attendance Submitted Successful!
          </div>
        )}

        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group">
              <label>Select Date</label>
              <input
                type="date"
                className="form-control"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group text-center custom-mt-form-group mt-4">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={() => TakeAttendence()}
              >
                Take Attendance
              </button>
            </div>
          </div>
        </div>

        {showAttendenceForm && (
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label>Teacher's Name</label>
                <input
                  disabled
                  type="text"
                  className="form-control"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label>Attendance</label>
                <select
                  className="form-control"
                  value={attendance}
                  onChange={(e) => setAttendance(e.target.value)}
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {showAttendenceForm && (
          <div className="form-group text-center custom-mt-form-group mt-4">
            <button
              className="btn btn-primary"
              type="button"
              onClick={submitAttendance}
            >
              Submit Attendance
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeTeacherAttendence;
