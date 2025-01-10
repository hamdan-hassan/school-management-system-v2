import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../api/api-url";
import "../styles/Table.css";

const AddClass = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [className, setClassName] = useState("");

  const [status, setStatus] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const addClass = () => {
    axios
      .post(
        `${baseUrl.baseUrl}/add-class`,

        {
          ClassName: className.toLocaleUpperCase(),
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
        setClassName("");
        setSubmitted(true);

        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
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
            <h5 className="text-uppercase mb-0 mt-0 page-title">Add Class</h5>
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
                <span>Add Class</span>
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
          Add Class
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
            Added Successful!
          </div>
        )}

        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group">
              <label>Class Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setClassName(e.target.value)}
              />
            </div>

            {/* <div className="form-group">
              <label>Item Price</label>
              <input type="number" className="form-control" />
            </div> */}
          </div>

          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            {/* <div className="form-group">
              <label>Section</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setSection(e.target.value)}
              />
            </div> */}

            <div className="form-group text-center custom-mt-form-group mt-5">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={() => addClass()}
              >
                Add Class
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClass;
