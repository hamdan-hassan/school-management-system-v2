import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Table.css";
import axios from "axios";
import { baseUrl } from "../api/api-url";

const AddExpense = () => {
  const navigate = useNavigate();

  // State variables
  const [error, setError] = useState("");
  const [expenseTypes, setExpenseTypes] = useState([]);
  const [selectedExpenseType, setSelectedExpenseType] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");

  useEffect(() => {
    axios
      .get(`${baseUrl.baseUrl}/expense-types`, {
        headers: {
          // authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setExpenseTypes(res.data);
        setSelectedExpenseType(res.data[0].expense_type);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Handle functions for input changes
  const handleExpenseTypeChange = (e) => {
    setSelectedExpenseType(e.target.value);
  };

  const handleItemPriceChange = (e) => {
    setItemPrice(e.target.value);
  };

  const handleItemNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handleItemQuantityChange = (e) => {
    setItemQuantity(e.target.value);
  };

  const handleSubmit = () => {
    const academic_year = sessionStorage.getItem("academic year");
    const term = sessionStorage.getItem("term");
    axios
      .post(
        `${baseUrl.baseUrl}/add-expenses`,

        {
          ExpenseType: selectedExpenseType,
          ItemName: itemName,
          ItemPrice: itemPrice,
          ItemQuantity: itemQuantity,
          AcademicYear: academic_year,
          Term: term,
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
            <h5 className="text-uppercase mb-0 mt-0 page-title">Add Expense</h5>
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
                <span>Add Expense</span>
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
          Add Expense
        </h1>

        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group">
              <label>Expense Type</label>
              <select
                className="form-control select"
                onChange={handleExpenseTypeChange}
              >
                {expenseTypes.map((expenseType) => (
                  <option key={expenseType.id} value={expenseType.expense_type}>
                    {expenseType.expense_type}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Item Price</label>
              <input
                type="number"
                className="form-control"
                onChange={handleItemPriceChange}
              />
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group">
              <label>Item Name</label>
              <input
                type="text"
                className="form-control"
                onChange={handleItemNameChange}
              />
            </div>
            <div className="form-group">
              <label>Item Quantity</label>
              <input
                type="number"
                className="form-control"
                onChange={handleItemQuantityChange}
              />
            </div>

            <div className="form-group text-center custom-mt-form-group mt-5">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={handleSubmit}
              >
                Add Expense
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
