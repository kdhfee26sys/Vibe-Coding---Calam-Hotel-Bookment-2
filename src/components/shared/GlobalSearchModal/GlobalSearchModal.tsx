import React, { useEffect, useRef, useState } from 'react';
import { Search, X, User, Calendar, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './GlobalSearchModal.module.css';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MOCK_GUESTS = [
  { id: 'BK-1045', name: 'Andini Prasetya', room: 'Deluxe 204', date: '12 Aug - 15 Aug', status: 'Checked In' },
  { id: 'BK-1046', name: 'Budi Santoso', room: 'Suite 301', date: '14 Aug - 16 Aug', status: 'Confirmed' },
  { id: 'BK-1047', name: 'Citra Kirana', room: 'Standard 102', date: '15 Aug - 18 Aug', status: 'Pending' },
  { id: 'BK-1048', name: 'Dian Sastrowardoyo', room: 'VIP 501', date: '16 Aug - 20 Aug', status: 'Confirmed' },
  { id: 'BK-1049', name: 'Eka Wijaya', room: 'Deluxe 205', date: '16 Aug - 17 Aug', status: 'Checked In' },
  { id: 'BK-1050', name: 'Fahri Hamzah', room: 'Standard 105', date: '18 Aug - 22 Aug', status: 'Pending' },
  { id: 'BK-1051', name: 'Gita Gutawa', room: 'Suite 302', date: '20 Aug - 25 Aug', status: 'Confirmed' },
  { id: 'BK-1052', name: 'Hendra Setiawan', room: 'Standard 110', date: '21 Aug - 23 Aug', status: 'Pending' },
];

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      setSearchQuery(''); // Reset search on open
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const filteredGuests = MOCK_GUESTS.filter(guest => 
    guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guest.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guest.room.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGuestClick = (name: string) => {
    // Navigate to Guest Management and trigger the profile modal
    navigate('/guests', { state: { viewGuestName: name } });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div 
        className={styles.modal} 
        onClick={e => e.stopPropagation()}
        ref={modalRef}
      >
        <div className={styles.searchHeader}>
          <Search className={styles.searchIcon} size={22} />
          <input
            ref={inputRef}
            type="text"
            className={styles.searchInput}
            placeholder="Search guest name, booking ID, or room..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className={styles.content}>
          <div className={styles.sectionTitle}>
            {searchQuery ? 'Search Results' : 'Recent Guests'}
          </div>
          <div className={styles.resultsList}>
            {filteredGuests.length > 0 ? (
              filteredGuests.map(guest => (
                <div 
                  key={guest.id} 
                  className={styles.resultItem}
                  onClick={() => handleGuestClick(guest.name)}
                >
                  <div className={styles.resultAvatar}>
                    <User size={20} className={styles.avatarIcon} />
                  </div>
                  <div className={styles.resultInfo}>
                    <div className={styles.resultHeader}>
                      <span className={styles.resultName}>{guest.name}</span>
                      <span className={`${styles.statusBadge} ${styles[guest.status.replace(' ', '')]}`}>
                        {guest.status}
                      </span>
                    </div>
                    <div className={styles.resultDetails}>
                      <span className={styles.badge}>{guest.id}</span>
                      <span className={styles.detailText}><MapPin size={14} className={styles.detailIcon}/> {guest.room}</span>
                      <span className={styles.detailText}><Calendar size={14} className={styles.detailIcon}/> {guest.date}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noResults}>
                No guests found matching "{searchQuery}"
              </div>
            )}
          </div>
        </div>
        
        <div className={styles.footer}>
          <div className={styles.shortcutGroup}>
            <span className={styles.shortcutHint}><kbd className={styles.kbd}>↵</kbd> Pilih</span>
            <span className={styles.shortcutHint}><kbd className={styles.kbd}>esc</kbd> Tutup</span>
          </div>
        </div>
      </div>
    </div>
  );
};
