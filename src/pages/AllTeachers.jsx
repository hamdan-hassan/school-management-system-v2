import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Table.css";
import axios from "axios";
import { baseUrl } from "../api/api-url";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/Modal";

const AllTeachers = () => {
  useEffect(() => {
    axios
      .get(`${baseUrl.baseUrl}/get-teachers`, {
        headers: {
          // authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setTeachers(res.data);
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
        setClassNames(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const navigate = useNavigate();

  const [classNames, setClassNames] = useState([]);
  const [teacherId, setTeacherId] = useState("");
  const [className, setClassName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("Male");
  const [joiningDate, setJoiningDate] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [oldEmail, setOldEmail] = useState("");

  const [error, setError] = useState(false);

  const [teachers, setTeachers] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const [isEditingSuccess, setIsEditingSuccess] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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

  const handleEdit = (
    teacherId,
    firstName,
    middleName,
    lastName,
    gender,
    joiningDate,
    birthDate,
    email,
    phoneNumber,
    className
  ) => {
    setTeacherId(teacherId);
    setFirstName(firstName);
    setMiddleName(middleName);
    setLastName(lastName);
    setGender(gender);
    setJoiningDate(joiningDate);
    setBirthDate(birthDate);
    setTeacherEmail(email);
    setPhoneNumber(phoneNumber);
    setClassName(className);
    setOldEmail(email);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const email = sessionStorage.getItem("email");
    axios
      .put(
        `${baseUrl.baseUrl}/edit-teacher`,
        {
          Email: email,
          Id: teacherId,
          FirstName: firstName,
          MiddleName: middleName,
          LastName: lastName,
          Gender: gender,
          JoiningDate: joiningDate,
          BirthDate: birthDate,
          TeacherEmail: teacherEmail,
          PhoneNumber: phoneNumber,
          ClassName: className,
          OldEmail: oldEmail,
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
            `${baseUrl.baseUrl}/get-teachers`,

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
            setTeachers(res.data);
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
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    // Reset the error when input changes
  };

  const handleMiddleNameChange = (e) => {
    setMiddleName(e.target.value);
    // Reset the error when input changes
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    // Reset the error when input changes
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    // Reset the error when input changes
  };

  const handleJoiningDateChange = (e) => {
    setJoiningDate(e.target.value);
    // Reset the error when input changes
  };

  const handleBirthDateChange = (e) => {
    setBirthDate(e.target.value);
    // Reset the error when input changes
  };
  const handleEmailChange = (e) => {
    setTeacherEmail(e.target.value);
    // Reset the error when input changes
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
    // Reset the error when input changes
  };

  const handleDelete = (teacherId, teacherEmail) => {
    setTeacherId(teacherId);
    setTeacherEmail(teacherEmail);

    setIsModalOpen2(true);
  };
  const onClose2 = () => {
    setIsModalOpen2(false);
  };

  const handleConfirmDelete = () => {
    const email = sessionStorage.getItem("email");
    axios
      .put(
        `${baseUrl.baseUrl}/delete-teacher`,
        {
          Email: email,
          TeacherEmail: teacherEmail,
          Id: teacherId,
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
            `${baseUrl.baseUrl}/get-teachers`,

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
            setTeachers(res.data);
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
    <>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <h5 className="text-uppercase mb-0 mt-0 page-title">Teachers</h5>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <ul className="breadcrumb float-right p-0 mb-0">
                <li className="breadcrumb-item">
                  <a href="index.html">
                    <i className="fas fa-home"></i> Home
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Teachers</a>
                </li>
                <li className="breadcrumb-item">
                  <span> All Teachers</span>
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
            All Teachers
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
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Middle Name</th>
                  <th>Last Name</th>
                  <th>Gender</th>
                  <th>Joining Date</th>
                  <th>Birth Date</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Class</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((teacher) => (
                  <tr key={teacher.id}>
                    <td>{teacher.id}</td>
                    <td>{teacher.first_name}</td>
                    <td>{teacher.middle_name}</td>
                    <td>{teacher.last_name}</td>
                    <td>{teacher.gender}</td>
                    <td>{teacher.joining_date}</td>
                    <td>{teacher.birth_date}</td>

                    <td>{teacher.email}</td>
                    <td>{teacher.phone_number}</td>
                    <td>{teacher.class}</td>
                    <td>
                      {
                        <>
                          <button
                            className="edit-button"
                            disabled={
                              teacher.is_received ||
                              teacher.status === "Deleted"
                                ? true
                                : false
                            }
                            style={{
                              background:
                                teacher.is_received ||
                                teacher.status === "Deleted"
                                  ? "gray"
                                  : "",
                            }}
                            onClick={() =>
                              handleEdit(
                                teacher.id,
                                teacher.first_name,
                                teacher.middle_name,
                                teacher.last_name,
                                teacher.gender,
                                teacher.joining_date,
                                teacher.birth_date,
                                teacher.email,
                                teacher.phone_number,
                                teacher.class
                              )
                            }
                          >
                            Edit
                          </button>
                          <button
                            className="delete-button"
                            disabled={
                              teacher.is_received ||
                              teacher.status === "Deleted"
                                ? true
                                : false
                            }
                            style={{
                              background:
                                teacher.is_received ||
                                teacher.status === "Deleted"
                                  ? "gray"
                                  : "",
                            }}
                            onClick={() => {
                              handleDelete(teacher.id, teacher.email);
                            }}
                          >
                            Delete
                          </button>
                        </>
                      }
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
          {isModalOpen && (
            <div className="history-actions-modal-overlay">
              <div className="history-actions-modal-content">
                <span className="history-modal-close" onClick={onClose}>
                  &times;
                </span>
                <h2>Edit</h2>

                {error && <h4 style={{ color: "red" }}>{error}</h4>}

                <div className="history-form-group">
                  <label htmlFor="recipient">First Name:</label>
                  <input
                    type="text"
                    id="recipient"
                    value={firstName}
                    onChange={handleFirstNameChange}
                  />
                  {/* {fileNumberError && (
                    <label style={{ color: "red" }}>
                      File Number is required
                    </label>
                  )} */}
                </div>

                <div className="history-form-group">
                  <label htmlFor="comment">Middle Name:</label>
                  <input
                    type="text"
                    id="comment"
                    value={middleName}
                    onChange={handleMiddleNameChange}
                  />
                  {/* {titleError && (
                    <label style={{ color: "red" }}>Title is required</label>
                  )} */}
                </div>

                <div className="history-form-group">
                  <label htmlFor="comment">Last Name:</label>
                  <input
                    type="text"
                    id="comment"
                    value={lastName}
                    onChange={handleLastNameChange}
                  />
                </div>

                <div className="history-form-group">
                  <label htmlFor="comment">Gender:</label>
                  {/* <input
                    type="text"
                    id="comment"
                    value={gender}
                    // onChange={(e) => {
                    //   setComment(e.target.value);
                    // }}
                  /> */}
                  <select
                    className="form-control select"
                    value={gender}
                    onChange={handleGenderChange}
                  >
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>

                <div className="history-form-group">
                  <label htmlFor="comment">Joining Date:</label>
                  <input
                    type="date"
                    id="comment"
                    value={joiningDate}
                    onChange={handleJoiningDateChange}
                  />
                  {/* {recipientError && (
                      <label style={{ color: "red" }}>
                        Recipient is required
                      </label>
                    )} */}
                </div>

                <div className="history-form-group">
                  <label htmlFor="comment">Birth Date:</label>
                  <input
                    type="date"
                    id="comment"
                    value={birthDate}
                    onChange={handleBirthDateChange}
                  />
                  {/* {recipientError && (
                      <label style={{ color: "red" }}>
                        Recipient is required
                      </label>
                    )} */}
                </div>

                <div className="history-form-group">
                  <label htmlFor="comment">Email:</label>
                  <input
                    type="text"
                    id="comment"
                    value={teacherEmail}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="history-form-group">
                  <label htmlFor="comment">Phone Number:</label>
                  <input
                    type="text"
                    id="comment"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                  />
                  {/* {recipientError && (
                      <label style={{ color: "red" }}>
                        Recipient is required
                      </label>
                    )} */}
                </div>

                <div className="history-form-group">
                  <label htmlFor="comment">Class:</label>
                  <select
                    className="form-control select"
                    value={className}
                    onChange={handleClassNameChange}
                  >
                    {classNames.map((item) => (
                      <option key={item.class_name} value={item.class_name}>
                        {item.class_name}
                      </option>
                    ))}
                  </select>
                </div>

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
    </>
  );
};

export default AllTeachers;
