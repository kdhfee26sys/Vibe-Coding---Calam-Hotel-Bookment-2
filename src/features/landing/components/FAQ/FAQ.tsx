import React, { useState } from 'react';
import { ChevronDown, Plus, Minus, HelpCircle } from 'lucide-react';
import styles from './FAQ.module.css';

const FAQS = [
  {
    q: 'Can I migrate my existing bookings from Excel or another PMS?',
    a: 'Yes, absolutely. Calam provides standardized CSV import templates for guest profiles, existing room configurations, and upcoming reservations. Our onboarding team can also assist you with historical data migration without operational downtime.',
  },
  {
    q: 'Does Calam support Indonesian payment methods like QRIS and bank transfers?',
    a: 'Yes. Calam is built specifically with native payment tracking for QRIS, Bank Transfers (BCA, Mandiri, BNI, BRI), Credit Cards, Cash, and OTA Virtual Cards. You can easily track partial deposits and generate automated tax invoices.',
  },
  {
    q: 'How long does it take to train front-desk staff?',
    a: 'Because Calam is designed with consumer-grade, intuitive UI/UX, most front desk agents and receptionists become fully proficient in under 15 minutes. No thick manuals or weeks of technical certification required.',
  },
  {
    q: 'Is my hotel data secure?',
    a: 'Yes. Calam utilizes enterprise Firebase Authentication (Google, Email), strict Role-Based Access Controls (RBAC), and SSL-encrypted database communication. Only authorized team members can view revenue and confidential guest data.',
  },
  {
    q: 'Can I access Calam on an iPad or tablet?',
    a: 'Yes! Calam is fully responsive and cloud-native. You can run front-desk check-ins, inspect rooms during housekeeping, or monitor revenue from iPads, Android tablets, laptops, and desktop workstations seamlessly.',
  },
  {
    q: 'Can different employees have different permissions?',
    a: 'Yes. Calam includes 6 predefined role tiers: Owner, General Manager, Receptionist, Housekeeping, Finance, and Marketing. Each role only sees the features and data necessary for their specific job.',
  },
];

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className={styles.faqSection} id="faq">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Got Questions?</span>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
          <p className={styles.subtitle}>
            Everything you need to know about Calam PMS, onboarding, and operations.
          </p>
        </div>

        <div className={styles.faqList}>
          {FAQS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className={`${styles.faqCard} ${isOpen ? styles.faqCardOpen : ''}`}>
                <button className={styles.faqQuestionBtn} onClick={() => toggle(idx)} aria-expanded={isOpen}>
                  <span className={styles.questionText}>{item.q}</span>
                  <div className={styles.iconCircle}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>
                {isOpen && (
                  <div className={`${styles.faqAnswer} animate-pop-in`}>
                    <p className={styles.answerText}>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
