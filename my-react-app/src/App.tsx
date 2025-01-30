import type React from "react"
import { AppProvider, useAppContext } from "./context/AppContext"
import { FormComponent } from "./components/FormComponent"
import { TableComponent } from "./components/TableComponent"
import { Notification } from "./components/Notification"
import "./App.css"

const NotificationWrapper: React.FC = () => {
  const { notifications, removeNotification } = useAppContext()

  return (
    <>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </>
  )
}

const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="container">
        <div className="app-form-container">
          <FormComponent />
        </div>
        <div className="app-table-container">
          <TableComponent />
        </div>
      </div>
      <NotificationWrapper />
    </AppProvider>
  )
}

export default App

