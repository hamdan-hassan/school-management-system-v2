// EditModal.jsx

import React, { useState } from "react";
import "../styles/EditModal.css";

const EditModal = ({
  handleClose,
  initialSubject,
  initialClassScore,
  initialExamScore,
  initialTotalScore,
  initialGrades,
  onSave,
}) => {
  const [subject, setSubject] = useState(initialSubject);
  const [classScore, setClassScore] = useState(initialClassScore);
  const [examScore, setExamScore] = useState(initialExamScore);
  const [totalScore, setTotalScore] = useState(initialTotalScore);
  const [grades, setGrades] = useState(initialGrades);

  const handleSave = () => {
    // Perform any validation or data processing here before saving
    onSave(subject, classScore, examScore, totalScore, grades);

    handleClose();
  };

  return (
    <div className="edit-modal">
      <div className="edit-modal-content">
        <span className="edit-modal-close" onClick={handleClose}>
          &times;
        </span>

        <div className="edit-modal-header">
          <h2>Edit Marks</h2>
        </div>
        <div className="edit-modal-body">
          <label>Subject:</label>
          <input
            disabled
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <label>Class Score:</label>
          <input
            type="text"
            value={classScore}
            onChange={(e) => setClassScore(e.target.value)}
          />
          <label>Exam Score:</label>
          <input
            type="text"
            value={examScore}
            onChange={(e) => setExamScore(e.target.value)}
          />
          <label>Total Score:</label>
          <input
            type="text"
            value={totalScore}
            onChange={(e) => setTotalScore(e.target.value)}
          />
          <label>Grades:</label>
          <input
            type="text"
            value={grades}
            onChange={(e) => setGrades(e.target.value)}
          />
        </div>
        <div className="edit-modal-footer">
          <button onClick={handleSave}>Save</button>
          <button onClick={handleClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
