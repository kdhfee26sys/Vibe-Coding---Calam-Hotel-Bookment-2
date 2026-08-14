import React, { useState } from 'react';
import { X, Download, Loader2 } from 'lucide-react';
import { Button } from '../../../../components/design-system/Button/Button';
import { Select } from '../../../../components/design-system/Select/Select';
import styles from './GenerateReportModal.module.css';

interface GenerateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GenerateReportModal: React.FC<GenerateReportModalProps> = ({ isOpen, onClose }) => {
  const [reportType, setReportType] = useState('Occupancy Report');
  const [format, setFormat] = useState('PDF');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Simulate generation time
    setTimeout(() => {
      setIsGenerating(false);
      onClose();
      // Assume a global toast would be called here in a real app
    }, 1500);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div 
        className={`${styles.modalContent} animate-pop-in`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Generate Report</h2>
          <button className={styles.closeButton} onClick={onClose} disabled={isGenerating}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleGenerate}>
          <div className={styles.modalBody}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Report Type</label>
              <Select 
                options={['Occupancy Report', 'Revenue Report', 'Housekeeping Report', 'Tax Report', 'Guest Report', 'Promotion Report']}
                value={reportType}
                onChange={setReportType}
              />
            </div>
            
            <div className={styles.row}>
              <div className={`${styles.formGroup} ${styles.col}`}>
                <label className={styles.label}>From Date</label>
                <input 
                  type="date" 
                  className={styles.input}
                  required
                />
              </div>
              <div className={`${styles.formGroup} ${styles.col}`}>
                <label className={styles.label}>To Date</label>
                <input 
                  type="date" 
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Format</label>
              <Select 
                options={['PDF', 'Excel', 'CSV']}
                value={format}
                onChange={setFormat}
              />
            </div>
          </div>

          <div className={styles.modalFooter}>
            <Button variant="secondary" onClick={onClose} type="button" disabled={isGenerating}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <Download size={16} /> Generate & Download
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
