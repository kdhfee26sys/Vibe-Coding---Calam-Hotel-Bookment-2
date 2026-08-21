import React, { useState } from 'react';
import { Modal } from '../../../../components/shared/Modal/Modal';
import { Button } from '../../../../components/design-system/Button/Button';
import styles from './NewBookingModal.module.css';

interface NewBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingAdded: (bookingData: any) => void;
  bookingToEdit?: any | null;
}

export const NewBookingModal: React.FC<NewBookingModalProps> = ({ isOpen, onClose, onBookingAdded, bookingToEdit }) => {
  const [formData, setFormData] = useState({
    guestName: '',
    room: '101 · Standard',
    checkIn: '',
    checkOut: '',
    source: 'Website',
    status: 'Pending',
    payment: 'Unpaid',
    total: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // When modal opens or bookingToEdit changes, update the form
  React.useEffect(() => {
    if (isOpen) {
      if (bookingToEdit) {
        setFormData({
          guestName: bookingToEdit.guestName,
          room: bookingToEdit.room,
          checkIn: bookingToEdit.checkIn,
          checkOut: bookingToEdit.checkOut,
          source: bookingToEdit.source,
          status: bookingToEdit.status,
          payment: bookingToEdit.payment,
          total: bookingToEdit.total.replace(/\D/g, '') // remove "Rp " and dots
        });
      } else {
        // Reset form for new booking
        setFormData({
          guestName: '',
          room: '101 · Standard',
          checkIn: '',
          checkOut: '',
          source: 'Website',
          status: 'Pending',
          payment: 'Unpaid',
          total: ''
        });
      }
    }
  }, [isOpen, bookingToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const isEdit = !!bookingToEdit;
      const url = isEdit ? `http://localhost:3000/api/bookings/${bookingToEdit.id}` : 'http://localhost:3000/api/bookings';
      
      const response = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const savedBooking = await response.json();
        onBookingAdded(savedBooking); // works for both add and edit
        onClose();
      } else {
        console.error('Failed to save booking');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={bookingToEdit ? "Edit Booking" : "New Booking"}>
      <form onSubmit={handleSubmit} className={styles.form}>
        
        <div className={styles.formGroup}>
          <label htmlFor="guestName">Guest Name</label>
          <input 
            type="text" 
            id="guestName"
            name="guestName"
            required 
            value={formData.guestName}
            onChange={handleChange}
            placeholder="e.g. John Doe"
          />
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="checkIn">Check-in Date</label>
            <input 
              type="date" 
              id="checkIn"
              name="checkIn"
              required 
              value={formData.checkIn}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="checkOut">Check-out Date</label>
            <input 
              type="date" 
              id="checkOut"
              name="checkOut"
              required 
              value={formData.checkOut}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="room">Room Type</label>
            <select name="room" id="room" value={formData.room} onChange={handleChange}>
              <option value="101 · Standard">101 · Standard</option>
              <option value="203 · Deluxe">203 · Deluxe</option>
              <option value="301 · Suite">301 · Suite</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="source">Booking Source</label>
            <select name="source" id="source" value={formData.source} onChange={handleChange}>
              <option value="Website">Website</option>
              <option value="Traveloka">Traveloka</option>
              <option value="Booking.com">Booking.com</option>
              <option value="Walk-in">Walk-in</option>
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="status">Status</label>
            <select name="status" id="status" value={formData.status} onChange={handleChange}>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Checked-in">Checked-in</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="payment">Payment</label>
            <select name="payment" id="payment" value={formData.payment} onChange={handleChange}>
              <option value="Unpaid">Unpaid</option>
              <option value="Partial">Partial</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="total">Total Amount (Rp)</label>
          <input 
            type="text" 
            id="total"
            name="total"
            required 
            value={formData.total}
            onChange={handleChange}
            placeholder="e.g. 1500000"
          />
        </div>

        <div className={styles.actions}>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : bookingToEdit ? 'Update Booking' : 'Save Booking'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
