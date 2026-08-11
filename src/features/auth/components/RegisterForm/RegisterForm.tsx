import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Mail, Key, User, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '../../../../components/design-system/Input/Input';
import { Button } from '../../../../components/design-system/Button/Button';
import styles from './RegisterForm.module.css';

export const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registering with:', { name, phone, email, password });
    navigate('/dashboard');
  };

  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        <Building2 size={24} color="var(--color-text-text-gray-text-white)" />
      </div>
      
      <h1 className={styles.title}>Sign up</h1>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input 
          type="text"
          label="Name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          leftIcon={<User size={18} />}
          required
        />
        
        {/* Phone number input with country code dropdown approximation */}
        <div className={styles.phoneGroup}>
          <label className={styles.phoneLabel}>Number</label>
          <div className={styles.phoneInputContainer}>
            <div className={styles.countryCode}>
              <span>ID</span>
              <ChevronDown size={14} className={styles.chevron} />
            </div>
            <input 
              className={styles.phoneInput}
              type="tel"
              placeholder="(+62) 000-0000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>

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
            Sign Up
          </Button>
        </div>
      </form>
      
      <div className={styles.links}>
        <Link to="/login" className={styles.loginLink}>Have an Account?</Link>
      </div>
    </div>
  );
};
