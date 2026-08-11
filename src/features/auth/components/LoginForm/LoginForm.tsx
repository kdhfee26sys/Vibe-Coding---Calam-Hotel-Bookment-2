import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Mail, Key } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '../../../../components/design-system/Input/Input';
import { Button } from '../../../../components/design-system/Button/Button';
import styles from './LoginForm.module.css';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    navigate('/dashboard');
  };

  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        <Building2 size={24} color="var(--color-text-text-gray-text-white)" />
      </div>
      
      <h1 className={styles.title}>Log in</h1>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input 
          type="email"
          label="Email"
          placeholder="doni@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail size={18} />}
          required
        />
        
        <Input 
          type="password"
          label="Password"
          placeholder="*****"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftIcon={<Key size={18} />}
          required
        />
        
        <div className={styles.buttonContainer}>
          <Button type="submit" fullWidth>
            Log in
          </Button>
        </div>
      </form>
      
      <div className={styles.links}>
        <a href="#" className={styles.forgotPassword}>Forgot Password?</a>
        <Link to="/register" className={styles.signup}>Don't Have one?</Link>
      </div>
    </div>
  );
};
