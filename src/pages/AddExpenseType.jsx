import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Table.css";
import axios from "axios";
import { baseUrl } from "../api/api-url";

const AddExpenseType = () => {
  const navigate = useNavigate();

  const [expenseType, setExpenseType] = useState("");

  const addExpenseType = () => {
    axios
      .post(
        `${baseUrl.baseUrl}/add-expense-type`,

        {
          ExpenseType: expenseType,
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
              Add Expense Type
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
                <span>Add Expense Type</span>
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
          Add Expense Type
        </h1>

        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group">
              <label>Expense Type</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setExpenseType(e.target.value)}
              />
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group text-center custom-mt-form-group mt-4">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={() => addExpenseType()}
              >
                Add Expense Type
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

export default AddExpenseType;
