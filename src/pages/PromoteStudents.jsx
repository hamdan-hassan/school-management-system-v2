import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Table.css";
import axios from "axios";
import { baseUrl } from "../api/api-url";

const PromoteStudents = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [className, setClassName] = useState("");
  const [classNames, setClassNames] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [students, setStudents] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [memoID2, setMemoID2] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

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
        setClassName(res.data[0].class_name);
        // console.log(res.data[0].class_name);
        // console.log(classNames[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    const Class = sessionStorage.getItem("teacherClass");
    axios
      .post(
        `${baseUrl.baseUrl}/get-teacher-students`,

        {
          Class: Class,
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
        setSelectedStudent(
          `${res.data[0].first_name} ${res.data[0].last_name}`
        );
        setStudentId(res.data[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleSelectClassChange = (e) => {
    setClassName(e.target.value);
  };

  const handlePromoteStudent = () => {
    axios
      .post(
        `${baseUrl.baseUrl}/promote-student`,
        {
          ID: studentId,

          Class: className,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setSubmitted(true);

        setTimeout(() => {
          setSubmitted(false);
        }, 3000);

        const Class = sessionStorage.getItem("teacherClass");
        axios
          .post(
            `${baseUrl.baseUrl}/get-teacher-students`,

            {
              Class: Class,
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
            setSelectedStudent(
              `${res.data[0].first_name} ${res.data[0].last_name}`
            );
            setStudentId(res.data[0].id);
          })
          .catch((err) => {
            console.log(err);
          });
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
              Promote Students
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
                <span>Promote Students</span>
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
          Promote Students
        </h1>

        {submitted && (
          <div
            style={{
              backgroundColor: "#4caf50",
              color: "white",
              textAlign: "center",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            Student Promoted Successful!
          </div>
        )}

        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-3 col-6">
            <div className="form-group">
              <label>Student Name</label>
              <select
                className="form-control select"
                value={selectedStudent}
                onChange={(e) => {
                  const selectedName = e.target.value;
                  const selectedStudentObj = students.find(
                    (student) =>
                      `${student.first_name} ${student.last_name}` ===
                      selectedName
                  );
                  setSelectedStudent(selectedName);
                  if (selectedStudentObj) {
                    setStudentId(selectedStudentObj.id);
                  }
                }}
              >
                {students.map((item) => (
                  <option
                    key={item.id}
                    value={`${item.first_name} ${item.last_name}`}
                  >
                    {`${item.first_name} ${item.last_name}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-3 col-6">
            <div className="form-group">
              <label>ID</label>
              <select
                disabled
                className="form-control select"
                value={selectedStudent}
              >
                <option>{studentId}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-3 col-6">
            <div className="form-group">
              <label>Class to Promote to</label>
              <select
                className="form-control select"
                value={className}
                onChange={handleSelectClassChange}
              >
                {classNames.map((item) => (
                  <option key={item.class_name} value={item.class_name}>
                    {item.class_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-3 col-6">
            <div className="form-group text-center custom-mt-form-group mt-4">
              <button
                className="btn btn-secondary"
                type="reset"
                onClick={handlePromoteStudent}
              >
                Promote
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

export default PromoteStudents;
