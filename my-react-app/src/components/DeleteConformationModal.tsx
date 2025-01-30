import type React from "react"
import { useState } from "react"
import "./DeleteConfirmationModal.css"

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [inputValue, setInputValue] = useState("")

  if (!isOpen) return null

  const handleConfirm = () => {
    if (inputValue.toLowerCase() === "delete") {
      onConfirm()
      setInputValue("")
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
        <p>Type "delete" to confirm:</p>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type 'delete' here"
        />
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleConfirm} disabled={inputValue.toLowerCase() !== "delete"}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

