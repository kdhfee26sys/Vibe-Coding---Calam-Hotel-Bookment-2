import React, { useState, useEffect } from 'react';
import { Button } from '../../../../components/design-system/Button/Button';
import styles from './ProfilePage.module.css';
import { User, Mail, Phone, MapPin, Camera } from 'lucide-react';
import { useAuth } from '../../../auth/hooks/useAuth';

export const ProfilePage: React.FC = () => {
  const { user, updateUserProfile, updateUserPassword, reauthenticateUser, actionLoading, error, clearError } = useAuth();
  const [activeTab, setActiveTab] = useState('Personal Info');
  const tabs = ['Personal Info', 'Security', 'Preferences'];

  // Personal Info State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');

  // Security State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Preferences State
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('Asia/Jakarta');

  // UI State
  const [localSuccess, setLocalSuccess] = useState('');
  const [localError, setLocalError] = useState('');
  const [isFetching, setIsFetching] = useState(true);

  // Initialize from Firebase User
  useEffect(() => {
    if (user?.displayName) {
      const parts = user.displayName.split(' ');
      setFirstName(parts[0] || '');
      setLastName(parts.slice(1).join(' ') || '');
    }
  }, [user?.displayName]);

  // Fetch from Prisma Database
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user?.uid) return;
      try {
        setIsFetching(true);
        const res = await fetch(`http://localhost:3000/api/profiles/${user.uid}`);
        if (res.ok) {
          const data = await res.json();
          if (data.phone) setPhone(data.phone);
          if (data.bio) setBio(data.bio);
          if (data.language) setLanguage(data.language);
          if (data.timezone) setTimezone(data.timezone);
        }
      } catch (err) {
        console.error('Failed to fetch DB profile:', err);
      } finally {
        setIsFetching(false);
      }
    };
    fetchProfileData();
  }, [user?.uid]);

  const showSuccess = (msg: string) => {
    setLocalSuccess(msg);
    setTimeout(() => setLocalSuccess(''), 3000);
  };

  const saveToDatabase = async (payload: any) => {
    if (!user?.uid) return;
    await fetch(`http://localhost:3000/api/profiles/${user.uid}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  };

  const handleSaveChanges = async () => {
    setLocalError('');
    setLocalSuccess('');
    if (error) clearError();
    
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    try {
      // 1. Update Firebase
      await updateUserProfile(fullName);
      // 2. Update DB
      await saveToDatabase({ phone, bio, first_name: firstName, last_name: lastName });
      showSuccess('Profile updated successfully!');
    } catch (err) {
      setLocalError('Failed to update profile.');
    }
  };

  const handleUpdatePassword = async () => {
    setLocalError('');
    setLocalSuccess('');
    if (error) clearError();

    if (!currentPassword) {
      setLocalError('Current password is required.');
      return;
    }
    if (newPassword.length < 6) {
      setLocalError('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }

    try {
      await reauthenticateUser(currentPassword);
      await updateUserPassword(newPassword);
      showSuccess('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      // Handled by AuthContext, error state will be set
    }
  };

  const handleSavePreferences = async () => {
    setLocalError('');
    setLocalSuccess('');
    if (error) clearError();

    try {
      await saveToDatabase({ language, timezone });
      showSuccess('Preferences saved successfully!');
    } catch (err) {
      setLocalError('Failed to save preferences.');
    }
  };

  const displayError = localError || error;

  return (
    <div className={`${styles.container} animate-pop-in`}>
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>My Profile</h1>
          <p className={styles.subtitle}>Manage your personal information and account settings.</p>
        </div>
      </header>

      <div className={styles.contentGrid}>
        {/* Left Column: Profile Card */}
        <div className={styles.profileCard}>
          <div className={styles.avatarSection}>
            <div className={styles.avatarWrapper}>
              <img 
                src={user?.photoURL || `https://api.dicebear.com/7.x/notionists/svg?seed=${user?.displayName || 'User'}`} 
                alt={user?.displayName || 'User Avatar'} 
                className={styles.avatar} 
              />
              <button className={styles.editAvatarBtn} aria-label="Change Avatar">
                <Camera size={16} />
              </button>
            </div>
            <h2 className={styles.userName}>{user?.displayName || 'User'}</h2>
            <p className={styles.userRole}>Owner</p>
          </div>
          
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <Mail size={16} className={styles.contactIcon} />
              <span>{user?.email || 'No email provided'}</span>
            </div>
            <div className={styles.contactItem}>
              <Phone size={16} className={styles.contactIcon} />
              <span>{phone || 'Not provided'}</span>
            </div>
            <div className={styles.contactItem}>
              <MapPin size={16} className={styles.contactIcon} />
              <span>{timezone}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Settings */}
        <div className={styles.settingsCard}>
          <div className={styles.tabsContainer}>
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
                onClick={() => {
                  setActiveTab(tab);
                  setLocalError('');
                  if (error) clearError();
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {displayError && <div style={{ color: 'var(--color-text-text-color-text-error)', marginBottom: '1rem', fontSize: '0.875rem', marginTop: '1rem' }}>{displayError}</div>}
          {localSuccess && <div style={{ color: 'var(--color-text-text-color-text-success)', marginBottom: '1rem', fontSize: '0.875rem', marginTop: '1rem' }}>{localSuccess}</div>}
          {isFetching && <div style={{ marginBottom: '1rem', fontSize: '0.875rem', marginTop: '1rem' }}>Loading profile data...</div>}

          {activeTab === 'Personal Info' && !isFetching && (
            <div className={`${styles.formSection} animate-pop-in`} style={{ animationDelay: '0.1s' }}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>First Name</label>
                  <input 
                    type="text" 
                    className={styles.input} 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Last Name</label>
                  <input 
                    type="text" 
                    className={styles.input} 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Email Address (Read-only)</label>
                <input type="email" className={styles.input} value={user?.email || ''} disabled style={{ opacity: 0.6, cursor: 'not-allowed' }} />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Phone Number</label>
                <input type="tel" className={styles.input} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+62 812 3456 7890" />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Bio</label>
                <textarea className={styles.textarea} rows={4} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell us about yourself..."></textarea>
              </div>

              <div className={styles.actions}>
                <Button variant="primary" onClick={handleSaveChanges} disabled={Boolean(actionLoading)}>
                  {actionLoading === 'email' ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'Security' && (
            <div className={`${styles.formSection} animate-pop-in`} style={{ animationDelay: '0.1s' }}>
              <h2 className={styles.sectionTitle}>Change Password</h2>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Current Password</label>
                <input type="password" className={styles.input} placeholder="Enter current password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>New Password</label>
                <input type="password" className={styles.input} placeholder="Enter new password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Confirm New Password</label>
                <input type="password" className={styles.input} placeholder="Confirm new password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
              </div>

              <div className={styles.actions}>
                <Button variant="primary" onClick={handleUpdatePassword} disabled={Boolean(actionLoading)}>
                  {actionLoading === 'email' ? 'Updating...' : 'Update Password'}
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'Preferences' && !isFetching && (
            <div className={`${styles.formSection} animate-pop-in`} style={{ animationDelay: '0.1s' }}>
              <h2 className={styles.sectionTitle}>Application Preferences</h2>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Language</label>
                <select className={styles.select} value={language} onChange={e => setLanguage(e.target.value)}>
                  <option value="id">Bahasa Indonesia</option>
                  <option value="en">English</option>
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Timezone</label>
                <select className={styles.select} value={timezone} onChange={e => setTimezone(e.target.value)}>
                  <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                  <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                  <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
                </select>
              </div>

              <div className={styles.actions}>
                <Button variant="primary" onClick={handleSavePreferences} disabled={Boolean(actionLoading)}>
                  Save Preferences
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
