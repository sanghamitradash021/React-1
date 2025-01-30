export const validateField = (
    fieldName: string,
    value: string,
    setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>,
  ) => {
    let error = ""
  
    switch (fieldName) {
      case "name":
        if (value.trim() === "") {
          error = "Name is required"
        } else if (value.length < 3) {
          error = "Name must be at least 3 characters long"
        }
        break
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Invalid email format"
        }
        break
      case "phone":
        if (!/^\d{10}$/.test(value)) {
          error = "Phone number must be 10 digits"
        }
        break
      case "country":
        if (value === "") {
          error = "Country is required"
        }
        break
      case "state":
        if (value === "") {
          error = "State is required"
        }
        break
      case "city":
        if (value === "") {
          error = "City is required"
        }
        break
      case "zip":
        if (!/^\d{5}(-\d{4})?$/.test(value)) {
          error = "Invalid ZIP code format"
        }
        break
    }
  
    setErrors((prev) => ({ ...prev, [fieldName]: error }))
  }
  
  