import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Table.css";
import axios from "axios";
import { baseUrl } from "../api/api-url";
import Modal from "../components/Modal";

const AllStudents = () => {
  useEffect(() => {
    axios
      .get(`${baseUrl.baseUrl}/get-students`, {
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
        // setClassName(res.data[0].class_name);
        // console.log(res.data[0].class_name);
        // console.log(classNames[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [id, setId] = useState("");

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [languages, setLanguages] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [fatherOccupation, setFatherOccupation] = useState("");
  const [fatherContact, setFatherContact] = useState("");
  const [motherName, setMotherName] = useState("");
  const [motherOccupation, setMotherOccupation] = useState("");
  const [motherContact, setMotherContact] = useState("");

  const [students, setStudents] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isEditingSuccess, setIsEditingSuccess] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("");
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
        `${baseUrl.baseUrl}/get-teacher-students`,

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

  const handleDelete = (studentId) => {
    setStudentId(studentId);

    setIsModalOpen2(true);
  };

  const handleDeactivate = (studentId) => {
    setStudentId(studentId);

    setIsModalOpen3(true);
  };
  const handleEdit = (
    id,
    firstName,
    middleName,
    lastName,
    gender,
    birthDate,
    address,
    languages,
    fatherName,
    fatherOccupation,
    fatherContact,
    motherName,
    motherOccupation,
    motherContact /* add other fields */
  ) => {
    setIsModalOpen(true);
    setId(id);
    setFirstName(firstName);
    setMiddleName(middleName);
    setLastName(lastName);
    setGender(gender);
    setBirthDate(birthDate);
    setAddress(address);
    setLanguages(languages);
    setFatherName(fatherName);
    setFatherOccupation(fatherOccupation);
    setFatherContact(fatherContact);
    setMotherName(motherName);
    setMotherOccupation(motherOccupation);
    setMotherContact(motherContact);
    // Set other field values here
  };
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleMiddleNameChange = (e) => {
    setMiddleName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleBirthDateChange = (e) => {
    setBirthDate(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleLanguagesChange = (e) => {
    setLanguages(e.target.value);
  };

  const handleFatherNameChange = (e) => {
    setFatherName(e.target.value);
  };

  const handleFatherOccupationChange = (e) => {
    setFatherOccupation(e.target.value);
  };

  const handleFatherContactChange = (e) => {
    setFatherContact(e.target.value);
  };

  const handleMotherNameChange = (e) => {
    setMotherName(e.target.value);
  };

  const handleMotherOccupationChange = (e) => {
    setMotherOccupation(e.target.value);
  };

  const handleMotherContactChange = (e) => {
    setMotherContact(e.target.value);
  };
  const onClose = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    onClose();
  };

  const handleSave = () => {
    axios
      .put(
        `${baseUrl.baseUrl}/update-student`,
        {
          Id: id,
          FirstName: firstName,
          MiddleName: middleName,
          LastName: lastName,
          Gender: gender,
          BirthDate: birthDate,
          Address: address,
          Languages: languages,
          FatherName: fatherName,
          FatherOccupation: fatherOccupation,
          FatherContact: fatherContact,
          MotherName: motherName,
          MotherOccupation: motherOccupation,
          MotherContact: motherContact,
        },
        {
          withCredentials: true,
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

        filter();
        onClose();
      })
      .catch((error) => {
        // Handle error responses here
        console.error("Error updating student:", error);
        // Set error state or handle errors as needed
      });
  };

  const onClose2 = () => {
    setIsModalOpen2(false);
  };

  const onClose3 = () => {
    setIsModalOpen3(false);
  };

  const handleConfirmDeactivate = () => {
    axios
      .put(
        `${baseUrl.baseUrl}/deactivate-student`,
        {
          Id: studentId,
        },
        {
          withCredentials: true,
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

        filter();
        onClose3();
      })
      .catch((error) => {
        // Handle error responses here
        console.error("Error updating student:", error);
        // Set error state or handle errors as needed
      });
  };
  const handleConfirmDelete = () => {
    const email = sessionStorage.getItem("email");
    axios
      .put(
        `${baseUrl.baseUrl}/delete-student`,
        {
          Email: email,
          Id: studentId,
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
        filter();
        setIsDeleteSuccess(true); // Indicate editing success
        // Reset success indication after 2 seconds (adjust the delay as needed)
        setTimeout(() => {
          setIsDeleteSuccess(false);
        }, 2000);

        onClose2();
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
              All Students
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
                <a href="index.html">Students</a>
              </li>
              <li className="breadcrumb-item">
                {" "}
                <span>All Students</span>
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
          All Students
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
                <th>Status</th>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.status}</td>
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
                  <td>
                    <button
                      className="edit-button"
                      onClick={() =>
                        handleEdit(
                          student.id,
                          student.first_name,
                          student.middle_name,
                          student.last_name,
                          student.gender,
                          student.birth_date,
                          student.address,
                          student.languages,
                          student.father_name,
                          student.father_occupation,
                          student.father_contact,
                          student.mother_name,
                          student.mother_occupation,
                          student.mother_contact
                        )
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      style={{
                        background: "#8B8000",
                      }}
                      onClick={() => {
                        handleDeactivate(student.id);
                      }}
                    >
                      Deactivate
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => {
                        handleDelete(student.id);
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
              </div>

              <div className="history-form-group">
                <label htmlFor="middleName">Middle Name:</label>
                <input
                  type="text"
                  id="middleName"
                  value={middleName}
                  onChange={handleMiddleNameChange}
                />
              </div>

              <div className="history-form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              </div>

              <div className="history-form-group">
                <label htmlFor="gender">Gender:</label>
                <select
                  className="form-control select"
                  id="gender"
                  value={gender}
                  onChange={handleGenderChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="history-form-group">
                <label htmlFor="birthDate">Date of Birth:</label>
                <input
                  type="date"
                  id="birthDate"
                  value={birthDate}
                  onChange={handleBirthDateChange}
                />
              </div>
              <div className="history-form-group">
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={handleAddressChange}
                />
              </div>

              <div className="history-form-group">
                <label htmlFor="languages">Languages Spoken:</label>
                <input
                  type="text"
                  id="languages"
                  value={languages}
                  onChange={handleLanguagesChange}
                />
              </div>

              <div className="history-form-group">
                <label htmlFor="fatherName">Father's Name:</label>
                <input
                  type="text"
                  id="fatherName"
                  value={fatherName}
                  onChange={handleFatherNameChange}
                />
              </div>

              <div className="history-form-group">
                <label htmlFor="fatherOccupation">Father's Occupation:</label>
                <input
                  type="text"
                  id="fatherOccupation"
                  value={fatherOccupation}
                  onChange={handleFatherOccupationChange}
                />
              </div>

              <div className="history-form-group">
                <label htmlFor="fatherContact">Father's Contact:</label>
                <input
                  type="text"
                  id="fatherContact"
                  value={fatherContact}
                  onChange={handleFatherContactChange}
                />
              </div>

              <div className="history-form-group">
                <label htmlFor="motherName">Mother's Name:</label>
                <input
                  type="text"
                  id="motherName"
                  value={motherName}
                  onChange={handleMotherNameChange}
                />
              </div>

              <div className="history-form-group">
                <label htmlFor="motherOccupation">Mother's Occupation:</label>
                <input
                  type="text"
                  id="motherOccupation"
                  value={motherOccupation}
                  onChange={handleMotherOccupationChange}
                />
              </div>

              <div className="history-form-group">
                <label htmlFor="motherContact">Mother's Contact:</label>
                <input
                  type="text"
                  id="motherContact"
                  value={motherContact}
                  onChange={handleMotherContactChange}
                />
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

        <Modal
          isOpen={isModalOpen3}
          onClose={onClose3}
          onConfirm={handleConfirmDeactivate}
        >
          Are you sure you want to Deactivate this Student?
        </Modal>
      </div>
    </div>
  );
};

export default AllStudents;
