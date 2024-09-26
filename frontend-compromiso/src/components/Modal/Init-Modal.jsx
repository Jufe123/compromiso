// src/components/Modal/Init-Modal.jsx
import React from 'react';
import '../styles/Modal.css'; // Asegúrate de crear este archivo para los estilos

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
