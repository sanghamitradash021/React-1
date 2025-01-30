import type React from "react"
import { useState } from "react"
import { useAppContext } from "../context/AppContext"
import type { FormData } from "../Interfaces"
import { DeleteConfirmationModal } from "./DeleteConformationModal"
import "./TableComponent.css"

export const TableComponent: React.FC = () => {
  const { data, deleteData } = useAppContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)

  const handleEdit = (item: FormData) => {
    document.dispatchEvent(new CustomEvent("editItem", { detail: item }))
  }

  const handleDelete = (id: string) => {
    setItemToDelete(id)
    setIsModalOpen(true)
  }

  const confirmDelete = () => {
    if (itemToDelete) {
      deleteData(itemToDelete)
      setIsModalOpen(false)
      setItemToDelete(null)
    }
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Country</th>
            <th>State</th>
            <th>City</th>
            <th>ZIP</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={8}>No data available</td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.country}</td>
                <td>{item.state}</td>
                <td>{item.city}</td>
                <td>{item.zip}</td>
                <td>
                  <div className="action-buttons">
                    <button className="edit" onClick={() => handleEdit(item)} title="Edit">
                      ✏️
                    </button>
                    <button className="delete" onClick={() => handleDelete(item.id)} title="Delete">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <DeleteConfirmationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={confirmDelete} />
    </div>
  )
}

