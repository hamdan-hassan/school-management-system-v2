import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Table.css";

const AllParents = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [memorandums, setMemorandums] = useState([]);
  const [recipient, setRecipient] = useState("");
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
  return (
    <div className="content container-fluid">
      <div className="page-header">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <h5 className="text-uppercase mb-0 mt-0 page-title">all Parents</h5>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <ul className="breadcrumb float-right p-0 mb-0">
              <li className="breadcrumb-item">
                <a href="index.html">
                  <i className="fas fa-home"></i> Home
                </a>
              </li>
              <li className="breadcrumb-item">
                <a href="index.html">Parents</a>
              </li>
              <li className="breadcrumb-item">
                <span> All Parents</span>
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
          All Parents
        </h1>

        <div className="history-table-container">
          <table className="history-memorandum-table">
            <thead>
              <tr>
                <th>Parent Name</th>
                <th>ID</th>
                <th>Gender</th>
                <th>Student Name</th>
                <th>Email</th>
                <th>Phone number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((memorandum) => (
                <tr key={memorandum.id}>
                  <td>{memorandum.file_number}</td>
                  <td>{memorandum.title}</td>
                  <td>{memorandum.amount}</td>
                  <td>{memorandum.comment}</td>
                  <td>
                    {memorandum.recipient === 0 ? "N/A" : memorandum.recipient}
                  </td>
                  <td>
                    {memorandum.status === "Pending"
                      ? "Sent"
                      : memorandum.status}
                  </td>
                  <td>
                    {memorandum.recipient === 0 ||
                    memorandum.status === "Accepted" ||
                    memorandum.status === "Deleted"
                      ? "N/A"
                      : memorandum.is_received
                      ? "Received"
                      : "Not Received"}
                  </td>
                  <td>{memorandum.event_date}</td>
                  <td>{memorandum.event_time}</td>
                  {/* <td>{memorandum.status}</td> */}
                  <td>
                    {memorandum.status !== "Accepted" ? (
                      <>
                        {" "}
                        <button
                          className="edit-button"
                          disabled={
                            memorandum.is_received ||
                            memorandum.status === "Deleted"
                              ? true
                              : false
                          }
                          style={{
                            background:
                              memorandum.is_received ||
                              memorandum.status === "Deleted"
                                ? "gray"
                                : "",
                          }}
                          onClick={() =>
                            handleEdit(
                              memorandum.id,
                              memorandum.file_number,
                              memorandum.title,
                              memorandum.amount,
                              memorandum.comment,
                              memorandum.recipient,
                              memorandum.status
                            )
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="delete-button"
                          disabled={
                            memorandum.is_received ||
                            memorandum.status === "Deleted"
                              ? true
                              : false
                          }
                          style={{
                            background:
                              memorandum.is_received ||
                              memorandum.status === "Deleted"
                                ? "gray"
                                : "",
                          }}
                          onClick={() => {
                            handleDelete(
                              memorandum.id,
                              memorandum.memo_id,
                              memorandum.file_number,
                              memorandum.title,
                              memorandum.amount,
                              memorandum.comment,
                              memorandum.recipient,
                              memorandum.status
                            );
                          }}
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <button
                        className="delete-button"
                        disabled={memorandum.is_received ? true : false}
                        style={{
                          background: memorandum.is_received ? "gray" : "",
                        }}
                        onClick={() =>
                          handleDelete(
                            memorandum.id,
                            memorandum.memo_id,
                            memorandum.file_number,
                            memorandum.title,
                            memorandum.amount,
                            memorandum.comment,
                            memorandum.recipient,
                            memorandum.status
                          )
                        }
                      >
                        Delete
                      </button>
                    )}
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

export default AllParents;
