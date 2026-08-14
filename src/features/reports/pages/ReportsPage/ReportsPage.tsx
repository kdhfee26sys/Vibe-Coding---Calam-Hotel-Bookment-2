import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { GenerateReportModal } from '../../components/GenerateReportModal/GenerateReportModal';
import { Button } from '../../../../components/design-system/Button/Button';
import styles from './ReportsPage.module.css';

interface ReportTemplate {
  id: string;
  title: string;
  description: string;
}

const mockReports: ReportTemplate[] = [
  {
    id: 'REP-01',
    title: 'Occupancy Report',
    description: 'Daily & monthly occupancy rates'
  },
  {
    id: 'REP-02',
    title: 'Revenue Report',
    description: 'Revenue, ADR, RevPAR per period'
  },
  {
    id: 'REP-03',
    title: 'Housekeeping Report',
    description: 'Productivity and room status'
  },
  {
    id: 'REP-04',
    title: 'Tax Report',
    description: 'VAT and service charge recap'
  },
  {
    id: 'REP-05',
    title: 'Guest Report',
    description: 'Profile and repeat guests'
  },
  {
    id: 'REP-06',
    title: 'Promotion Report',
    description: 'Promo code performance'
  }
];

export const ReportsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>Reports Center</h1>
          <p className={styles.subtitle}>Choose a report template and download by period.</p>
        </div>
        <div className={styles.actionArea}>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            Generate Report
          </Button>
        </div>
      </header>

      <div className={`${styles.filterCard} animate-pop-in`}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>From date</label>
          <input type="date" className={styles.filterInput} />
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>To date</label>
          <input type="date" className={styles.filterInput} />
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Format</label>
          <select className={styles.filterSelect}>
            <option>PDF</option>
            <option>Excel</option>
            <option>CSV</option>
          </select>
        </div>
      </div>

      <div className={`${styles.grid} animate-pop-in`} style={{ animationDelay: '0.1s' }}>
        {mockReports.map((report) => (
          <div key={report.id} className={styles.reportCard}>
            <div className={styles.iconWrapper}>
              <FileText size={20} />
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{report.title}</h3>
              <p className={styles.cardDesc}>{report.description}</p>
            </div>
            <div className={styles.cardActions}>
              <Button variant="primary">Download</Button>
              <Button variant="secondary">Schedule</Button>
            </div>
          </div>
        ))}
      </div>

      <GenerateReportModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
