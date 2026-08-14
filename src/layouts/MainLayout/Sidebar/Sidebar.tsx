import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutGrid, CalendarDays, Calendar, Bed, Users, 
  ArrowLeftRight, Home, CreditCard, LineChart, Star, 
  UserCog, Ticket, FileText, Building2 
} from 'lucide-react';
import styles from './Sidebar.module.css';

const navItems = [
  { path: '/dashboard', label: 'Overview', icon: <LayoutGrid size={20} /> },
  { path: '/bookings', label: 'Booking Management', icon: <CalendarDays size={20} /> },
  { path: '/calendar', label: 'Reservation Calendar', icon: <Calendar size={20} /> },
  { path: '/rooms', label: 'Room Management', icon: <Bed size={20} /> },
  { path: '/guests', label: 'Guest Management', icon: <Users size={20} /> },
  { path: '/check-in-out', label: 'Check In / Check Out', icon: <ArrowLeftRight size={20} /> },
  { path: '/housekeeping', label: 'Housekeeping', icon: <Home size={20} /> },
  { path: '/payment', label: 'Payment Center', icon: <CreditCard size={20} /> },
  { path: '/reviews', label: 'Review Management', icon: <Star size={20} /> },
  { path: '/staff', label: 'Staff Management', icon: <UserCog size={20} /> },
  { path: '/reports', label: 'Reports', icon: <FileText size={20} /> },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <div className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`} onClick={onClose}></div>
      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        {/* Logo Section */}
        <div className={styles.logoContainer}>
          <div className={styles.logoIcon}>
            <Building2 size={24} color="#FFF" />
          </div>
          <div className={styles.logoText}>
            <h2>Calam</h2>
            <p>One dashboard, every stay</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `${styles.navItem} ${isActive ? styles.active : ''}`
              }
            >
              <span className={styles.icon}>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Profile/Hotel Card */}
        <div className={styles.bottomCard}>
          <div className={styles.hotelInfo}>
            <h4>Hotel Syantika Bandung</h4>
            <p>Pro Plan · 42 rooms</p>
          </div>
        </div>
      </aside>
    </>
  );
};
