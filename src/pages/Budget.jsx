import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Table.css";
import axios from "axios";
import { baseUrl } from "../api/api-url";

const Budget = () => {
  const navigate = useNavigate();

  // State variables for budget amounts
  const [budgetAmount1, setBudgetAmount1] = useState("");
  const [budgetAmount2, setBudgetAmount2] = useState("");

  // Change handlers for input fields
  const handleBudgetAmount1Change = (e) => {
    setBudgetAmount1(e.target.value);
  };

  const handleBudgetAmount2Change = (e) => {
    setBudgetAmount2(e.target.value);
  };

  // Function to handle adding budget
  const handleAddBudget = () => {
    // Logic to handle adding budget

    axios
      .put(
        `${baseUrl.baseUrl}/add-budget`,

        {
          BudgetAmount: budgetAmount1,
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

  // Function to handle subtracting budget
  const handleSubtractBudget = () => {
    axios
      .put(
        `${baseUrl.baseUrl}/subtract-budget`,

        {
          BudgetAmount: budgetAmount2,
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
      <div className="page-header">{/* Header content */}</div>

      <div className="history-page">
        <h1
          style={{
            textAlign: "center",
          }}
        >
          Budget
        </h1>

        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group">
              <label>Budget Amount</label>
              <input
                type="number"
                className="form-control"
                value={budgetAmount1}
                onChange={handleBudgetAmount1Change}
              />
            </div>

            <div className="form-group">
              <label>Budget Amount</label>
              <input
                type="number"
                className="form-control"
                value={budgetAmount2}
                onChange={handleBudgetAmount2Change}
              />
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group text-center custom-mt-form-group mt-4">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={handleAddBudget}
              >
                Add Budget
              </button>
            </div>

            <div className="form-group text-center custom-mt-form-group mt-5">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={handleSubtractBudget}
              >
                Subtract Budget
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;
