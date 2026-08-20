import React from 'react';
import { X, Mail, Phone, MapPin, CreditCard, CalendarDays } from 'lucide-react';
import { Button } from '../../../../components/design-system/Button/Button';
import styles from './ViewGuestProfileModal.module.css';

interface Guest {
  id: string;
  name: string;
  isVip: boolean;
  email: string;
  phone: string;
  country: string;
  stays: number;
  totalSpent: string;
  loyaltyPoints?: number;
  preferences?: string[];
  address?: string;
  passport?: string;
  recentBookings?: { id: string; room: string; date: string; status: 'Completed' | 'Upcoming' | 'Cancelled' }[];
}

interface ViewGuestProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  guest: Guest | null;
}

export const ViewGuestProfileModal: React.FC<ViewGuestProfileModalProps> = ({ isOpen, onClose, guest }) => {
  if (!isOpen || !guest) return null;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div 
        className={`${styles.modalContent} animate-pop-in`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Guest Profile</h2>
          <button className={styles.closeButton} onClick={onClose} type="button">
            <X size={20} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.profileHeader}>
            <div className={styles.avatar}>
              {getInitials(guest.name)}
            </div>
            <div className={styles.nameSection}>
              <h3 className={styles.guestName}>
                {guest.name}
                {guest.isVip && <span className={styles.vipBadge}>VIP</span>}
              </h3>
              <p className={styles.infoLabel}>Guest ID: {guest.id}</p>
            </div>
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoGroup}>
              <p className={styles.infoLabel}>Email</p>
              <p className={styles.infoValue} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={14} className={styles.infoLabel} /> {guest.email}
              </p>
            </div>
            <div className={styles.infoGroup}>
              <p className={styles.infoLabel}>Phone</p>
              <p className={styles.infoValue} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={14} className={styles.infoLabel} /> {guest.phone || '-'}
              </p>
            </div>
            <div className={styles.infoGroup}>
              <p className={styles.infoLabel}>Country</p>
              <p className={styles.infoValue} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} className={styles.infoLabel} /> {guest.country || '-'}
              </p>
            </div>
            <div className={styles.infoGroup}>
              <p className={styles.infoLabel}>Total Stays</p>
              <p className={styles.infoValue} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CalendarDays size={14} className={styles.infoLabel} /> {guest.stays} {guest.stays > 1 ? 'times' : 'time'}
              </p>
            </div>
            <div className={styles.infoGroup} style={{ gridColumn: '1 / -1' }}>
              <p className={styles.infoLabel}>Total Spent</p>
              <p className={styles.infoValue} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CreditCard size={14} className={styles.infoLabel} /> {guest.totalSpent}
              </p>
            </div>
            <div className={styles.infoGroup}>
              <p className={styles.infoLabel}>Passport / ID</p>
              <p className={styles.infoValue} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {guest.passport || '-'}
              </p>
            </div>
            <div className={styles.infoGroup} style={{ gridColumn: '1 / -1' }}>
              <p className={styles.infoLabel}>Address</p>
              <p className={styles.infoValue} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {guest.address || '-'}
              </p>
            </div>
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Loyalty & Preferences</h4>
            <div className={styles.infoGrid} style={{ gridTemplateColumns: '1fr', padding: '0.75rem' }}>
              <div className={styles.infoGroup}>
                <p className={styles.infoLabel}>Loyalty Points</p>
                <p className={styles.infoValue}>{guest.loyaltyPoints ? `${guest.loyaltyPoints} pts` : '-'}</p>
              </div>
              <div className={styles.infoGroup}>
                <p className={styles.infoLabel}>Preferences</p>
                <div className={styles.preferencesList}>
                  {guest.preferences && guest.preferences.length > 0 ? (
                    guest.preferences.map((pref, i) => (
                      <span key={i} className={styles.preferenceBadge}>{pref}</span>
                    ))
                  ) : (
                    <span className={styles.infoValue}>-</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Recent Bookings</h4>
            <div className={styles.bookingsList}>
              {guest.recentBookings && guest.recentBookings.length > 0 ? (
                guest.recentBookings.map((booking, i) => (
                  <div key={i} className={styles.bookingItem}>
                    <div className={styles.bookingInfo}>
                      <p className={styles.bookingRoom}>{booking.id} &middot; {booking.room}</p>
                      <p className={styles.bookingDate}>{booking.date}</p>
                    </div>
                    <div className={`${styles.bookingStatus} ${
                      booking.status === 'Completed' ? styles.statusCompleted : 
                      booking.status === 'Cancelled' ? styles.statusCancelled : styles.statusUpcoming
                    }`}>
                      {booking.status}
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.infoValue}>No recent bookings found.</p>
              )}
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <Button variant="secondary" onClick={onClose} type="button">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
