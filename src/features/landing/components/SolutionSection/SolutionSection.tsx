import React from 'react';
import { Calendar, Bed, CreditCard, Users, Star, BarChart3, ArrowDown, Sparkles, CheckCircle2, Building2 } from 'lucide-react';
import styles from './SolutionSection.module.css';

const INCOMING_STREAMS = [
  { icon: Calendar, label: 'Bookings & OTAs', color: '#8A5DFF' },
  { icon: Bed, label: 'Housekeeping', color: '#12B76A' },
  { icon: CreditCard, label: 'Payments & QRIS', color: '#006BFF' },
  { icon: Users, label: 'Guest CRM', color: '#F79008' },
  { icon: Star, label: 'Reviews & Reputation', color: '#E04F16' },
  { icon: BarChart3, label: 'Financial Reports', color: '#7C3AED' },
];

export const SolutionSection: React.FC = () => {
  return (
    <section className={styles.solutionSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.badge}>Unified Architecture</span>
          <h2 className={styles.title}>One hotel. One source of truth.</h2>
          <p className={styles.subtitle}>
            Calam connects every part of your property operation in real time — from the moment a guest books to the moment they check out.
          </p>
        </div>

        {/* Visual Architecture Flow Diagram */}
        <div className={styles.diagramContainer}>
          {/* Top Sources Row */}
          <div className={styles.sourcesRow}>
            {INCOMING_STREAMS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className={styles.sourceCard}>
                  <div className={styles.sourceIcon} style={{ color: item.color }}>
                    <Icon size={18} />
                  </div>
                  <span className={styles.sourceLabel}>{item.label}</span>
                </div>
              );
            })}
          </div>

          {/* Flow Lines & Arrow */}
          <div className={styles.connectorArea}>
            <div className={styles.pulseLine} />
            <div className={styles.arrowCircle}>
              <ArrowDown size={18} />
            </div>
          </div>

          {/* Central Calam Engine */}
          <div className={styles.coreEngineCard}>
            <div className={styles.coreEngineGlow} />
            <div className={styles.coreHeader}>
              <div className={styles.coreLogo}>
                <Building2 size={24} color="#FFFFFF" />
              </div>
              <div className={styles.coreTitles}>
                <h3 className={styles.coreBrand}>CALAM PMS OPERATING ENGINE</h3>
                <span className={styles.coreLive}>Real-time synchronization across all screens & staff roles</span>
              </div>
            </div>
            <div className={styles.corePillars}>
              <div className={styles.pillarItem}>
                <CheckCircle2 size={16} className={styles.pillarCheck} />
                <span>Zero Double Bookings</span>
              </div>
              <div className={styles.pillarItem}>
                <CheckCircle2 size={16} className={styles.pillarCheck} />
                <span>Live Housekeeping Broadcast</span>
              </div>
              <div className={styles.pillarItem}>
                <CheckCircle2 size={16} className={styles.pillarCheck} />
                <span>Unified Multi-Method Ledger</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
