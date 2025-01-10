import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Table.css";
import axios from "axios";
import { baseUrl } from "../api/api-url";

const AddMarks = () => {
  useEffect(() => {
    axios
      .get(`${baseUrl.baseUrl}/get-current-academic-year`, {
        headers: {
          // authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setCurrentAcademicYear(res.data[0].academic_year);
        setCurrentTerm(res.data[0].term);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${baseUrl.baseUrl}/get-academic-years`, {
        headers: {
          // authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setAcademicYears(res.data);
        console.log(res.data);
        setSelectedItemId(res.data[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
        setSelectedStudent(
          `${res.data[0].first_name} ${res.data[0].last_name}`
        );
        setStudentId(res.data[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${baseUrl.baseUrl}/get-subjects`, {
        headers: {
          // authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setSubjects(res.data);
        setSelectedSubject(res.data[0].name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [students, setStudents] = useState([]);
  const [classScore, setClassScore] = useState("");
  const [examScore, setExamScore] = useState("");
  const [totalScore, setTotalScore] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [currentAcademicYear, setCurrentAcademicYear] = useState("");
  const [currentTerm, setCurrentTerm] = useState("");
  const [academicYears, setAcademicYears] = useState([]);
  const [grade, setGrade] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("First");
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const addSubject = () => {
    const Class = sessionStorage.getItem("teacherClass");
    axios
      .post(
        `${baseUrl.baseUrl}/add-marks`,
        {
          StudentName: selectedStudent,
          StudentId: studentId,
          SubjectName: selectedSubject,
          ClassScore: classScore,
          ExamsScore: examScore,
          TotalScore: totalScore,
          Grade: grade,
          AcademicaYear: academicYear,
          Term: selectedTerm,
          Class: Class,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        setSubmitted(true);

        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSelectTerm = (e) => {
    const selectedTerm = e.target.value;
    setSelectedTerm(selectedTerm);
  };

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setAcademicYear(selectedValue);
  };
  return (
    <div className="content container-fluid">
      <div className="page-header">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <h5 className="text-uppercase mb-0 mt-0 page-title">Add Marks</h5>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <ul className="breadcrumb float-right p-0 mb-0">
              <li className="breadcrumb-item">
                <a href="index.html">
                  <i className="fas fa-home"></i> Home
                </a>
              </li>
              <li className="breadcrumb-item">
                <a href="index.html">Marks</a>
              </li>
              <li className="breadcrumb-item">
                {" "}
                <span>Add Marks</span>
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
          Add Subject
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
            Marks Submitted Successful!
          </div>
        )}
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-4 col-12">
            <div className="form-group">
              <label>Select Academic Year</label>
              <select
                className="form-control select"
                onChange={handleSelectChange}
                value={academicYear}
              >
                {academicYears.map((item) => (
                  <option key={item.id} value={item.academic_year}>
                    {item.academic_year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-4 col-12">
            <div className="form-group">
              <label>Select Term</label>
              <select
                className="form-control select"
                onChange={handleSelectTerm}
              >
                <option>First</option>
                <option>Second</option>
                <option>Third</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-3 col-6">
            <div className="form-group">
              <label>Student Name</label>
              <select
                className="form-control select"
                value={selectedStudent}
                onChange={(e) => {
                  const selectedName = e.target.value;
                  const selectedStudentObj = students.find(
                    (student) =>
                      `${student.first_name} ${student.last_name}` ===
                      selectedName
                  );
                  setSelectedStudent(selectedName);
                  if (selectedStudentObj) {
                    setStudentId(selectedStudentObj.id);
                  }
                }}
              >
                {students.map((item) => (
                  <option
                    key={item.id}
                    value={`${item.first_name} ${item.last_name}`}
                  >
                    {`${item.first_name} ${item.last_name}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-3 col-6">
            <div className="form-group">
              <label>Subjects</label>
              <select
                className="form-control select"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                {subjects.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-2 col-md-2 col-sm-2 col-4">
            <div className="form-group">
              <label>Class Score</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setClassScore(e.target.value)}
              />
            </div>
          </div>

          <div className="col-lg-2 col-md-2 col-sm-2 col-4">
            <div className="form-group">
              <label>Exams Score</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setExamScore(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 col-4">
            <div className="form-group">
              <label>Total Score</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setTotalScore(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 col-4">
            <div className="form-group">
              <label>Grade</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setGrade(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-3 col-6  mt-4">
            <div className="form-group">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={() => addSubject()}
              >
                Add Marks
              </button>
            </div>
          </div>
        </div>
        {/*

          <Modal
            isOpen={isModalOpen2}
            onClose={onClose2}
            onConfirm={handleConfirmDelete}
          >
            Are you sure you want to Delete?
          </Modal> */}
      </div>
    </div>
  );
};

export default AddMarks;
