/**
 * Represents the form data structure for an individual entry.
 *
 * @interface FormData
 * @property {string} id - The unique identifier for the form entry.
 * @property {string} name - The name of the individual.
 * @property {string} phone - The phone number of the individual.
 * @property {string} email - The email address of the individual.
 * @property {string} dob - The date of birth of the individual (in string format).
 * @property {number} age - The age of the individual.
 * @property {string} country - The country where the individual resides.
 * @property {string} state - The state where the individual resides.
 * @property {string} city - The city where the individual resides.
 * @property {string} zip - The ZIP code for the individual's location.
 * @property {string} town - The town where the individual resides.
 */
export interface FormData {
  id: string;
  name: string;
  phone: string;
  email: string;
  dob: string;
  age: number;
  country: string;
  state: string;
  city: string;
  zip: string;
  town: string;
}

/**
 * Manages form data and deleted form data.
 * Provides methods for accessing, updating, and storing data, including deleted entries.
 *
 * @interface StateManager
 * @property {Function} getData - Retrieves all current form data.
 * @returns {FormData[]} - A list of all current form data entries.
 *
 * @property {Function} setData - Sets the current form data.
 * @param {FormData[]} data - The form data to be saved.
 *
 * @property {Function} getDeletedData - Retrieves all deleted form data entries.
 * @returns {FormData[]} - A list of deleted form data entries.
 *
 * @property {Function} setDeletedData - Sets the deleted form data.
 * @param {FormData[]} data - The deleted form data to be saved.
 */

export interface StateManager {
  getData: () => FormData[];
  setData: (data: FormData[]) => void;
  getDeletedData: () => FormData[];
  setDeletedData: (data: FormData[]) => void;
}
