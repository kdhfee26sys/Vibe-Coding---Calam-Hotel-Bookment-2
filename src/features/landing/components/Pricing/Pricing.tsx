import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import styles from './Pricing.module.css';

const TIERS = [
  {
    id: 'starter',
    name: 'STARTER',
    rooms: '1 – 15 rooms',
    desc: 'For boutique villas, private guesthouses, and bed & breakfasts.',
    priceMonthly: 'Rp 450.000',
    priceAnnual: 'Rp 360.000',
    period: '/ property / month',
    badge: null,
    isPopular: false,
    ctaText: 'Start Free Trial',
    ctaAction: '/register',
    features: [
      'Reservation Calendar (Daily & Weekly)',
      'Booking Management & Status Tracking',
      'Front Desk Check-in & Check-out',
      'Room Inventory Management',
      'Basic Executive Dashboard',
      'Direct Direct Booking Entry',
      'Single User Login',
    ],
  },
  {
    id: 'pro',
    name: 'PRO',
    rooms: '16 – 50 rooms',
    desc: 'For growing boutique hotels, luxury resorts, and villa clusters.',
    priceMonthly: 'Rp 1.250.000',
    priceAnnual: 'Rp 990.000',
    period: '/ property / month',
    badge: 'MOST POPULAR',
    isPopular: true,
    ctaText: 'Start Free 14-Day Trial',
    ctaAction: '/register',
    features: [
      'Everything in Starter, plus:',
      'Live Housekeeping Board & Status Sync',
      'Payment Center & Invoicing (QRIS, Cards, Bank)',
      'Review Management & Quick Reply Templates',
      'Guest CRM & VIP Preferences History',
      '12-Month Full-Year Calendar Timeline Jumper',
      'Role-Based Staff Access (Up to 15 staff)',
      'One-Click Financial & Guest CSV Exports',
      'Executive Analytics & Revenue Trends',
    ],
  },
  {
    id: 'enterprise',
    name: 'ENTERPRISE',
    rooms: '50+ rooms / Multi-Property',
    desc: 'For hotel chains, luxury resorts, and multi-property hospitality groups.',
    priceMonthly: 'Custom',
    priceAnnual: 'Custom',
    period: 'tailored to your portfolio',
    badge: 'CUSTOM SCALE',
    isPopular: false,
    ctaText: 'Talk to Sales',
    ctaAction: '/register',
    features: [
      'Everything in Pro, plus:',
      'Multi-Property Portfolio Management',
      'Custom Channel Manager & PMS API Access',
      'Unlimited Staff Logins & Custom Role Builder',
      'Dedicated Account Manager & On-Site Setup',
      '99.99% Enterprise Uptime SLA',
      'Custom Security Audits & Data Migration Assistance',
    ],
  },
];

export const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const navigate = useNavigate();

  return (
    <section className={styles.pricingSection} id="pricing">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Transparent Pricing</span>
          <h2 className={styles.title}>Simple pricing. No unnecessary complexity.</h2>
          <p className={styles.subtitle}>
            Start small with a 14-day free trial. Scale seamlessly as your room inventory grows.
          </p>

          {/* Billing Switch */}
          <div className={styles.billingToggleWrapper}>
            <button
              className={`${styles.billingToggleBtn} ${!isAnnual ? styles.billingActive : ''}`}
              onClick={() => setIsAnnual(false)}
            >
              Monthly Billing
            </button>
            <button
              className={`${styles.billingToggleBtn} ${isAnnual ? styles.billingActive : ''}`}
              onClick={() => setIsAnnual(true)}
            >
              Annual Billing
              <span className={styles.saveBadge}>Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className={styles.pricingGrid}>
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`${styles.pricingCard} ${tier.isPopular ? styles.popularCard : ''}`}
            >
              {tier.badge && (
                <div className={styles.cardBadge}>
                  <Sparkles size={13} />
                  <span>{tier.badge}</span>
                </div>
              )}

              <div className={styles.cardHeader}>
                <span className={styles.tierName}>{tier.name}</span>
                <span className={styles.roomCapacity}>{tier.rooms}</span>
                <p className={styles.tierDesc}>{tier.desc}</p>
              </div>

              <div className={styles.priceRow}>
                <span className={styles.priceValue}>
                  {isAnnual ? tier.priceAnnual : tier.priceMonthly}
                </span>
                <span className={styles.pricePeriod}>{tier.period}</span>
              </div>

              <button
                onClick={() => navigate(tier.ctaAction)}
                className={`${styles.ctaBtn} ${tier.isPopular ? styles.popularCta : ''}`}
              >
                <span>{tier.ctaText}</span>
                <ArrowRight size={15} />
              </button>

              <div className={styles.featuresList}>
                <span className={styles.featuresHeader}>INCLUDED CAPABILITIES:</span>
                {tier.features.map((feat, fIdx) => (
                  <div key={fIdx} className={styles.featureItem}>
                    <div className={styles.checkCircle}>
                      <Check size={13} />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
