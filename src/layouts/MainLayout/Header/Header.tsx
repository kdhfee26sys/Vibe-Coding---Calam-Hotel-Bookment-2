import React, { useState, useRef, useEffect } from 'react';
import { Search, Moon, Sun, Bell, LogOut, Menu, User, Settings, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  toggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      {/* Left Actions */}
      <div className={styles.leftSection}>
        {toggleSidebar && (
          <button className={styles.menuButton} onClick={toggleSidebar} aria-label="Toggle Menu">
            <Menu size={24} />
          </button>
        )}
        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search guest name or booking ID" 
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className={styles.actions}>
        <button onClick={toggleTheme} className={styles.iconButton} aria-label="Toggle Theme">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        
        <div className={styles.notificationContainer} ref={notificationRef}>
          <button 
            className={styles.iconButton} 
            aria-label="Notifications"
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          >
            <Bell size={20} />
            <span className={styles.notificationBadge}></span>
          </button>

          {isNotificationOpen && (
            <div className={styles.notificationDropdown}>
              <div className={styles.notificationHeader}>Notifikasi</div>
              <div className={styles.notificationList}>
                <div className={styles.notificationItem}>
                  <div className={styles.notificationTitle}>Booking baru BK-1045</div>
                  <div className={styles.notificationDesc}>Booking.com · Deluxe 204</div>
                  <div className={styles.notificationTime}>5 mnt lalu</div>
                </div>
                <div className={styles.notificationItem}>
                  <div className={styles.notificationTitle}>Pembayaran diterima</div>
                  <div className={styles.notificationDesc}>Rp 2.400.000 dari Andini Prasetya</div>
                  <div className={styles.notificationTime}>1 jam lalu</div>
                </div>
                <div className={styles.notificationItem}>
                  <div className={styles.notificationTitle}>Kamar 205 maintenance</div>
                  <div className={styles.notificationDesc}>AC dilaporkan bermasalah</div>
                  <div className={styles.notificationTime}>Kemarin lalu</div>
                </div>
              </div>
              <button 
                className={styles.notificationFooter}
                onClick={() => setIsNotificationOpen(false)}
              >
                Tandai semua dibaca
              </button>
            </div>
          )}
        </div>

        <div className={styles.divider}></div>

        <div className={styles.profileContainer} ref={dropdownRef}>
          <div className={styles.profile} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <img 
              src="https://api.dicebear.com/7.x/notionists/svg?seed=Wulan" 
              alt="Wulan Sari" 
              className={styles.avatar} 
            />
            <div className={styles.profileInfo}>
              <span className={styles.name}>Wulan Sari</span>
              <span className={styles.role}>Owner</span>
            </div>
          </div>
          
          {isDropdownOpen && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownHeader}>
                <span className={styles.dropdownName}>Wulan Sari</span>
                <span className={styles.dropdownRole}>wulan@calamm.com</span>
              </div>
              <div className={styles.dropdownDivider}></div>
              <button className={styles.dropdownItem} onClick={() => { setIsDropdownOpen(false); navigate('/profile'); }}>
                <User size={16} />
                <span>My Profile</span>
              </button>
              <button className={styles.dropdownItem} onClick={() => { setIsDropdownOpen(false); navigate('/settings'); }}>
                <Settings size={16} />
                <span>Settings</span>
              </button>
              <button className={styles.dropdownItem} onClick={() => { setIsDropdownOpen(false); /* open help center */ }}>
                <HelpCircle size={16} />
                <span>Help Center</span>
              </button>
              <div className={styles.dropdownDivider}></div>
              <button className={styles.logoutButton} onClick={handleLogout}>
                <LogOut size={16} />
                <span>Log out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
