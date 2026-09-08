import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Building2, Mail, Key, AlertCircle } from 'lucide-react';
import { Input } from '../../../../components/design-system/Input/Input';
import { Button } from '../../../../components/design-system/Button/Button';
import { SocialAuthButton } from '../SocialAuthButton/SocialAuthButton';
import { useAuth } from '../../hooks/useAuth';
import styles from './LoginForm.module.css';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const {
    signInWithGoogle,
    signInWithEmail,
    actionLoading,
    error: authError,
    clearError,
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = (location.state as any)?.from?.pathname || '/dashboard';

  const handleGoogleSignIn = async () => {
    try {
      setLocalError(null);
      await signInWithGoogle();
      navigate(redirectPath, { replace: true });
    } catch {
      // Error handled by AuthContext
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setLocalError('Please enter both email and password.');
      return;
    }

    try {
      setLocalError(null);
      await signInWithEmail(email, password);
      navigate(redirectPath, { replace: true });
    } catch {
      // Error handled by AuthContext
    }
  };

  const displayedError = localError || authError;

  return (
    <div className={styles.card}>
      <div className={styles.headerSection}>
        <div className={styles.iconWrapper}>
          <Building2 size={26} color="#FFFFFF" />
        </div>
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Sign in to access your hotel operations dashboard</p>
      </div>

      {displayedError && (
        <div className={styles.errorAlert} role="alert">
          <AlertCircle size={18} className={styles.errorIcon} />
          <span className={styles.errorText}>{displayedError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          type="email"
          label="Email Address"
          placeholder="admin@calamm.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (displayedError) clearError();
          }}
          leftIcon={<Mail size={18} />}
          disabled={Boolean(actionLoading)}
          required
        />

        <Input
          type="password"
          label="Password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (displayedError) clearError();
          }}
          leftIcon={<Key size={18} />}
          disabled={Boolean(actionLoading)}
          required
        />

        <div className={styles.buttonContainer}>
          <Button
            type="submit"
            fullWidth
            disabled={Boolean(actionLoading)}
          >
            {actionLoading === 'email' ? 'Logging in...' : 'Login'}
          </Button>
        </div>
      </form>

      <div className={styles.divider}>
        <span>or continue with</span>
      </div>

      {/* Social Login Buttons */}
      <div className={styles.socialButtons}>
        <SocialAuthButton
          provider="google"
          loading={actionLoading === 'google'}
          disabled={Boolean(actionLoading)}
          onClick={handleGoogleSignIn}
        />
      </div>

      <div className={styles.links}>
        <a href="#forgot" className={styles.forgotPassword} onClick={(e) => e.preventDefault()}>
          Forgot Password?
        </a>
        <Link to="/register" className={styles.signup}>
          Create account
        </Link>
      </div>
    </div>
  );
};
