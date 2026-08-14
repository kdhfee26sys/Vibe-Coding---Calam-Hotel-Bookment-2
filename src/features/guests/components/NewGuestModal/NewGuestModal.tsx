import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../../../components/design-system/Button/Button';
import styles from './NewGuestModal.module.css';

interface NewGuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGuest: (guestData: any) => void;
}

export const NewGuestModal: React.FC<NewGuestModalProps> = ({ isOpen, onClose, onAddGuest }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    isVip: false
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    onAddGuest({
      id: `G-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      isVip: formData.isVip,
      stays: 0,
      totalSpent: 'Rp 0'
    });
    
    // Reset and close
    setFormData({
      name: '',
      email: '',
      phone: '',
      country: '',
      isVip: false
    });
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div 
        className={`${styles.modalContent} animate-pop-in`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Add New Guest</h2>
          <button className={styles.closeButton} onClick={onClose} type="button">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.modalBody}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Full Name</label>
              <input 
                type="text" 
                name="name"
                className={styles.input}
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.row}>
              <div className={`${styles.formGroup} ${styles.col}`}>
                <label className={styles.label}>Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  className={styles.input}
                  placeholder="e.g. john@mail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={`${styles.formGroup} ${styles.col}`}>
                <label className={styles.label}>Phone Number</label>
                <input 
                  type="text" 
                  name="phone"
                  className={styles.input}
                  placeholder="e.g. +62 812-..."
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Country</label>
              <input 
                type="text" 
                name="country"
                className={styles.input}
                placeholder="e.g. Indonesia"
                value={formData.country}
                onChange={handleChange}
              />
            </div>

            <label className={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                name="isVip"
                className={styles.checkbox}
                checked={formData.isVip}
                onChange={handleChange}
              />
              Mark as VIP Guest
            </label>
          </div>

          <div className={styles.modalFooter}>
            <Button variant="secondary" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Guest
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
