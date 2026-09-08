import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import styles from './FinalCTA.module.css';

export const FinalCTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.ctaSection}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.ambientGlow} />

          <div className={styles.badge}>
            <Sparkles size={14} />
            <span>Ready to Modernize Your Hotel?</span>
          </div>

          <h2 className={styles.headline}>
            Run your hotel the modern way.
          </h2>

          <p className={styles.description}>
            Join the forward-thinking boutique hotel and resort operators saving hours every day, eliminating double-bookings, and delighting their guests with Calam.
          </p>

          <div className={styles.actions}>
            <button onClick={() => navigate('/register')} className={styles.primaryBtn}>
              <span>Start Free 14-Day Trial</span>
              <ArrowRight size={16} />
            </button>
            <button 
              onClick={() => {
                const el = document.getElementById('showcase');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }} 
              className={styles.secondaryBtn}
            >
              Explore Interactive Preview
            </button>
          </div>

          <div className={styles.guarantees}>
            <div className={styles.guaranteeItem}>
              <CheckCircle2 size={15} className={styles.checkIcon} />
              <span>No credit card required</span>
            </div>
            <div className={styles.guaranteeDot}>•</div>
            <div className={styles.guaranteeItem}>
              <CheckCircle2 size={15} className={styles.checkIcon} />
              <span>Setup in 5 minutes</span>
            </div>
            <div className={styles.guaranteeDot}>•</div>
            <div className={styles.guaranteeItem}>
              <CheckCircle2 size={15} className={styles.checkIcon} />
              <span>Full feature access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
