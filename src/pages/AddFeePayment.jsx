import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Table.css";
import { baseUrl } from "../api/api-url";
import axios from "axios";

const AddFeePayment = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [classNames, setClassNames] = useState([]);
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState("");
  const [className, setClassName] = useState("");
  const [feeType, setFeeType] = useState("Tuition Fee");
  const [amount, setAmount] = useState("");

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

        axios
          .post(
            `${baseUrl.baseUrl}/get-students-from-class`,

            {
              ClassName: className,
              // Section: section,
            },

            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            setStudents(response.data);
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleSelectClassChange = (e) => {
    const selectedClass = e.target.value;
    setClassName(selectedClass);

    axios
      .post(
        `${baseUrl.baseUrl}/get-students-from-class`,
        { ClassName: selectedClass },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        setStudents(response.data);
        setStudent(response.data[0].id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFeeTypeChange = (e) => {
    setFeeType(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleConfirm = () => {
    const academicYear = sessionStorage.getItem("academic year");
    const term = sessionStorage.getItem("term");
    axios
      .post(
        `${baseUrl.baseUrl}/submit-fee-payment`,
        {
          StudentId: student,
          FeeType: feeType,
          Amount: amount,
          AcademicYear: academicYear,
          Term: term,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // Handle the success scenario
        console.log("Fee payment added successfully:", response.data);
        setSubmitted(true);

        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error adding fee payment:", error);
        // Update the state to display an error message if needed
        setError("Failed to add fee payment. Please try again.");
      });
  };
  return (
    <div className="content container-fluid">
      <div className="page-header">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <h5 className="text-uppercase mb-0 mt-0 page-title">
              Add Fee Payment
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
                <span>Add Fee Payment</span>
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
          Add Fee Payment
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
            Fees Submitted Successful!
          </div>
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
                {classNames.map((item) => (
                  <option key={item.class_name} value={item.class_name}>
                    {item.class_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Fee Type</label>
              <select
                className="form-control select"
                value={feeType}
                onChange={handleFeeTypeChange}
              >
                <option>Tuition Fee</option>
                <option>Admission and Uniform</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group">
              <label>Student Name</label>
              <select
                className="form-control select"
                value={student}
                onChange={(e) => {
                  setStudent(e.target.value);
                }}
              >
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {`${student.first_name} ${student.last_name}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                className="form-control"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>
            <div className="form-group text-center custom-mt-form-group mt-5">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={handleConfirm}
              >
                Add Fee Payment
              </button>
            </div>
          </div>
        </div>

        {/* 

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

export default AddFeePayment;
