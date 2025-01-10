import React, { useEffect } from "react";
import "../styles/Modal.css";

function Modal({ isOpen, onClose, onConfirm, children }) {
  const handleKeyPress = (e) => {
    if (isOpen && e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, handleKeyPress]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal2">
        <button className="close-button2" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content2">
          <p>{children}</p>
          <div className="button-container2">
            <button className="yes-button2" onClick={onConfirm}>
              Yes
            </button>
            <button className="no-button2" onClick={onClose}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
