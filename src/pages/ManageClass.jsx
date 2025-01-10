import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Table.css";
import axios from "axios";
import { baseUrl } from "../api/api-url";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/Modal";

const ManageClass = () => {
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
        setClasses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onClose2 = () => {
    setIsModalOpen2(false);
  };
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [error, setError] = useState("");
  const [memorandums, setMemorandums] = useState([]);
  const [recipient, setRecipient] = useState("");
  const [fileNumber, setFileNumber] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [classes, setClasses] = useState([]);
  const [className, setClassName] = useState("");
  const [classId, setClassId] = useState("");
  const [section, setSection] = useState([]);
  const [memoID, setMemoID] = useState(0);
  const [memoID2, setMemoID2] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [sectionError, setSectionError] = useState(false);
  const [classNameError, setClassNameError] = useState(false);
  const [isEditingSuccess, setIsEditingSuccess] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const itemsPerPageOptions = [5, 10, 20, 30];
  // Calculate the indexes of items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = classes.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(classes.length / itemsPerPage); i++) {
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

  const handleEdit = (classId, className) => {
    setClassId(classId);
    setClassName(className);

    setIsModalOpen(true);
  };

  const handleDelete = (classId) => {
    setClassId(classId);

    setIsModalOpen2(true);
  };

  const handleSave = () => {
    if (className.trim() === "") {
      setClassNameError(true);
      return;
    }

    const email = sessionStorage.getItem("email");
    axios
      .put(
        `${baseUrl.baseUrl}/edit-class`,
        {
          Email: email,
          Id: classId,
          ClassName: className,
        },
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);

        axios
          .get(
            `${baseUrl.baseUrl}/get-classes`,

            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            setIsEditingSuccess(true); // Indicate editing success

            // Reset success indication after 2 seconds (adjust the delay as needed)
            setTimeout(() => {
              setIsEditingSuccess(false);
            }, 2000);
            setClasses(res.data);
            onClose();
          })
          .catch((error) => {
            setError(error.response.data);
            console.error("Error fetching data:", error);
          });
      })
      .catch((error) => {
        if (
          (error.response.data === "Access forbidden" &&
            error.response.status === 403) ||
          error.response.status === 403
        ) {
          logout();
          navigate("/access-forbidden");
        }
        setError(error.response.data);
        console.error("Error fetching data:", error);
      });
  };

  const onClose = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    onClose();
  };

  const handleClassNameChange = (e) => {
    setClassName(e.target.value);
    // Reset the error when input changes
    setClassNameError(false);
  };

  const handleSectionChange = (e) => {
    setSection(e.target.value);
    // Reset the error when input changes
    setSectionError(false);
  };

  const handleConfirmDelete = () => {
    const email = sessionStorage.getItem("email");
    axios
      .put(
        `${baseUrl.baseUrl}/delete-class`,
        {
          Email: email,
          Id: classId,
          ClassName: className,
        },
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);

        axios
          .get(
            `${baseUrl.baseUrl}/get-classes`,

            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            setIsDeleteSuccess(true); // Indicate editing success

            // Reset success indication after 2 seconds (adjust the delay as needed)
            setTimeout(() => {
              setIsDeleteSuccess(false);
            }, 2000);
            setClasses(res.data);
            onClose2();
          })
          .catch((error) => {
            setError(error.response.data);
            console.error("Error fetching data:", error);
          });
      })
      .catch((error) => {
        if (
          (error.response.data === "Access forbidden" &&
            error.response.status === 403) ||
          error.response.status === 403
        ) {
          logout();
          navigate("/access-forbidden");
        }
        setError(error.response.data);
        console.error("Error fetching data:", error);
      });
  };
  return (
    <div className="content container-fluid">
      <div className="page-header">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <h5 className="text-uppercase mb-0 mt-0 page-title">
              Manage Class
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
                <a href="index.html">Classes</a>
              </li>
              <li className="breadcrumb-item">
                {" "}
                <span>Manage Class</span>
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
          Manage Class
        </h1>

        {isEditingSuccess && (
          <div className="success-message">Edit successful!</div>
        )}
        {isDeleteSuccess && (
          <div className="delete-success-message">Deleted successful!</div>
        )}
        <div className="history-table-container">
          <table className="history-memorandum-table">
            <thead>
              <tr>
                <th>Class Name</th>
                {/* <th>Section</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((classItem) => (
                <tr key={classItem.id}>
                  <td>{classItem.class_name}</td>
                  {classItem.class_name !== "ALUMNI" && (
                    <td>
                      <button
                        className="edit-button"
                        onClick={() =>
                          handleEdit(
                            classItem.id,
                            classItem.class_name,
                            classItem.section
                          )
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => {
                          handleDelete(classItem.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  )}
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
        {isModalOpen && (
          <div className="history-actions-modal-overlay">
            <div className="history-actions-modal-content">
              <span className="history-modal-close" onClick={onClose}>
                &times;
              </span>
              <h2>Edit</h2>

              {error && <h4 style={{ color: "red" }}>{error}</h4>}

              <div className="history-form-group">
                <label htmlFor="recipient">Class Name:</label>
                <input
                  type="text"
                  id="recipient"
                  value={className}
                  onChange={handleClassNameChange}
                />
                {classNameError && (
                  <label style={{ color: "red" }}>Class Name is required</label>
                )}
              </div>

              {/* <div className="history-form-group">
                <label htmlFor="comment">Section:</label>
                <input
                  type="text"
                  id="comment"
                  value={section}
                  onChange={handleSectionChange}
                />
                {sectionError && (
                  <label style={{ color: "red" }}>Section is required</label>
                )}
              </div> */}

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
        </Modal>
      </div>
    </div>
  );
};

export default ManageClass;
