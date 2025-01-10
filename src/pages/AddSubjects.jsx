import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Table.css";
import axios from "axios";
import { baseUrl } from "../api/api-url";

const AddSubjects = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [memorandums, setMemorandums] = useState([]);
  const [recipient, setRecipient] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [fileNumber, setFileNumber] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const [memoID, setMemoID] = useState(0);
  const [memoID2, setMemoID2] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [recipientError, setRecipientError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [fileNumberError, setFileNumberError] = useState(false);
  const [isEditingSuccess, setIsEditingSuccess] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const itemsPerPageOptions = [5, 10, 20, 30];
  // Calculate the indexes of items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = memorandums.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(memorandums.length / itemsPerPage); i++) {
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

  const addSubject = () => {
    axios
      .post(
        `${baseUrl.baseUrl}/add-subject`,

        {
          SubjectName: subjectName,
          // Section: section,
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
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
              Add Subjects
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
                <a href="index.html">Subjects</a>
              </li>
              <li className="breadcrumb-item">
                {" "}
                <span>Add Subjects</span>
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

        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group">
              <label>Subject Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setSubjectName(e.target.value)}
              />
            </div>

            {/* <div className="form-group">
              <label>Item Price</label>
              <input type="number" className="form-control" />
            </div> */}
          </div>

          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            {/* <div className="form-group">
              <label>Teacher</label>
              <select className="form-control select">
                <option>SCH000</option>
                <option>SCH001</option>
                <option>SCH002</option>
              </select>
            </div> */}

            <div className="form-group text-center custom-mt-form-group mt-4">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={() => addSubject()}
              >
                Add Class
              </button>
            </div>
          </div>
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

export default AddSubjects;
