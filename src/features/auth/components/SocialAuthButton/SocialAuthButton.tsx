import React, { ButtonHTMLAttributes } from 'react';
import styles from './SocialAuthButton.module.css';

export interface SocialAuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  provider: 'google' | 'apple';
  loading?: boolean;
  actionText?: string;
}

export const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({
  provider,
  loading = false,
  actionText,
  disabled,
  className = '',
  onClick,
  ...props
}) => {
  const isGoogle = provider === 'google';
  const defaultText = isGoogle ? 'Continue with Google' : 'Continue with Apple';
  const labelText = actionText || defaultText;

  return (
    <button
      type="button"
      className={`${styles.button} ${styles[provider]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      aria-label={loading ? `Signing in with ${isGoogle ? 'Google' : 'Apple'}...` : labelText}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <>
          <div className={styles.spinner} role="status" aria-label="Loading" />
          <span className={styles.label}>Connecting...</span>
        </>
      ) : (
        <>
          <span className={styles.iconWrapper}>
            {isGoogle ? (
              /* Official Google 4-color G Icon */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  fill="#EA4335"
                />
              </svg>
            ) : (
              /* Official Apple Logo SVG */
              <svg width="18" height="18" viewBox="0 0 170 170" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.7-11.64-13.98-6.19-9.57-11.05-20.73-14.59-33.48-3.53-12.75-5.3-24.87-5.3-36.36 0-14.89 3.69-27.18 11.07-36.88 7.38-9.7 16.7-14.65 27.97-14.86 4.9 0 10.45 1.34 16.65 4.02 6.2 2.68 10.12 4.09 11.75 4.22 1.3.13 5.48-1.44 12.53-4.71 7.05-3.27 13.06-4.66 18.04-4.17 13.48.87 23.95 5.76 31.42 14.67-11.74 7.07-17.5 16.75-17.29 29.04.22 9.58 3.86 17.52 10.92 23.83 7.07 6.31 15.35 10.02 24.84 11.13-2.17 6.53-4.78 12.87-7.82 19.01zM119.22 33.15c0-7.39 2.66-14.34 7.97-20.85 5.32-6.52 11.85-10.82 19.61-12.92.54 1.74.82 3.48.82 5.22 0 7.39-2.77 14.5-8.31 21.32-5.54 6.82-12.18 11.19-19.92 13.1-.11-1.96-.17-3.92-.17-5.87z" />
              </svg>
            )}
          </span>
          <span className={styles.label}>{labelText}</span>
        </>
      )}
    </button>
  );
};
