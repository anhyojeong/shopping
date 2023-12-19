import React from 'react';
import { useNavigate } from "react-router-dom";
import "../css/modal.css";

const Modal = ({ message, onClose, linkType }) => {
  const navigate = useNavigate();
  console.log("모달");
  console.log(linkType);
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={() => { onClose(); navigate(linkType); }}>확인</button>
      </div>
    </div>
  );
};

export default Modal;