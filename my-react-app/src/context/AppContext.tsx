import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { FormData } from "../Interfaces"

interface Notification {
  id: number
  message: string
  type: "success" | "error"
}

interface AppContextType {
  data: FormData[]
  addData: (newData: FormData) => void
  updateData: (updatedData: FormData) => void
  deleteData: (id: string) => void
  notifications: Notification[]
  addNotification: (message: string, type: "success" | "error") => void
  removeNotification: (id: number) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<FormData[]>(() => {
    const savedData = localStorage.getItem("appData")
    return savedData ? JSON.parse(savedData) : []
  })
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    localStorage.setItem("appData", JSON.stringify(data))
  }, [data])

  const addData = (newData: FormData) => {
    setData((prevData) => [...prevData, newData])
    addNotification("Data added successfully", "success")
  }

  const updateData = (updatedData: FormData) => {
    setData((prevData) => prevData.map((item) => (item.id === updatedData.id ? updatedData : item)))
    addNotification("Data updated successfully", "success")
  }

  const deleteData = (id: string) => {
    setData((prevData) => prevData.filter((item) => item.id !== id))
    addNotification("Data deleted successfully", "success")
  }

  const addNotification = (message: string, type: "success" | "error") => {
    const id = Date.now()
    setNotifications((prev) => [...prev, { id, message, type }])
  }

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  return (
    <AppContext.Provider
      value={{ data, addData, updateData, deleteData, notifications, addNotification, removeNotification }}
    >
      {children}
    </AppContext.Provider>
  )
}

