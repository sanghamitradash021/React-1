import type { FormData } from "../Interfaces"

/**
 * Interface defining the contract for data service operations.
 */

export interface DataService {

    /**
    * Retrieves stored form data.
    * @returns {FormData[]} Array of stored form data.
    */
    getData: () => FormData[]

    /**
     * Replaces stored data with new data.
     * @param {FormData[]} data - Array of form data to be stored.
     */
    setData: (data: FormData[]) => void

    /**
     * Adds new form data to the existing stored data.
     * @param {FormData} newData - The new data to be added.
     */
    addData: (newData: FormData) => void

    /**
     * Updates existing form data.
     * @param {FormData} updatedData - The updated data object.
     */
    updateData: (updatedData: FormData) => void

    /**
     * Deletes form data by its unique identifier.
     * @param {string} id - The unique identifier of the data to delete.
     */
    deleteData: (id: string) => void
}


/**
 * Implementation of DataService using localStorage for persistence.
 */

export class LocalStorageDataService implements DataService {

    /**
     * The local storage key used for storing data.
     * @private
     */
    private storageKey = "appData"

    /**
     * Retrieves stored form data from localStorage.
     * @returns {FormData[]} Array of stored form data.
     */

    getData(): FormData[] {
        const savedData = localStorage.getItem(this.storageKey)
        return savedData ? JSON.parse(savedData) : []
    }

    /**
    * Saves an array of form data to localStorage.
    * @param {FormData[]} data - Array of form data to be stored.
    */

    setData(data: FormData[]): void {
        localStorage.setItem(this.storageKey, JSON.stringify(data))
    }

    /**
     * Adds a new form data entry to localStorage.
     * @param {FormData} newData - The new form data to be added.
     */

    addData(newData: FormData): void {
        const currentData = this.getData()
        this.setData([...currentData, newData])
    }

    /**
    * Updates an existing form data entry in localStorage.
    * @param {FormData} updatedData - The updated form data.
    */

    updateData(updatedData: FormData): void {
        const currentData = this.getData()
        const updatedDataSet = currentData.map((item) => (item.id === updatedData.id ? updatedData : item))
        this.setData(updatedDataSet)
    }

    /**
     * Deletes a form data entry from localStorage by its unique identifier.
     * @param {string} id - The unique identifier of the data to be deleted.
     */


    deleteData(id: string): void {
        const currentData = this.getData()
        const filteredData = currentData.filter((item) => item.id !== id)
        this.setData(filteredData)
    }
}

