import type React from 'react';
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import type { FormData } from '../Interfaces';
import { DeleteConfirmationModal } from './DeleteConformationModal';
import './TableComponent.css';

/**
 * TableComponent displays a list of data in a table format
 * and allows users to edit or delete entries.
 *
 * @component
 * @returns {React.ReactNode} The rendered TableComponent.
 */

export const TableComponent: React.FC = () => {
  const { dataService, addNotification } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  /** Fetches the data to be displayed in the table. */
  const data = dataService.getData();

  /**
   * Triggers the edit event for a specific item.
   *
   * @param {FormData} item - The item to be edited.
   */
  const handleEdit = (item: FormData) => {
    document.dispatchEvent(new CustomEvent('editItem', { detail: item }));
  };

  /**
   * Opens the delete confirmation modal for a specific item.
   *
   * @param {string} id - The ID of the item to be deleted.
   */

  const handleDelete = (id: string) => {
    setItemToDelete(id);
    setIsModalOpen(true);
  };

  /**
   * Confirms and deletes the selected item from the dataset.
   */

  const confirmDelete = () => {
    if (itemToDelete) {
      dataService.deleteData(itemToDelete);
      addNotification('Data deleted successfully', 'success');
      setIsModalOpen(false);
      setItemToDelete(null);
    }
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Country</th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={8}>No data available</td>
            </tr>
          ) : (
            data.map((item: FormData) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.country}</td>

                <td>
                  <div className="action-buttons">
                    <button
                      className="edit"
                      onClick={() => handleEdit(item)}
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(item.id)}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};
