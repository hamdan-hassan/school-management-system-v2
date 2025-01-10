import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Table.css";
import axios from "axios";
import { baseUrl } from "../api/api-url";

const ViewTeachersAttendence = () => {
  useEffect(() => {
    let date = new Date();
    let day = String(date.getDate()).padStart(2, "0");
    let month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
    let year = date.getFullYear();

    let currentDate = `${year}-${month}-${day}`;
    axios
      .post(
        `${baseUrl.baseUrl}/get-all-teachers-attendance`,

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
        console.log(res.data);
        setTeachers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [teachers, setTeachers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);

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
    axios
      .post(
        `${baseUrl.baseUrl}/get-all-teachers-attendance`,

        {
          CurrentDate: date,
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
        setTeachers(res.data);
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
                <a href="index.html">Teachers</a>
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

            {/* <div className="form-group">
              <label>Item Price</label>
              <input type="number" className="form-control" />
            </div> */}
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
        {/* {isModalOpen && (
              <div className="history-actions-modal-overlay">
                <div className="history-actions-modal-content">
                  <span className="history-modal-close" onClick={onClose}>
                    &times;
                  </span>
                  <h2>Edit</h2>
  
                  {error && <h4 style={{ color: "red" }}>{error}</h4>}
                  {status === "Pending" && (
                    <div className="history-form-group">
                      <label htmlFor="recipient">File Number:</label>
                      <input
                        type="text"
                        id="recipient"
                        value={fileNumber}
                        onChange={handleFileNumberChange}
                      />
                      {fileNumberError && (
                        <label style={{ color: "red" }}>
                          File Number is required
                        </label>
                      )}
                    </div>
                  )}
                  {status === "Pending" && (
                    <div className="history-form-group">
                      <label htmlFor="comment">Title:</label>
                      <input
                        type="text"
                        id="comment"
                        value={title}
                        onChange={handleTitleChange}
                      />
                      {titleError && (
                        <label style={{ color: "red" }}>Title is required</label>
                      )}
                    </div>
                  )}
                  {status === "Pending" && (
                    <div className="history-form-group">
                      <label htmlFor="comment">Amount:</label>
                      <input
                        type="number"
                        id="comment"
                        value={amount}
                        onChange={(e) => {
                          setAmount(e.target.value);
                        }}
                      />
                    </div>
                  )}
                  <div className="history-form-group">
                    <label htmlFor="comment">Comment:</label>
                    <input
                      type="text"
                      id="comment"
                      value={comment}
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                    />
                  </div>
                  {status !== "Returned" && (
                    <div className="history-form-group">
                      <label htmlFor="comment">Recipient:</label>
                      <input
                        type="number"
                        id="comment"
                        value={recipient}
                        onChange={handleRecipientChange}
                      />
                      {recipientError && (
                        <label style={{ color: "red" }}>
                          Recipient is required
                        </label>
                      )}
                    </div>
                  )}
                  <div className="history-actions-modal-buttons">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
  
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

export default ViewTeachersAttendence;
