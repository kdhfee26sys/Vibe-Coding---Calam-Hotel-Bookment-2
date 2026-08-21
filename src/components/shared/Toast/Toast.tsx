import React, { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import styles from './Toast.module.css';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  variant?: 'success' | 'neutral';
  actionText?: string;
  onAction?: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  isVisible, 
  onClose, 
  variant = 'success',
  actionText,
  onAction,
  duration = 3000
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  if (!isVisible) return null;

  return (
    <div className={styles.toastContainer}>
      <div className={`${styles.toast} ${variant === 'neutral' ? styles.toastNeutral : styles.toastSuccess}`}>
        {variant === 'success' && (
          <CheckCircle2 className={styles.icon} size={20} fill="var(--color-utility-utility-color-utility-success-600)" color="#ffffff" />
        )}
        <span className={`${styles.message} ${variant === 'neutral' ? styles.messageNeutral : styles.messageSuccess}`}>
          {message}
        </span>
        {actionText && onAction && (
          <button 
            className={styles.actionButton} 
            onClick={() => {
              onAction();
              onClose();
            }}
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
};
