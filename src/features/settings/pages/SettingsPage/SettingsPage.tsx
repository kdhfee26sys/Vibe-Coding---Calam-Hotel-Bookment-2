import React, { useState } from 'react';
import { Button } from '../../../../components/design-system/Button/Button';
import styles from './SettingsPage.module.css';

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Hotel Profile');

  const tabs = ['Hotel Profile', 'Taxes', 'Roles', 'Notifications', 'Integrations'];

  return (
    <div className={`${styles.container} animate-pop-in`}>
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>Settings</h1>
          <p className={styles.subtitle}>Hotel configuration and system preferences.</p>
        </div>
      </header>

      <div className={styles.contentCard}>
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

        {activeTab === 'Hotel Profile' && (
          <div className={`${styles.formSection} animate-pop-in`} style={{ animationDelay: '0.1s' }}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Hotel Name</label>
              <input 
                type="text" 
                className={styles.input} 
                defaultValue="Hotel Calam Bandung" 
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Phone</label>
              <input 
                type="text" 
                className={styles.input} 
                defaultValue="+62 22 555 1234" 
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Address</label>
              <input 
                type="text" 
                className={styles.input} 
                defaultValue="Jl. Braga No. 21, Bandung" 
              />
            </div>

            <div className={styles.actions}>
              <Button variant="primary">
                Save Changes
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'Taxes' && (
          <div className={`${styles.formSection} animate-pop-in`} style={{ animationDelay: '0.1s' }}>
            <h2 className={styles.sectionTitle}>Tax Configuration</h2>
            <div className={styles.formGroup}>
              <label className={styles.label}>VAT / PPN (%)</label>
              <input type="number" className={styles.input} defaultValue="11" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Service Charge (%)</label>
              <input type="number" className={styles.input} defaultValue="10" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>City Tax (Flat)</label>
              <input type="number" className={styles.input} defaultValue="0" />
            </div>
            <div className={styles.actions}>
              <Button variant="primary">Save Taxes</Button>
            </div>
          </div>
        )}

        {activeTab === 'Roles' && (
          <div className={`animate-pop-in`} style={{ animationDelay: '0.1s' }}>
            <h2 className={styles.sectionTitle}>User Roles & Permissions</h2>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>Role Name</th>
                    <th className={styles.th}>Permissions</th>
                    <th className={styles.th}>Users</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={styles.tr}>
                    <td className={styles.td}><strong>Manager</strong></td>
                    <td className={styles.td}>Full Access (Dashboard, Bookings, Settings, Reports)</td>
                    <td className={styles.td}>1</td>
                  </tr>
                  <tr className={styles.tr}>
                    <td className={styles.td}><strong>Receptionist</strong></td>
                    <td className={styles.td}>Bookings, Check In/Out, Guest Profiles</td>
                    <td className={styles.td}>3</td>
                  </tr>
                  <tr className={styles.tr}>
                    <td className={styles.td}><strong>Housekeeping</strong></td>
                    <td className={styles.td}>Room Status, Housekeeping Dashboard</td>
                    <td className={styles.td}>4</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Notifications' && (
          <div className={`${styles.formSection} animate-pop-in`} style={{ animationDelay: '0.1s' }}>
            <h2 className={styles.sectionTitle}>Notification Preferences</h2>
            
            <div className={styles.toggleRow}>
              <div className={styles.toggleInfo}>
                <h4 className={styles.toggleTitle}>New Booking Alerts</h4>
                <p className={styles.toggleDesc}>Receive an email when a new booking is created.</p>
              </div>
              <label className={styles.switch}>
                <input type="checkbox" defaultChecked />
                <span className={styles.slider}></span>
              </label>
            </div>
            
            <div className={styles.toggleRow}>
              <div className={styles.toggleInfo}>
                <h4 className={styles.toggleTitle}>Cancellation Alerts</h4>
                <p className={styles.toggleDesc}>Receive an email when a booking is cancelled.</p>
              </div>
              <label className={styles.switch}>
                <input type="checkbox" defaultChecked />
                <span className={styles.slider}></span>
              </label>
            </div>

            <div className={styles.toggleRow}>
              <div className={styles.toggleInfo}>
                <h4 className={styles.toggleTitle}>Daily Summary</h4>
                <p className={styles.toggleDesc}>Receive a daily summary of occupancy and revenue at 8:00 AM.</p>
              </div>
              <label className={styles.switch}>
                <input type="checkbox" />
                <span className={styles.slider}></span>
              </label>
            </div>
          </div>
        )}

        {activeTab === 'Integrations' && (
          <div className={`animate-pop-in`} style={{ animationDelay: '0.1s' }}>
            <h2 className={styles.sectionTitle}>Connected Apps & Services</h2>
            <div className={styles.integrationGrid}>
              
              <div className={styles.integrationCard}>
                <div className={styles.integrationHeader}>
                  <div className={styles.integrationIcon}>T</div>
                  <div>
                    <h4 className={styles.integrationName}>Traveloka</h4>
                    <p className={styles.integrationStatus} style={{ color: 'var(--color-utility-utility-color-utility-success-600)' }}>Connected</p>
                  </div>
                </div>
                <Button variant="secondary">Manage Connection</Button>
              </div>

              <div className={styles.integrationCard}>
                <div className={styles.integrationHeader}>
                  <div className={styles.integrationIcon}>B</div>
                  <div>
                    <h4 className={styles.integrationName}>Booking.com</h4>
                    <p className={styles.integrationStatus} style={{ color: 'var(--color-utility-utility-color-utility-success-600)' }}>Connected</p>
                  </div>
                </div>
                <Button variant="secondary">Manage Connection</Button>
              </div>

              <div className={styles.integrationCard}>
                <div className={styles.integrationHeader}>
                  <div className={styles.integrationIcon}>A</div>
                  <div>
                    <h4 className={styles.integrationName}>Agoda</h4>
                    <p className={styles.integrationStatus}>Not Connected</p>
                  </div>
                </div>
                <Button variant="primary">Connect</Button>
              </div>

              <div className={styles.integrationCard}>
                <div className={styles.integrationHeader}>
                  <div className={styles.integrationIcon}>X</div>
                  <div>
                    <h4 className={styles.integrationName}>Xendit Payment</h4>
                    <p className={styles.integrationStatus} style={{ color: 'var(--color-utility-utility-color-utility-success-600)' }}>Connected</p>
                  </div>
                </div>
                <Button variant="secondary">Manage Connection</Button>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};
