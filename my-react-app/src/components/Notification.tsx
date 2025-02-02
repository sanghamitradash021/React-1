import type React from 'react';
import { useEffect, useState } from 'react';
import './Notification.css';

/**
 * Props for the Notification component.
 *
 * @interface NotificationProps
 * @property {string} message - The message displayed in the notification.
 * @property {"success" | "error"} type - Type of notification, either "success" or "error".
 * @property {number} [duration=3000] - Duration (in milliseconds) before the notification auto-dismisses. Defaults to 3000ms.
 * @property {() => void} onClose - Function called when the notification is dismissed.
 */

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  duration?: number;
  onClose: () => void;
}

/**
 * Notification component that displays a message and disappears after a set duration.
 *
 * @component
 * @param {NotificationProps} props - The props for the Notification component.
 * @returns {React.ReactNode} The rendered notification.
 */

export const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return isVisible ? (
    <div className={`notification ${type}`}>
      <p>{message}</p>
      <button onClick={() => setIsVisible(false)}>×</button>
    </div>
  ) : null;
};
