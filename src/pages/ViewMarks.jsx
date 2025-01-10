import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Table.css";
import axios from "axios";
import { baseUrl } from "../api/api-url";
import TableModal from "../components/TableModal";
import TableModal2 from "../components/TableModal2";

const ViewMarks = () => {
  useEffect(() => {
    axios
      .get(`${baseUrl.baseUrl}/get-academic-years`, {
        headers: {
          // authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setAcademicYears(res.data);

        setAcademicYear(res.data[0].academic_year);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [selectedStudentData, setSelectedStudentData] = useState([]);

  // Function to handle opening modal and setting student data
  const handleViewMarks = (studentId, studentName) => {
    axios
      .post(
        `${baseUrl.baseUrl}/get-student-report`,

        {
          StudentId: studentId,
          AcademicYear: academicYear,
          Term: selectedTerm,
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setSelectedStudentData(response.data);
        setStudentName(studentName);

        setIsModalOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditMarks = (studentId, studentName) => {
    axios
      .post(
        `${baseUrl.baseUrl}/get-student-report`,

        {
          StudentId: studentId,
          AcademicYear: academicYear,
          Term: selectedTerm,
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setSelectedStudentData(response.data);
        setStudentName(studentName);

        setIsModalOpen2(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseModal2 = () => {
    setIsModalOpen2(false);
  };
  const navigate = useNavigate();
  const [academicYear, setAcademicYear] = useState("");

  const [academicYears, setAcademicYears] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("First");
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const itemsPerPageOptions = [5, 10, 20, 30];
  // Calculate the indexes of items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = students.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(students.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Render pagination buttons
  const renderPageNumbers = pageNumbers.map((number) => (
    <button
      key={number}
      onClick={() => setCurrentPage(number)}
      className={currentPage === number ? "active" : ""}
    >
      {number}
    </button>
  ));
  const handleSelectTerm = (e) => {
    const selectedTerm = e.target.value;
    setSelectedTerm(selectedTerm);
  };
  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    setAcademicYear(selectedId);
  };

  const filter = () => {
    const Class = sessionStorage.getItem("teacherClass");
    axios
      .post(
        `${baseUrl.baseUrl}/get-students-marks`,

        {
          Class: Class,
          AcademicYear: academicYear,
          Term: selectedTerm,
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setStudents(response.data);
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
            <h5 className="text-uppercase mb-0 mt-0 page-title">View Marks</h5>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <ul className="breadcrumb float-right p-0 mb-0">
              <li className="breadcrumb-item">
                <a href="index.html">
                  <i className="fas fa-home"></i> Home
                </a>
              </li>
              <li className="breadcrumb-item">
                <a href="index.html">Exams</a>
              </li>
              <li className="breadcrumb-item">
                {" "}
                <span>View Exams</span>
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
          View Marks
        </h1>

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

          <div className="col-lg-4 col-md-4 col-sm-4 col-12">
            <div className="form-group text-center custom-mt-form-group mt-4">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={filter}
              >
                Filter
              </button>
            </div>
          </div>
        </div>
        <div className="history-table-container">
          <table className="history-memorandum-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((student) => (
                <tr key={student.id}>
                  <td>{student.student_id}</td>
                  <td>{student.student_name}</td>

                  {/* <td>{student.status}</td> */}
                  <td>
                    <button
                      className="edit-button"
                      onClick={() =>
                        handleViewMarks(
                          student.student_id,
                          student.student_name
                        )
                      }
                    >
                      View Marks
                    </button>

                    <button
                      className="edit-button"
                      onClick={() =>
                        handleEditMarks(
                          student.student_id,
                          student.student_name
                        )
                      }
                    >
                      Edit Marks
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">{renderPageNumbers}</div>
        <div className="items-per-page-dropdown">
          <label>Show Entries:</label>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(parseInt(e.target.value));
              setCurrentPage(1);
            }}
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      {isModalOpen && (
        <TableModal
          handleClose={handleCloseModal}
          studentData={selectedStudentData}
          academicYear={academicYear}
          term={selectedTerm}
          studentName={studentName}
        />
      )}

      {isModalOpen2 && (
        <TableModal2
          handleClose={handleCloseModal2}
          studentData={selectedStudentData}
          academicYear={academicYear}
          term={selectedTerm}
          studentName={studentName}
        />
      )}
    </div>
  );
};

export default ViewMarks;
