import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../api/api-url";
import axios from "axios";
import "../styles/Table.css";

const ManageAcademicYear = () => {
  useEffect(() => {
    axios
      .get(`${baseUrl.baseUrl}/get-current-academic-year`, {
        headers: {
          // authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setCurrentAcademicYear(res.data[0].academic_year);
        setCurrentTerm(res.data[0].term);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${baseUrl.baseUrl}/get-academic-years`, {
        headers: {
          // authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setAcademicYears(res.data);

        setSelectedItemId(res.data[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [academicYear, setAcademicYear] = useState("");
  const [currentAcademicYear, setCurrentAcademicYear] = useState("");
  const [currentTerm, setCurrentTerm] = useState("");
  const [academicYears, setAcademicYears] = useState([]);

  const [selectedItemId, setSelectedItemId] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitted2, setSubmitted2] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState("First");

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    setSelectedItemId(selectedId);
  };

  const handleSelectTerm = (e) => {
    const selectedTerm = e.target.value;
    setSelectedTerm(selectedTerm);
  };

  const addAcademicYear = () => {
    axios
      .post(
        `${baseUrl.baseUrl}/add-academic-year`,

        {
          AcademicYear: academicYear,
          Term: selectedTerm,
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        setSubmitted(true);

        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
        setAcademicYear("");
        axios
          .get(`${baseUrl.baseUrl}/get-academic-years`, {
            headers: {
              // authorization: "Bearer " + accessToken,
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            setAcademicYears(res.data);

            setSelectedItemId(res.data[0].id);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSetCurrentAcademicYear = () => {
    axios
      .put(
        `${baseUrl.baseUrl}/set-academic-year`,
        {
          AcademicYear: selectedItemId,
          Term: selectedTerm,
        },
        // {
        //   withCredentials: true,
        // },
        {
          headers: {
            // authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setSubmitted2(true);

        setTimeout(() => {
          setSubmitted2(false);
        }, 3000);

        axios
          .get(`${baseUrl.baseUrl}/get-current-academic-year`, {
            headers: {
              // authorization: "Bearer " + accessToken,
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            console.log(res.data);
            setCurrentAcademicYear(res.data[0].academic_year);
            setCurrentTerm(res.data[0].term);
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
              Manage Academic Year
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
                <a href="index.html">Academic Year</a>
              </li>
              <li className="breadcrumb-item">
                {" "}
                <span>Add/Set Academic Year</span>
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
          Manage Academic Year
        </h1>

        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-4 col-12">
            <h4>Current Academic Year: {currentAcademicYear}</h4>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-12">
            <h4>Current Term: {currentTerm}</h4>
          </div>
        </div>

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
            Added Successful!
          </div>
        )}

        {submitted2 && (
          <div
            style={{
              backgroundColor: "#4caf50",
              color: "white",
              textAlign: "center",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            Academic Year set Successful!
          </div>
        )}
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-4 col-12">
            <div className="form-group">
              <label>Academic Year</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setAcademicYear(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-4 col-12 mt-2">
            <div className="form-group text-center custom-mt-form-group">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={() => addAcademicYear()}
              >
                Add Academic Year
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-4 col-12">
            <div className="form-group">
              <label>Select Academic Year</label>
              <select
                className="form-control select"
                onChange={handleSelectChange}
                value={selectedItemId}
              >
                {academicYears.map((item) => (
                  <option key={item.id} value={item.id}>
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
                onClick={() => handleSetCurrentAcademicYear()}
              >
                Set Academic Year
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAcademicYear;
