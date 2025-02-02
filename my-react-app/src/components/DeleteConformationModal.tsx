import type React from 'react';
import { useState } from 'react';
import './DeleteConfirmationModal.css';

/**
 * Props for the DeleteConfirmationModal component.
 * @typedef {Object} DeleteConfirmationModalProps
 * @property {boolean} isOpen - Determines if the modal is open.
 * @property {() => void} onClose - Function to close the modal.
 * @property {() => void} onConfirm - Function to confirm deletion.
 */

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * A confirmation modal that requires the user to type "delete" before confirming.
 *
 * @component
 * @param {DeleteConfirmationModalProps} props - The properties passed to the component.
 * @returns {React.ReactNode} The DeleteConfirmationModal component.
 */

export const DeleteConfirmationModal: React.FC<
  DeleteConfirmationModalProps
> = ({ isOpen, onClose, onConfirm }) => {
  const [inputValue, setInputValue] = useState('');

  // If modal is not open, do not render anything.
  if (!isOpen) return null;

  /**
   * Handles the confirm button click.
   * If the input value is "delete", calls the onConfirm function and resets input.
   */

  const handleConfirm = () => {
    if (inputValue.toLowerCase() === 'delete') {
      onConfirm();
      setInputValue('');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Deletion</h2>
        <p>
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>
        <p>Type "delete" to confirm:</p>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type 'delete' here"
        />
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleConfirm}
            disabled={inputValue.toLowerCase() !== 'delete'}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
