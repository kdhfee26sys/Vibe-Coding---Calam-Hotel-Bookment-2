import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, Mail, Key, User, AlertCircle } from 'lucide-react';
import { Input } from '../../../../components/design-system/Input/Input';
import { Button } from '../../../../components/design-system/Button/Button';
import { SocialAuthButton } from '../SocialAuthButton/SocialAuthButton';
import { useAuth } from '../../hooks/useAuth';
import styles from './RegisterForm.module.css';

export const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const {
    signInWithGoogle,
    signUpWithEmail,
    actionLoading,
    error: authError,
    clearError,
  } = useAuth();

  const navigate = useNavigate();

  const handleGoogleSignUp = async () => {
    try {
      setLocalError(null);
      await signInWithGoogle();
      navigate('/dashboard', { replace: true });
    } catch {
      // Handled by AuthContext
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setLocalError('Please fill in all required fields.');
      return;
    }
    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters.');
      return;
    }

    try {
      setLocalError(null);
      await signUpWithEmail(email, password, name);
      navigate('/dashboard', { replace: true });
    } catch {
      // Handled by AuthContext
    }
  };

  const displayedError = localError || authError;

  return (
    <div className={styles.card}>
      <div className={styles.headerSection}>
        <div className={styles.iconWrapper}>
          <Building2 size={26} color="#FFFFFF" />
        </div>
        <h1 className={styles.title}>Create account</h1>
        <p className={styles.subtitle}>Get started with Calamm hotel management</p>
      </div>

      {displayedError && (
        <div className={styles.errorAlert} role="alert">
          <AlertCircle size={18} className={styles.errorIcon} />
          <span className={styles.errorText}>{displayedError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          type="text"
          label="Full Name"
          placeholder="Wulan Sari"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (displayedError) clearError();
          }}
          leftIcon={<User size={18} />}
          disabled={Boolean(actionLoading)}
          required
        />

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
            {actionLoading === 'email' ? 'Creating account...' : 'Create Account'}
          </Button>
        </div>
      </form>

      <div className={styles.divider}>
        <span>or continue with</span>
      </div>

      {/* Social Sign Up Buttons */}
      <div className={styles.socialButtons}>
        <SocialAuthButton
          provider="google"
          loading={actionLoading === 'google'}
          disabled={Boolean(actionLoading)}
          actionText="Sign up with Google"
          onClick={handleGoogleSignUp}
        />
      </div>

      <div className={styles.links}>
        <span>
          Already have an account?{' '}
          <Link to="/login" className={styles.loginLink}>
            Sign in
          </Link>
        </span>
      </div>
    </div>
  );
};
