import React from 'react';
import './Modal.css';

/**
 * Props for the Modal component.
 *
 * @interface ModalProps
 * @property {React.ReactNode} children - The content to be displayed inside the modal.
 * @property {() => void} onClose - Function to close the modal when triggered.
 */

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

/**
 * A reusable modal component that displays content in a centered overlay.
 *
 * @component
 * @param {ModalProps} props - The props for the Modal component.
 * @returns {React.ReactNode} The rendered modal.
 */
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
