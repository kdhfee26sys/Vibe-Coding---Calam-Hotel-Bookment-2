import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../../../components/design-system/Button/Button';
import { Select } from '../../../../components/design-system/Select/Select';
import styles from './NewStaffModal.module.css';

interface NewStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStaff: (staffData: any) => void;
}

export const NewStaffModal: React.FC<NewStaffModalProps> = ({ isOpen, onClose, onAddStaff }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Receptionist');
  const [shift, setShift] = useState('Pagi');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    onAddStaff({
      id: Date.now().toString(),
      name,
      email,
      role,
      shift,
      status: 'Aktif'
    });
    
    // Reset and close
    setName('');
    setEmail('');
    setRole('Receptionist');
    setShift('Pagi');
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div 
        className={`${styles.modalContent} animate-pop-in`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Add New Staff</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.modalBody}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Full Name</label>
              <input 
                type="text" 
                className={styles.input}
                placeholder="e.g. John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Email Address</label>
              <input 
                type="email" 
                className={styles.input}
                placeholder="e.g. john@calam.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Role</label>
              <Select 
                options={['Manager', 'Receptionist', 'Housekeeping', 'Finance', 'Marketing']}
                value={role}
                onChange={setRole}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Shift</label>
              <Select 
                options={['Pagi', 'Siang', 'Malam', '-']}
                value={shift}
                onChange={setShift}
              />
            </div>
          </div>

          <div className={styles.modalFooter}>
            <Button variant="secondary" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add Staff
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
