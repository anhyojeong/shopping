import React from "react";
import { useNavigate } from "react-router-dom";
// 아이콘
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "../css/modal.css";

const Modal = ({ message, onClose, linkType }) => {
  const navigate = useNavigate();
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-close">
        <button id="modal-close-btn">
          <FontAwesomeIcon size="2x" icon={faXmark} onClick={onClose} />
        </button>
        </div>
        
        <p>{message}</p>
        <button
          onClick={() => {
            onClose();
            navigate(linkType);
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default Modal;
