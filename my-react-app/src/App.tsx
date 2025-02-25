import type React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { FormComponent } from './components/FormComponent';
import { TableComponent } from './components/TableComponent';
import { Notification } from './components/Notification';
import './App.css';

/**
 * A wrapper component that maps through notifications and renders them.
 * Handles the removal of notifications when they are closed.
 *
 * @returns {JSX.Element} A list of Notification components.
 */

const NotificationWrapper: React.FC = () => {
  const { notifications, removeNotification } = useAppContext();

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
  );
};

/**
 * The main app component that includes the form, table, and notification components.
 * Wrapped with AppProvider to provide global context for the application.
 *
 * @returns {JSX.Element} The main application layout with form, table, and notifications.
 */

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
  );
};

export default App;
