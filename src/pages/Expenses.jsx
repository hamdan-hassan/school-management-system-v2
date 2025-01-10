import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Table.css";
import axios from "axios";
import { baseUrl } from "../api/api-url";

const Expenses = () => {
  useEffect(() => {
    axios
      .get(`${baseUrl.baseUrl}/get-expenses`, {
        headers: {
          // authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setExpenses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const itemsPerPageOptions = [5, 10, 20, 30];
  // Calculate the indexes of items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = expenses.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(expenses.length / itemsPerPage); i++) {
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
  return (
    <div className="content container-fluid">
      <div className="page-header">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <h5 className="text-uppercase mb-0 mt-0 page-title">Expenses</h5>
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
                <span>Expenses</span>
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
          Expenses
        </h1>

        {/* <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group">
              <label>Level</label>
              <select className="form-control select">
                <option>Nursery</option>
                <option>Primary</option>
              </select>
            </div>
            <div className="form-group">
              <label>Class</label>
              <select className="form-control select">
                <option>1</option>
                <option>2</option>
              </select>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group">
              <label>Section</label>
              <select className="form-control select">
                <option>A</option>
                <option>B</option>
              </select>
            </div>
            <div className="form-group">
              <label>Student ID</label>
              <select className="form-control select">
                <option>SCH000</option>
                <option>SCH001</option>
                <option>SCH002</option>
              </select>
            </div>
            <div className="form-group text-center custom-mt-form-group mt-5">
              <button className="btn btn-primary mr-2" type="submit">
               Expenses
              </button>
            </div>
          </div>
        </div> */}

        <div className="history-table-container">
          <table className="history-memorandum-table">
            <thead>
              <tr>
                <th>Expense Type</th>
                <th>Item Name</th>

                <th>Item Price</th>
                <th>Item Quantity</th>
                <th>Total Amount</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.expense_type}</td>
                  <td>{expense.item_name}</td>
                  <td>{expense.item_price}</td>
                  <td>{expense.item_qty}</td>
                  <td>{expense.total}</td>

                  <td>
                    <button
                      className="edit-button"
                      disabled={
                        expense.is_received || expense.status === "Deleted"
                          ? true
                          : false
                      }
                      style={{
                        background:
                          expense.is_received || expense.status === "Deleted"
                            ? "gray"
                            : "",
                      }}
                      onClick={() =>
                        handleEdit(
                          expense.id,
                          expense.file_number,
                          expense.title,
                          expense.amount,
                          expense.comment,
                          expense.recipient,
                          expense.status
                        )
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      disabled={
                        expense.is_received || expense.status === "Deleted"
                          ? true
                          : false
                      }
                      style={{
                        background:
                          expense.is_received || expense.status === "Deleted"
                            ? "gray"
                            : "",
                      }}
                      onClick={() => {
                        handleDelete(
                          expense.id,
                          expense.memo_id,
                          expense.file_number,
                          expense.title,
                          expense.amount,
                          expense.comment,
                          expense.recipient,
                          expense.status
                        );
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

export default Expenses;
