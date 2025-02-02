import type React from 'react';
import { createContext, useContext, useState } from 'react';
import {
  type DataService,
  LocalStorageDataService,
} from '../services/DataServices';

/**
 * Represents a notification message with a type.
 */

interface Notification {
  /** Unique identifier for the notification */
  id: number;
  /** Message content of the notification */
  message: string;
  /** Type of notification (success or error) */
  type: 'success' | 'error';
}

/**
 * Defines the shape of the AppContext.
 */

interface AppContextType {
  /** Service for managing data operations */
  dataService: DataService;
  /** List of notifications */
  notifications: Notification[];
  /**
   * Adds a notification to the list.
   * @param {string} message - The notification message.
   * @param {"success" | "error"} type - The type of the notification.
   */
  addNotification: (message: string, type: 'success' | 'error') => void;
  /**
   * Removes a notification by ID.
   * @param {number} id - The ID of the notification to remove.
   */
  removeNotification: (id: number) => void;
}

/** Creates a React context for application-wide state management */

const AppContext = createContext<AppContextType | undefined>(undefined);

/**
 * Custom hook to access the AppContext.
 * @throws {Error} If used outside of an AppProvider.
 * @returns {AppContextType} The application context.
 */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

/**
 * Provides application-wide context including data services and notifications.
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components wrapped by the provider.
 * @returns {React.ReactNode} The provider component.
 */
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [dataService] = useState<DataService>(
    () => new LocalStorageDataService()
  );
  const [notifications, setNotifications] = useState<Notification[]>([]);

  /**
   * Adds a new notification.
   * @param {string} message - The message to display.
   * @param {"success" | "error"} type - The type of notification.
   */
  const addNotification = (message: string, type: 'success' | 'error') => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
  };

  /**
   * Removes a notification by its ID.
   * @param {number} id - The ID of the notification to remove.
   */
  const removeNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  return (
    <AppContext.Provider
      value={{
        dataService,
        notifications,
        addNotification,
        removeNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
