import { useState, useEffect } from 'react'
import './Toast.css'

function Toast({ message, type = 'info', duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      setIsVisible(false)
      onClose && onClose()
    }, 300)
  }

  if (!isVisible) return null

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '\ud83c\udf3e' // Rice plant emoji
      case 'error':
        return '\u26a0\ufe0f' // Warning emoji
      case 'warning':
        return '\ud83c\udf3b' // Sunflower emoji
      case 'info':
      default:
        return '\ud83c\udf31' // Seedling emoji
    }
  }

  return (
    <div className={`toast toast-${type} ${isExiting ? 'toast-exit' : ''}`}>
      <div className="toast-icon">{getIcon()}</div>
      <div className="toast-content">
        <p className="toast-message">{message}</p>
      </div>
      <button className="toast-close" onClick={handleClose}>
        \u00d7
      </button>
      <div className="toast-progress">
        <div 
          className="toast-progress-bar" 
          style={{ animationDuration: `${duration}ms` }}
        />
      </div>
    </div>
  )
}

export function ToastContainer({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  )
}

export default Toast