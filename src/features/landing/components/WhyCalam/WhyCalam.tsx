import React from 'react';
import { Check, X, Sparkles } from 'lucide-react';
import styles from './WhyCalam.module.css';

const COMPARISON_ROWS = [
  {
    feature: 'User Interface & Navigation',
    legacy: 'Cluttered 2000s desktop UI, slow page reloads, complex nested menus',
    calam: 'Ultra-fast Single Page App (SPA), zero clutter, sleek modern dark/light mode',
  },
  {
    feature: 'Data & System Synchronization',
    legacy: 'Disconnected tools requiring manual export/import between spreadsheets',
    calam: 'Unified real-time engine linking front desk, calendar, rooms & payments',
  },
  {
    feature: 'Housekeeping Communication',
    legacy: 'Manual phone calls, walkie-talkies, and unorganized WhatsApp groups',
    calam: 'Live 4-state room board with instant front-desk turnover broadcasts',
  },
  {
    feature: 'Guest Check-In Speed',
    legacy: '3 to 5 minutes searching across tabs and verifying paper folios',
    calam: '<30 seconds instant search, ID verification, and digital key status',
  },
  {
    feature: 'Payment Reconciliation',
    legacy: 'Manual end-of-month detective work matching cash, cards & slips',
    calam: 'Centralized multi-channel ledger (QRIS, Cards, Transfers, OTA Cards)',
  },
  {
    feature: 'Device Compatibility',
    legacy: 'Installed only on bulky front-desk PCs with local server requirements',
    calam: 'Cloud-native, works seamlessly on desktop PCs, laptops, and iPads',
  },
  {
    feature: 'Staff Training Time',
    legacy: '2 to 3 weeks of intensive training with thick software manuals',
    calam: '<15 minutes onboarding with consumer-grade intuitive UX',
  },
];

export const WhyCalam: React.FC = () => {
  return (
    <section className={styles.whySection} id="solutions">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>The Modern Standard</span>
          <h2 className={styles.title}>Built differently from legacy PMS.</h2>
          <p className={styles.subtitle}>
            See why forward-thinking boutique hotels and resorts are replacing outdated legacy software with Calam.
          </p>
        </div>

        {/* Comparison Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thFeature}>Operational Capability</th>
                <th className={styles.thLegacy}>Legacy Hotel Software</th>
                <th className={styles.thCalam}>
                  <div className={styles.calamThHeader}>
                    <Sparkles size={16} />
                    <span>Calam PMS</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, idx) => (
                <tr key={idx} className={styles.tr}>
                  <td className={styles.tdFeature}>{row.feature}</td>
                  <td className={styles.tdLegacy}>
                    <div className={styles.cellContent}>
                      <div className={styles.xCircle}>
                        <X size={14} />
                      </div>
                      <span>{row.legacy}</span>
                    </div>
                  </td>
                  <td className={styles.tdCalam}>
                    <div className={styles.cellContent}>
                      <div className={styles.checkCircle}>
                        <Check size={14} />
                      </div>
                      <span className={styles.calamText}>{row.calam}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Closing Statement */}
        <div className={styles.closingBanner}>
          <p className={styles.closingText}>
            <strong>Your team shouldn't need a manual to run their hotel.</strong> Experience the difference of software built for speed.
          </p>
        </div>
      </div>
    </section>
  );
};
