import React from 'react';
import { ShieldCheck, KeyRound, Globe2, Moon, Lock } from 'lucide-react';
import styles from './SecuritySection.module.css';

export const SecuritySection: React.FC = () => {
  return (
    <section className={styles.secSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Control & Security</span>
          <h2 className={styles.title}>Powerful enough for your business. Simple enough for your team.</h2>
          <p className={styles.subtitle}>
            Enterprise-grade security controls and multi-role governance designed to keep your hotel operations smooth and protected.
          </p>
        </div>

        <div className={styles.secGrid}>
          {/* Card 1: RBAC */}
          <div className={styles.secCard}>
            <div className={styles.iconCircle}>
              <KeyRound size={22} className={styles.iconBrand} />
            </div>
            <h3 className={styles.secTitle}>Role-Based Access Control</h3>
            <p className={styles.secDesc}>
              Give every team member exactly the permissions they need without exposing sensitive owner revenue data or audit logs.
            </p>
            <div className={styles.badgeGroup}>
              <span className={styles.rolePill}>Owner</span>
              <span className={styles.rolePill}>Manager</span>
              <span className={styles.rolePill}>Receptionist</span>
              <span className={styles.rolePill}>Housekeeping</span>
              <span className={styles.rolePill}>Finance</span>
              <span className={styles.rolePill}>Marketing</span>
            </div>
          </div>

          {/* Card 2: Auth */}
          <div className={styles.secCard}>
            <div className={styles.iconCircle}>
              <ShieldCheck size={22} className={styles.iconGreen} />
            </div>
            <h3 className={styles.secTitle}>Multi-Provider Cloud Auth</h3>
            <p className={styles.secDesc}>
              Sign in securely with one click using Google Workspace, Apple ID, or standard email authentication powered by Firebase.
            </p>
            <div className={styles.authBadgesRow}>
              <div className={styles.authPill}>
                <svg className={styles.googleIcon} viewBox="0 0 24 24" width="16" height="16">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Google Sign-In</span>
              </div>
              <div className={styles.authPill}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.88c.64-.78 1.08-1.86.96-2.95-1 .04-2.16.66-2.83 1.44-.59.67-1.11 1.77-.97 2.83 1.12.09 2.2-.55 2.84-1.32Z"/>
                </svg>
                <span>Apple Sign-In</span>
              </div>
            </div>
          </div>

          {/* Card 3: Localization */}
          <div className={styles.secCard}>
            <div className={styles.iconCircle}>
              <Globe2 size={22} className={styles.iconBlue} />
            </div>
            <h3 className={styles.secTitle}>Localization & Timezones</h3>
            <p className={styles.secDesc}>
              Bilingual support for Bahasa Indonesia and English, with localized timezones (WIB, WITA, WIT) and instant Dark / Light theme toggles.
            </p>
            <div className={styles.localeRow}>
              <span className={styles.localePill}>🇮🇩 Bahasa Indonesia</span>
              <span className={styles.localePill}>🇬🇧 English</span>
              <span className={styles.localePill}>WIB · WITA · WIT</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
