import React, { useState } from 'react';
import { Button } from '../../../../components/design-system/Button/Button';
import styles from './ProfilePage.module.css';
import { User, Mail, Phone, MapPin, Camera } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Personal Info');

  const tabs = ['Personal Info', 'Security', 'Preferences'];

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
                src="https://api.dicebear.com/7.x/notionists/svg?seed=Wulan" 
                alt="Wulan Sari" 
                className={styles.avatar} 
              />
              <button className={styles.editAvatarBtn} aria-label="Change Avatar">
                <Camera size={16} />
              </button>
            </div>
            <h2 className={styles.userName}>Wulan Sari</h2>
            <p className={styles.userRole}>Owner</p>
          </div>
          
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <Mail size={16} className={styles.contactIcon} />
              <span>wulan@calamm.com</span>
            </div>
            <div className={styles.contactItem}>
              <Phone size={16} className={styles.contactIcon} />
              <span>+62 812 3456 7890</span>
            </div>
            <div className={styles.contactItem}>
              <MapPin size={16} className={styles.contactIcon} />
              <span>Bandung, Indonesia</span>
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
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'Personal Info' && (
            <div className={`${styles.formSection} animate-pop-in`} style={{ animationDelay: '0.1s' }}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>First Name</label>
                  <input type="text" className={styles.input} defaultValue="Wulan" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Last Name</label>
                  <input type="text" className={styles.input} defaultValue="Sari" />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Email Address</label>
                <input type="email" className={styles.input} defaultValue="wulan@calamm.com" />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Phone Number</label>
                <input type="tel" className={styles.input} defaultValue="+62 812 3456 7890" />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Bio</label>
                <textarea className={styles.textarea} rows={4} defaultValue="Owner and manager of Hotel Calam Bandung. Passionate about hospitality."></textarea>
              </div>

              <div className={styles.actions}>
                <Button variant="primary">Save Changes</Button>
              </div>
            </div>
          )}

          {activeTab === 'Security' && (
            <div className={`${styles.formSection} animate-pop-in`} style={{ animationDelay: '0.1s' }}>
              <h2 className={styles.sectionTitle}>Change Password</h2>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Current Password</label>
                <input type="password" className={styles.input} placeholder="Enter current password" />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>New Password</label>
                <input type="password" className={styles.input} placeholder="Enter new password" />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Confirm New Password</label>
                <input type="password" className={styles.input} placeholder="Confirm new password" />
              </div>

              <div className={styles.actions}>
                <Button variant="primary">Update Password</Button>
              </div>
            </div>
          )}

          {activeTab === 'Preferences' && (
            <div className={`${styles.formSection} animate-pop-in`} style={{ animationDelay: '0.1s' }}>
              <h2 className={styles.sectionTitle}>Application Preferences</h2>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Language</label>
                <select className={styles.select}>
                  <option value="id">Bahasa Indonesia</option>
                  <option value="en">English</option>
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Timezone</label>
                <select className={styles.select}>
                  <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                  <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                  <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
                </select>
              </div>

              <div className={styles.actions}>
                <Button variant="primary">Save Preferences</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
