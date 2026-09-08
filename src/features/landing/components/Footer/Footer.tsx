import React from 'react';
import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <div className={styles.logoGroup}>
              <div className={styles.logoIcon}>
                <Building2 size={18} color="#FFFFFF" />
              </div>
              <span className={styles.brandName}>CALAM</span>
            </div>
            <p className={styles.brandDesc}>
              The Modern Operating System for Next-Generation Hospitality. Unifying reservations, front desk, housekeeping, payments, and guest CRM.
            </p>
            <div className={styles.systemStatus}>
              <span className={styles.statusDot} />
              <span>All Systems Operational (99.99%)</span>
            </div>
          </div>

          {/* Links Columns */}
          <div className={styles.linksGrid}>
            <div className={styles.linksCol}>
              <span className={styles.colTitle}>Product</span>
              <a href="#showcase" className={styles.footerLink}>Reservation Calendar</a>
              <a href="#showcase" className={styles.footerLink}>Front Desk Hub</a>
              <a href="#showcase" className={styles.footerLink}>Housekeeping Board</a>
              <a href="#showcase" className={styles.footerLink}>Payment Center</a>
              <a href="#showcase" className={styles.footerLink}>Guest CRM</a>
              <a href="#showcase" className={styles.footerLink}>Review Inbox</a>
              <a href="#showcase" className={styles.footerLink}>Executive Analytics</a>
            </div>

            <div className={styles.linksCol}>
              <span className={styles.colTitle}>Solutions</span>
              <a href="#solutions" className={styles.footerLink}>Boutique Hotels</a>
              <a href="#solutions" className={styles.footerLink}>Luxury Resorts</a>
              <a href="#solutions" className={styles.footerLink}>Private Villas</a>
              <a href="#solutions" className={styles.footerLink}>Independent Hotels</a>
              <a href="#solutions" className={styles.footerLink}>Hospitality Groups</a>
            </div>

            <div className={styles.linksCol}>
              <span className={styles.colTitle}>Pricing & Access</span>
              <a href="#pricing" className={styles.footerLink}>Starter Plan</a>
              <a href="#pricing" className={styles.footerLink}>Pro Plan (Popular)</a>
              <a href="#pricing" className={styles.footerLink}>Enterprise</a>
              <Link to="/login" className={styles.footerLink}>Sign In to Dashboard</Link>
              <Link to="/register" className={styles.footerLink}>Start Free Trial</Link>
            </div>

            <div className={styles.linksCol}>
              <span className={styles.colTitle}>Support & Legal</span>
              <a href="#faq" className={styles.footerLink}>Help & FAQ</a>
              <span className={styles.footerLink}>Privacy Policy</span>
              <span className={styles.footerLink}>Terms of Service</span>
              <span className={styles.footerLink}>Security Standards</span>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className={styles.bottomRow}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Calam PMS. All rights reserved. Built for modern boutique hospitality.
          </p>
          <div className={styles.bottomLinks}>
            <span>English (US)</span>
            <span>•</span>
            <span>Bahasa Indonesia (ID)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
