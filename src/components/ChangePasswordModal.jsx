// ChangePasswordModal.jsx

import React, { useState } from "react";
import "../styles/ChangePasswordModal.css"; // Import the CSS file for styling

const ChangePasswordModal = ({ isOpen, handleClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate if new password matches confirm new password
    if (newPassword !== confirmNewPassword) {
      // Handle password mismatch error
      return;
    }

    // Handle password change API call or logic here
    // Reset the input fields after successful password change
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");

    // Close the modal after successful password change
    handleClose();
  };

  return (
    <div className={`password-modal ${isOpen ? "show" : ""}`}>
      <div className="password-modal-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={handleNewPasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmNewPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmNewPassword"
              value={confirmNewPassword}
              onChange={handleConfirmNewPasswordChange}
              required
            />
          </div>
          <button type="submit" className="change-password-btn">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
