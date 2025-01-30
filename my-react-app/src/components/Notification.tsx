import type React from "react"
import { useEffect, useState } from "react"
import "./Notification.css"

interface NotificationProps {
  message: string
  type: "success" | "error"
  duration?: number
  onClose: () => void
}

export const Notification: React.FC<NotificationProps> = ({ message, type, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return isVisible ? (
    <div className={`notification ${type}`}>
      <p>{message}</p>
      <button onClick={() => setIsVisible(false)}>×</button>
    </div>
  ) : null
}

