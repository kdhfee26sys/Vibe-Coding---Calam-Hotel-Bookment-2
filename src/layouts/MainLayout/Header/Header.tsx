import React, { useState, useRef, useEffect } from 'react';
import { Search, Moon, Sun, Bell, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
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
      {/* Search Bar */}
      <div className={styles.searchContainer}>
        <Search size={18} className={styles.searchIcon} />
        <input 
          type="text" 
          placeholder="Cari nama tamu atau booking ID" 
          className={styles.searchInput}
        />

      </div>

      {/* Right Actions */}
      <div className={styles.actions}>
        <button onClick={toggleTheme} className={styles.iconButton} aria-label="Toggle Theme">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        
        <button className={styles.iconButton} aria-label="Notifications">
          <Bell size={20} />
          <span className={styles.notificationBadge}></span>
        </button>

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
