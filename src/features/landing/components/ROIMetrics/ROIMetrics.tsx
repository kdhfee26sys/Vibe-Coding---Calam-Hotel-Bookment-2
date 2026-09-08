import React from 'react';
import styles from './ROIMetrics.module.css';

const METRICS = [
  { value: '70%', label: 'Faster Guest Check-In', sub: 'Average time reduced to <30 seconds' },
  { value: '0%', label: 'Double-Booking Errors', sub: 'Guaranteed synchronized room blocks' },
  { value: '+18%', label: 'Direct Booking Revenue', sub: 'Higher margins via direct portal' },
  { value: '4.9/5', label: 'Operational Efficiency', sub: 'Rated by boutique hotel managers' },
];

export const ROIMetrics: React.FC = () => {
  return (
    <section className={styles.roiSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Proven Operational Impact</span>
          <h2 className={styles.title}>Less admin. More time for hospitality.</h2>
          <p className={styles.subtitle}>
            When routine operations run automatically, your team can focus on what truly matters: delivering unforgettable guest experiences.
          </p>
        </div>

        <div className={styles.metricsGrid}>
          {METRICS.map((metric, index) => (
            <div key={index} className={styles.metricCard}>
              <span className={styles.metricValue}>{metric.value}</span>
              <span className={styles.metricLabel}>{metric.label}</span>
              <span className={styles.metricSub}>{metric.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
