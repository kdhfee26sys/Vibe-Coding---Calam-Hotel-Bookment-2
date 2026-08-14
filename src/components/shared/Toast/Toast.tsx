import React, { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import styles from './Toast.module.css';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  variant?: 'success' | 'neutral';
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose, variant = 'success' }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

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
      </div>
    </div>
  );
};
