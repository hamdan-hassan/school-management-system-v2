// TableModal.jsx

import React from "react";
import "../styles/TableModal.css"; // Import the CSS file for styling
import "../styles/printStyles.css";

const TableModal = ({
  handleClose,
  studentData,
  studentName,
  academicYear,
  term,
}) => {
  const handlePrint = () => {
    window.print();
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="table-modal-close" onClick={handleClose}>
          &times;
        </span>
        <div>
          <h3
            style={{
              textAlign: "center",
            }}
          >
            HOPE OF GLORY JAZ INT. SCHOOL
          </h3>
        </div>
        <div className="modal-header">
          <h2>Student Report</h2>

          <div className="student-info">
            <p>Student Name: {studentName}</p>
            <p>Academic Year: {academicYear}</p>
            <p>Term: {term}</p>
          </div>
          <button className="print-button" onClick={handlePrint}>
            Print
          </button>
        </div>
        <table className="marks-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Class Score</th>
              <th>Exam Score</th>
              <th>Total Score</th>
              <th>Grades</th>
            </tr>
          </thead>
          <tbody>
            {studentData.map((subjectData, index) => (
              <tr key={index}>
                <td>{subjectData.subject}</td>
                <td>{subjectData.class_score}</td>
                <td>{subjectData.exams_score}</td>
                <td>{subjectData.total_score}</td>
                <td>{subjectData.grades}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableModal;
