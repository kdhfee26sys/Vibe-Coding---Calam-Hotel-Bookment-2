import React, { useState } from 'react';
import { X, Filter } from 'lucide-react';
import { Button } from '../../../../components/design-system/Button/Button';
import { Select } from '../../../../components/design-system/Select/Select';
import styles from './FilterBookingsModal.module.css';

interface FilterState {
  status: string;
  payment: string;
  roomType: string;
  source: string;
}

interface FilterBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  currentFilters: FilterState;
}

export const FilterBookingsModal: React.FC<FilterBookingsModalProps> = ({ 
  isOpen, 
  onClose, 
  onApply,
  currentFilters
}) => {
  const [filters, setFilters] = useState<FilterState>(currentFilters);

  // Sync state when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setFilters(currentFilters);
    }
  }, [isOpen, currentFilters]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    const defaultFilters = { status: 'All', payment: 'All', roomType: 'All', source: 'All' };
    setFilters(defaultFilters);
    onApply(defaultFilters);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div 
        className={`${styles.modalContent} animate-pop-in`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Advanced Filters</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.modalBody}>
            <div className={styles.row}>
              <div className={styles.formGroup} style={{ flex: 1 }}>
                <label className={styles.label}>Booking Status</label>
                <Select 
                  options={['All', 'Confirmed', 'Pending', 'Checked-in', 'Checked-out']}
                  value={filters.status}
                  onChange={(val) => setFilters(prev => ({ ...prev, status: val }))}
                />
              </div>
              <div className={styles.formGroup} style={{ flex: 1 }}>
                <label className={styles.label}>Payment Status</label>
                <Select 
                  options={['All', 'Paid', 'Unpaid', 'Partial']}
                  value={filters.payment}
                  onChange={(val) => setFilters(prev => ({ ...prev, payment: val }))}
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup} style={{ flex: 1 }}>
                <label className={styles.label}>Room Type</label>
                <Select 
                  options={['All', 'Standard', 'Deluxe', 'Suite']}
                  value={filters.roomType}
                  onChange={(val) => setFilters(prev => ({ ...prev, roomType: val }))}
                />
              </div>
              <div className={styles.formGroup} style={{ flex: 1 }}>
                <label className={styles.label}>Source</label>
                <Select 
                  options={['All', 'Website', 'Traveloka', 'Booking.com', 'Walk-in']}
                  value={filters.source}
                  onChange={(val) => setFilters(prev => ({ ...prev, source: val }))}
                />
              </div>
            </div>
          </div>

          <div className={styles.modalFooter}>
            <Button variant="secondary" onClick={handleReset} type="button">
              Clear All
            </Button>
            <Button variant="primary" type="submit">
              Apply Filters
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
