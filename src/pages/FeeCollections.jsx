import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Table.css";
import axios from "axios";
import { baseUrl } from "../api/api-url";

const FeeCollections = () => {
  useEffect(() => {
    axios
      .get(`${baseUrl.baseUrl}/get-fees`, {
        headers: {
          // authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setFees(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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

  useEffect(() => {
    axios
      .get(`${baseUrl.baseUrl}/get-total-fees`, {
        headers: {
          // authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res.data);
        setTotalFees(res.data.sum);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [fees, setFees] = useState([]);
  const [totalFees, setTotalFees] = useState("");
  const [academicYears, setAcademicYears] = useState([]);
  const [academicYear, setAcademicYear] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("First");
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
  const currentItems = fees.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(fees.length / itemsPerPage); i++) {
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
    axios
      .post(
        `${baseUrl.baseUrl}/filter-fees`,

        {
          AcademicYear: academicYear,
          Term: selectedTerm,
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
        setFees(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post(
        `${baseUrl.baseUrl}/filter-total-fees`,

        {
          AcademicYear: academicYear,
          Term: selectedTerm,
        },
        {
          headers: {
            // authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setTotalFees(res.data.sum);
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
              Fee Collections
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
                <a href="index.html">Accounts</a>
              </li>
              <li className="breadcrumb-item">
                {" "}
                <span>Fee Collections</span>
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
          Fee Collections
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

          <div className="col-lg-2 col-md-2 col-sm-2 col-6">
            <div className="form-group text-center custom-mt-form-group mt-4">
              <h4>{`Total: ₵${totalFees}`}</h4>
            </div>
          </div>
        </div>

        <div className="history-table-container">
          <table className="history-memorandum-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Class</th>
                <th>Fee Type</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((fee) => (
                <tr key={fee.id}>
                  <td>{fee.student_id}</td>
                  <td>{fee.first_name}</td>
                  <td>{fee.last_name}</td>
                  <td>{fee.gender}</td>
                  <td>{fee.class}</td>

                  <td>{fee.fee_type}</td>
                  <td>{fee.amount}</td>

                  <td>
                    <button
                      className="edit-button"
                      onClick={() =>
                        handleEdit(
                          fee.id,
                          fee.file_number,
                          fee.title,
                          fee.amount,
                          fee.comment,
                          fee.recipient,
                          fee.status
                        )
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => {
                        handleDelete(
                          fee.id,
                          fee.memo_id,
                          fee.file_number,
                          fee.title,
                          fee.amount,
                          fee.comment,
                          fee.recipient,
                          fee.status
                        );
                      }}
                    >
                      Delete
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

export default FeeCollections;
