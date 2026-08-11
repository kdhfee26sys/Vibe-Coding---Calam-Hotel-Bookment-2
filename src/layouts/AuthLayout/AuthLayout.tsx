import React, { ReactNode } from 'react';
import styles from './AuthLayout.module.css';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      {/* Left Side - Hero Background */}
      <div className={styles.heroSection}>
        <div className={styles.overlay}></div>
        
        <div className={styles.heroContentWrapper}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Calam.</h1>
            <h2 className={styles.subtitle}>One dashboard to manage every stay.</h2>
          </div>
        </div>
      </div>

      {/* Right Side - Form Container */}
      <div className={styles.formSection}>
        {children}
      </div>
    </div>
  );
};
