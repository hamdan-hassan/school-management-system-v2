import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../api/api-url";
import "../styles/Table.css";

const TakeStudentAttendance = () => {
  useEffect(() => {
    const Class = sessionStorage.getItem("teacherClass");
    axios
      .post(
        `${baseUrl.baseUrl}/get-teacher-students`,

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
        setStudents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [date, setDate] = useState("");
  const [studentName, setStudentName] = useState([]);
  const [studentAttendance, setStudentAttendance] = useState([]);
  const [attendance, setAttendance] = useState("Present");
  const [showAttendenceForm, setShowAttendenceForm] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [students, setStudents] = useState([]);

  const TakeAttendence = () => {
    const Class = sessionStorage.getItem("teacherClass");

    axios
      .post(
        `${baseUrl.baseUrl}/add-student-attendance`,

        {
          Class: Class,
          Students: students,
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
        setStudentName(response.data);
        setAttendance(response.data);
        setStudentId(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitAttendance = () => {
    const id = sessionStorage.getItem("teacherId");
    console.log(studentName);
    axios
      .put(
        `${baseUrl.baseUrl}/submit-student-attendance`,

        {
          Students: studentName,
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

  const handleAttendanceChange = (studentId, newStatus) => {
    // Update the attendance status of the selected student
    const updatedStudents = studentName.map((student) => {
      if (student.student_id === studentId) {
        return {
          ...student,
          status: newStatus,
        };
      }
      return student;
    });
    setStudentName(updatedStudents);
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
                <a href="index.html">Students</a>
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

        {showAttendenceForm &&
          studentName.map((student, i) => (
            <div key={i}>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Student's Name</label>
                    <input
                      disabled
                      type="text"
                      className="form-control"
                      value={student.student_name}
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Attendance</label>
                    <select
                      className="form-control"
                      value={student.status}
                      onChange={(e) =>
                        handleAttendanceChange(
                          student.student_id,
                          e.target.value
                        )
                      }
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}

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

export default TakeStudentAttendance;
