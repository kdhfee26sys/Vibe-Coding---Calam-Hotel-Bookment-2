import React from 'react';
import { Crown, UserCheck, Shield, Sparkles, CreditCard, HeartHandshake } from 'lucide-react';
import styles from './RoleSolutions.module.css';

const ROLES = [
  {
    icon: Crown,
    role: 'Hotel Owner',
    headline: 'See the business clearly.',
    desc: 'Real-time birds-eye view of revenue, occupancy rate, ADR, and net operating profit from any desktop or mobile device.',
    color: '#8A5DFF',
  },
  {
    icon: Shield,
    role: 'General Manager',
    headline: 'Run operations with confidence.',
    desc: 'Eliminate departmental friction. Keep front desk, housekeeping, finance, and guest services aligned around a single source of truth.',
    color: '#006BFF',
  },
  {
    icon: UserCheck,
    role: 'Front Desk Team',
    headline: 'Move 3x faster at check-in.',
    desc: 'Quickly find reservations, verify guest IDs, assign room keys, and collect payments in under 30 seconds without tab-switching.',
    color: '#12B76A',
  },
  {
    icon: Sparkles,
    role: 'Housekeeping Staff',
    headline: 'Turn rooms faster & cleaner.',
    desc: 'Live floor-by-floor room statuses, priority flags for VIP arrivals waiting in the lobby, and instant turnover broadcasts.',
    color: '#F79008',
  },
  {
    icon: CreditCard,
    role: 'Finance & Accounting',
    headline: 'Reconcile without the chaos.',
    desc: 'Automated multi-method ledger for cash, credit cards, QRIS, bank transfers, and OTA virtual cards with instant tax invoices.',
    color: '#E04F16',
  },
  {
    icon: HeartHandshake,
    role: 'Guest Relations & Marketing',
    headline: 'Know your guests personally.',
    desc: 'Capture stay histories, guest preferences, VIP tags, and manage multi-channel OTA reviews with professional response templates.',
    color: '#7C3AED',
  },
];

export const RoleSolutions: React.FC = () => {
  return (
    <section className={styles.roleSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Role-Based Architecture</span>
          <h2 className={styles.title}>One platform. Every role.</h2>
          <p className={styles.subtitle}>
            Purpose-built workflows tailored for every member of your hospitality team.
          </p>
        </div>

        <div className={styles.roleGrid}>
          {ROLES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className={styles.roleCard}>
                <div className={styles.iconCircle} style={{ color: item.color }}>
                  <Icon size={22} />
                </div>
                <span className={styles.roleTag}>{item.role}</span>
                <h3 className={styles.roleHeadline}>{item.headline}</h3>
                <p className={styles.roleDesc}>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
