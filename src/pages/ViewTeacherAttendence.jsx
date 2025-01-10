import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Table.css";
import axios from "axios";
import { baseUrl } from "../api/api-url";

const ViewTeacherAttendence = () => {
  useEffect(() => {
    let date = new Date();
    let day = String(date.getDate()).padStart(2, "0");
    let month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
    let year = date.getFullYear();

    let currentDate = `${year}-${month}-${day}`;
    const id = sessionStorage.getItem("teacherId");
    axios
      .post(
        `${baseUrl.baseUrl}/get-teacher-attendance`,

        {
          teacherId: id,

          date: currentDate,
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setTeachers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [teachers, setTeachers] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [date, setDate] = useState("");
  const itemsPerPageOptions = [5, 10, 20, 30];
  // Calculate the indexes of items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = teachers.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(teachers.length / itemsPerPage); i++) {
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

  const filter = () => {
    const id = sessionStorage.getItem("teacherId");
    axios
      .post(
        `${baseUrl.baseUrl}/get-teacher-attendance`,

        {
          teacherId: id,

          date: date,
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setTeachers(response.data);
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
              Teachers Attendence
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
                {" "}
                <span>Teachers Attendence</span>
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
          Teachers Attendence
        </h1>

        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-4 col-12">
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                className="form-control"
                onChange={(e) => setDate(e.target.value)}
              />
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
                <th>Teacher ID</th>
                <th>Teacher Name</th>
                <th>Class</th>

                <th>Phone Number</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((teacher) => (
                <tr key={teacher.id}>
                  <td>{teacher.teacher_id}</td>
                  <td>{teacher.teacher_name}</td>
                  <td>{teacher.class}</td>
                  <td>{teacher.teacher_contact}</td>
                  <td>{teacher.date.split("T")[0]}</td>
                  <td>{teacher.status}</td>
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
    </div>
  );
};

export default ViewTeacherAttendence;
