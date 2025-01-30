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

export interface StateManager {
  getData: () => FormData[];
  setData: (data: FormData[]) => void;
  getDeletedData: () => FormData[];
  setDeletedData: (data: FormData[]) => void;
}
