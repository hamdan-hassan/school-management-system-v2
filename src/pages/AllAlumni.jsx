import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Table.css";
import axios from "axios";
import { baseUrl } from "../api/api-url";

const AllAlumni = () => {
  useEffect(() => {
    axios
      .get(`${baseUrl.baseUrl}/get-alumni-students`, {
        headers: {
          // authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setStudents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${baseUrl.baseUrl}/get-classes`, {
        headers: {
          // authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setClassNames(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);

  const [isEditingSuccess, setIsEditingSuccess] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [className, setClassName] = useState("All");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [classNames, setClassNames] = useState([]);
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

  const handleSelectClassChange = (e) => {
    setClassName(e.target.value);
  };

  const filter = () => {
    axios
      .post(
        `${baseUrl.baseUrl}/get-teacher-alumni-students`,

        {
          Class: className,
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
  };

  return (
    <div className="content container-fluid">
      <div className="page-header">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <h5 className="text-uppercase mb-0 mt-0 page-title">Alumni</h5>
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
                {" "}
                <span>Alumni</span>
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
          Alumni
        </h1>
        {isEditingSuccess && (
          <div className="success-message">Edit successful!</div>
        )}
        {isDeleteSuccess && (
          <div className="delete-success-message">Deleted successful!</div>
        )}

        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group">
              <label>Class</label>
              <select
                className="form-control select"
                value={className}
                onChange={handleSelectClassChange}
              >
                <option value="All">All</option>
                {classNames.map((item) => {
                  // Exclude the "ALUMNI" option from rendering
                  if (item.class_name !== "ALUMNI") {
                    return (
                      <option key={item.class_name} value={item.class_name}>
                        {item.class_name}
                      </option>
                    );
                  }
                  return null; // Skip rendering for "ALUMNI"
                })}
              </select>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
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
                <th>ID</th>
                <th>First Name</th>
                <th>Middle Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Class</th>
                <th>Address</th>
                <th>Languages Spoken</th>
                <th>Father's Name</th>
                <th>Father's Occupation</th>
                <th>Father's Contact</th>
                <th>Mother's Name</th>
                <th>Mother's Occupation</th>
                <th>Mother's Contact</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.first_name}</td>
                  <td>{student.middle_name}</td>
                  <td>{student.last_name}</td>
                  <td>{student.gender}</td>
                  <td>{student.birth_date}</td>
                  <td>{student.class}</td>
                  <td>{student.address}</td>
                  <td>{student.languages}</td>
                  <td>{student.father_name}</td>
                  <td>{student.father_occupation}</td>
                  <td>{student.father_contact}</td>
                  <td>{student.mother_name}</td>
                  <td>{student.mother_occupation}</td>
                  <td>{student.mother_contact}</td>
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

export default AllAlumni;
