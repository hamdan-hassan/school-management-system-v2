// TableModal.jsx

import React, { useState, useEffect } from "react";
import "../styles/TableModal.css"; // Import the CSS file for styling
import "../styles/printStyles.css";
import EditModal from "./EditModal";
import axios from "axios";
import { baseUrl } from "../api/api-url";

const TableModal2 = ({
  handleClose,
  studentData,
  studentName,
  academicYear,
  term,
}) => {
  const [Id, setId] = useState("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClassScore, setSelectedClassScore] = useState("");
  const [selectedExamsScore, setSelectedExamsScore] = useState("");
  const [selectedTotalScore, setSelectedTotalScore] = useState("");
  const [selectedGrades, setSelectedGrades] = useState("");
  const [isEditingSuccess, setIsEditingSuccess] = useState(false);
  const [selectedStudentData, setSelectedStudentData] = useState([]);

  useEffect(() => {
    axios
      .post(
        `${baseUrl.baseUrl}/get-student-report`,

        {
          StudentId: studentData[0].student_id,
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
        setSelectedStudentData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isEditingSuccess]);
  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveMarks = (
    subject,
    classScore,
    examScore,
    totalScore,
    grades
  ) => {
    axios
      .put(
        `${baseUrl.baseUrl}/update-marks`,
        {
          Id: Id,
          Subject: subject,
          ClassScore: classScore,
          ExamScore: examScore,
          TotalScore: totalScore,
          Grades: grades,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setIsEditingSuccess(!isEditingSuccess); // Indicate editing success

        // // Reset success indication after 2 seconds (adjust the delay as needed)
        // setTimeout(() => {
        //   setIsEditingSuccess(false);
        // }, 2000);

        handleEditModalClose();
      })
      .catch((error) => {
        // Handle error responses here
        console.error("Error updating student:", error);
        // Set error state or handle errors as needed
      });
  };
  const handleEditMarks = (
    Id,
    subject,
    classScore,
    examScore,
    totalScore,
    grades
  ) => {
    setId(Id);
    setSelectedSubject(subject);
    setSelectedClassScore(classScore);
    setSelectedExamsScore(examScore);
    setSelectedTotalScore(totalScore);
    setSelectedGrades(grades);
    setIsEditModalOpen(true);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="table-modal-close" onClick={handleClose}>
          &times;
        </span>

        <div className="modal-header">
          <h2>Student Report</h2>

          <div className="student-info">
            <p>Student Name: {studentName}</p>
            <p>Academic Year: {academicYear}</p>
            <p>Term: {term}</p>
          </div>
        </div>
        <table className="marks-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Class Score</th>
              <th>Exam Score</th>
              <th>Total Score</th>
              <th>Grades</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedStudentData.map((subjectData, index) => (
              <tr key={index}>
                <td>{subjectData.subject}</td>
                <td>{subjectData.class_score}</td>
                <td>{subjectData.exams_score}</td>
                <td>{subjectData.total_score}</td>
                <td>{subjectData.grades}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() =>
                      handleEditMarks(
                        subjectData.id,
                        subjectData.subject,
                        subjectData.class_score,
                        subjectData.exams_score,
                        subjectData.total_score,
                        subjectData.grades
                      )
                    }
                  >
                    Edit Marks
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isEditModalOpen && (
        <EditModal
          handleClose={handleEditModalClose}
          initialSubject={selectedSubject}
          initialClassScore={selectedClassScore}
          initialExamScore={selectedExamsScore}
          initialTotalScore={selectedTotalScore}
          initialGrades={selectedGrades}
          onSave={handleSaveMarks}
        />
      )}
    </div>
  );
};

export default TableModal2;
