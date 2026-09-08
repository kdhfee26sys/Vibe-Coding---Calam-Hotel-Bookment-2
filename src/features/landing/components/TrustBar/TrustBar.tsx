import React from 'react';
import { Building2, Sparkles, Compass, Hotel, Landmark } from 'lucide-react';
import styles from './TrustBar.module.css';

const PROPERTY_CATEGORIES = [
  { icon: Hotel, label: 'Boutique Hotels' },
  { icon: Sparkles, label: 'Luxury Resorts' },
  { icon: Compass, label: 'Private Villas' },
  { icon: Building2, label: 'Independent Hotels' },
  { icon: Landmark, label: 'Hospitality Groups' },
];

export const TrustBar: React.FC = () => {
  return (
    <section className={styles.trustSection}>
      <div className={styles.container}>
        <p className={styles.trustHeadline}>
          Engineered for modern hospitality teams & boutique property operators
        </p>

        <div className={styles.categoriesGrid}>
          {PROPERTY_CATEGORIES.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className={styles.categoryItem}>
                <div className={styles.iconCircle}>
                  <Icon size={18} />
                </div>
                <span className={styles.categoryLabel}>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
