import React, { useState } from 'react';
import { Modal } from '../../../../components/shared/Modal/Modal';
import { Button } from '../../../../components/design-system/Button/Button';
import styles from './NewRoomModal.module.css';

interface NewRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRoomAdded: (roomData: any) => void;
}

export const NewRoomModal: React.FC<NewRoomModalProps> = ({ isOpen, onClose, onRoomAdded }) => {
  const [formData, setFormData] = useState({
    id: '',
    floor: '',
    type: 'Standard',
    status: 'Available',
    housekeeping: 'Clean',
    price: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newRoom = {
        ...formData,
        floor: Number(formData.floor) || 1,
        // Make sure price has correct format if empty, but we rely on user input
        price: formData.price.startsWith('Rp') ? formData.price : `Rp ${formData.price}/Night`
      };
      
      onRoomAdded(newRoom);
      onClose();
      // Reset form
      setFormData({
        id: '',
        floor: '',
        type: 'Standard',
        status: 'Available',
        housekeeping: 'Clean',
        price: ''
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Room">
      <form onSubmit={handleSubmit} className={styles.form}>
        
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="id">Room Number</label>
            <input 
              type="text" 
              id="id"
              name="id"
              required 
              value={formData.id}
              onChange={handleChange}
              placeholder="e.g. 401"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="floor">Floor</label>
            <input 
              type="number" 
              id="floor"
              name="floor"
              required 
              value={formData.floor}
              onChange={handleChange}
              placeholder="e.g. 4"
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="type">Room Type</label>
            <select name="type" id="type" value={formData.type} onChange={handleChange}>
              <option value="Standard">Standard</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="status">Room Status</label>
            <select name="status" id="status" value={formData.status} onChange={handleChange}>
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Dirty">Dirty</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="housekeeping">Housekeeping Status</label>
            <select name="housekeeping" id="housekeeping" value={formData.housekeeping} onChange={handleChange}>
              <option value="Clean">Clean</option>
              <option value="Dirty">Dirty</option>
              <option value="In Progress">In Progress</option>
              <option value="Inspected">Inspected</option>
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="price">Price per Night</label>
          <input 
            type="text" 
            id="price"
            name="price"
            required 
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g. 750.000"
          />
        </div>

        <div className={styles.actions}>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Room'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
