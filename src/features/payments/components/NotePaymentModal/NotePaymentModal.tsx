import React, { useState } from 'react';
import { Modal } from '../../../../components/shared/Modal/Modal';
import { Button } from '../../../../components/design-system/Button/Button';
import styles from './NotePaymentModal.module.css';

export interface NotePaymentData {
  bookingId: string;
  guest: string;
  method: string;
  date: string;
  status: 'Paid' | 'Partial' | 'Refunded' | 'Unpaid';
  amount: string;
}

interface NotePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentAdded: (payment: NotePaymentData) => void;
}

export const NotePaymentModal: React.FC<NotePaymentModalProps> = ({ isOpen, onClose, onPaymentAdded }) => {
  const [formData, setFormData] = useState<NotePaymentData>({
    bookingId: '',
    guest: '',
    method: 'Bank Transfer',
    date: new Date().toISOString().split('T')[0],
    status: 'Paid',
    amount: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value as any }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      onPaymentAdded(formData);
      onClose();
      // Reset form
      setFormData({
        bookingId: '',
        guest: '',
        method: 'Bank Transfer',
        date: new Date().toISOString().split('T')[0],
        status: 'Paid',
        amount: ''
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Note Payment">
      <form onSubmit={handleSubmit} className={styles.form}>
        
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="bookingId">Booking ID</label>
            <input 
              type="text" 
              id="bookingId"
              name="bookingId"
              required 
              value={formData.bookingId}
              onChange={handleChange}
              placeholder="e.g. BK-1050"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="guest">Guest Name</label>
            <input 
              type="text" 
              id="guest"
              name="guest"
              required 
              value={formData.guest}
              onChange={handleChange}
              placeholder="e.g. Budi Santoso"
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="method">Payment Method</label>
            <select name="method" id="method" value={formData.method} onChange={handleChange}>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Credit Card">Credit Card</option>
              <option value="QRIS">QRIS</option>
              <option value="Cash">Cash</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="date">Date</label>
            <input 
              type="date" 
              id="date"
              name="date"
              required 
              value={formData.date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="status">Status</label>
            <select name="status" id="status" value={formData.status} onChange={handleChange}>
              <option value="Paid">Paid</option>
              <option value="Partial">Partial</option>
              <option value="Refunded">Refunded</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="amount">Amount (Rp)</label>
            <input 
              type="text" 
              id="amount"
              name="amount"
              required 
              value={formData.amount}
              onChange={handleChange}
              placeholder="e.g. Rp 2.500.000"
            />
          </div>
        </div>

        <div className={styles.actions}>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Payment'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
