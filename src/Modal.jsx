import React from 'react';
import "./css/modal.css";

const Modal = ({ message, onClose }) => {
    console.log("ㄹㄹㄹ");
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose}>확인</button>
      </div>
    </div>
  );
};

export default Modal;