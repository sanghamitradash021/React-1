import React from 'react';
import './Modal.css'; // Ensure modal styling is applied

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        {/* Close button at the top right */}
        <button className="modal-close" onClick={onClose}>
          {' '}
          ×{' '}
        </button>

        {/* Content inside modal */}
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};
