import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Plus, Download } from 'lucide-react';
import { Button } from '../../../../components/design-system/Button/Button';
import { NewGuestModal } from '../../components/NewGuestModal/NewGuestModal';
import { ViewGuestProfileModal } from '../../components/ViewGuestProfileModal/ViewGuestProfileModal';
import styles from './GuestManagementPage.module.css';

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

const mockGuests: Guest[] = [
  {
    id: 'G-1',
    name: 'Andini Prasetya',
    isVip: true,
    email: 'andini@mail.com',
    phone: '+62 812-3344-1122',
    country: 'Indonesia',
    stays: 4,
    totalSpent: 'Rp 9.600.000',
    loyaltyPoints: 1250,
    preferences: ['Late Check-out', 'High Floor', 'Extra Pillow'],
    address: 'Jl. Sudirman No. 45, Jakarta Selatan',
    passport: 'A1234567',
    recentBookings: [
      { id: 'BK-1042', room: 'Suite Room 501', date: '2026-07-29 to 2026-07-31', status: 'Completed' },
      { id: 'BK-0921', room: 'Deluxe Room 304', date: '2025-12-10 to 2025-12-12', status: 'Completed' }
    ]
  },
  {
    id: 'G-2',
    name: 'Bagas Wirawan',
    isVip: false,
    email: 'bagas@mail.com',
    phone: '+62 811-2211-9090',
    country: 'Indonesia',
    stays: 1,
    totalSpent: 'Rp 750.000',
    loyaltyPoints: 50,
    preferences: ['Non-smoking'],
    address: 'Jl. Merdeka No. 12, Bandung',
    passport: 'B9876543',
    recentBookings: [
      { id: 'BK-1043', room: 'Standard Room 105', date: '2026-07-31 to 2026-08-01', status: 'Upcoming' }
    ]
  },
  {
    id: 'G-3',
    name: 'Clara Wijaya',
    isVip: true,
    email: 'clara@mail.com',
    phone: '+62 813-7788-1234',
    country: 'Indonesia',
    stays: 7,
    totalSpent: 'Rp 24.500.000',
    loyaltyPoints: 4500,
    preferences: ['Ocean View', 'Breakfast in Bed', 'Allergies: Nuts'],
    address: 'Jl. Diponegoro 99, Surabaya',
    passport: 'C5554443',
    recentBookings: [
      { id: 'BK-0811', room: 'Presidential Suite', date: '2026-05-01 to 2026-05-05', status: 'Completed' },
      { id: 'BK-0600', room: 'Suite Room 502', date: '2025-11-20 to 2025-11-25', status: 'Completed' }
    ]
  },
  {
    id: 'G-4',
    name: 'Dimas Ardiansyah',
    isVip: false,
    email: 'dimas@mail.com',
    phone: '+62 815-4455-6677',
    country: 'Indonesia',
    stays: 2,
    totalSpent: 'Rp 4.800.000',
    loyaltyPoints: 300,
    preferences: ['Early Check-in'],
    address: 'Jl. Gajah Mada 10, Yogyakarta',
    passport: 'D2221110',
    recentBookings: [
      { id: 'BK-1045', room: 'Deluxe Room 204', date: '2026-07-25 to 2026-07-27', status: 'Completed' }
    ]
  },
  {
    id: 'G-5',
    name: 'Erika Santoso',
    isVip: false,
    email: 'erika@mail.com',
    phone: '+62 819-1231-4567',
    country: 'Singapore',
    stays: 3,
    totalSpent: 'Rp 4.500.000',
    loyaltyPoints: 600,
    preferences: ['Smoking Room'],
    address: '10 Bayfront Avenue, Singapore',
    passport: 'S8889991',
    recentBookings: [
      { id: 'BK-0999', room: 'Standard Room 210', date: '2026-06-15 to 2026-06-18', status: 'Cancelled' }
    ]
  }
];

export const GuestManagementPage: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>(mockGuests);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const location = useLocation();

  React.useEffect(() => {
    if (location.state?.viewGuestName) {
      const guest = guests.find(g => g.name === location.state.viewGuestName) || guests[0];
      setSelectedGuest(guest);
    }
  }, [location.state, guests]);

  return (
    <div className={styles.container}>
      {/* Page Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Guest Management</h1>
          <p className={styles.subtitle}>{guests.length} registered guests.</p>
        </div>
        <div className={styles.headerActions}>
          <Button variant="secondary">
            <Download size={16} /> Export
          </Button>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> Add Guest
          </Button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className={`${styles.card} animate-pop-in`}>
        {/* Filter Bar */}
        <div className={styles.filterBar}>
          <div className={styles.searchContainer}>
            <Search size={16} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search guest name or email" 
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* Data Table */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Country</th>
                <th>Stays</th>
                <th>Total Spent</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((guest) => (
                <tr key={guest.id}>
                  <td>
                    <div className={styles.nameCell}>
                      <span className={styles.guestName}>{guest.name}</span>
                      {guest.isVip && <span className={styles.vipBadge}>VIP</span>}
                    </div>
                  </td>
                  <td>
                    <div className={styles.contactCell}>
                      <span className={styles.emailText}>{guest.email}</span>
                      <span className={styles.phoneText}>{guest.phone}</span>
                    </div>
                  </td>
                  <td>{guest.country}</td>
                  <td>{guest.stays}x</td>
                  <td className={styles.totalSpent}>{guest.totalSpent}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button className={styles.actionButton} onClick={() => setSelectedGuest(guest)}>
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <NewGuestModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddGuest={(newGuest) => {
          setGuests(prev => [newGuest, ...prev]);
        }}
      />

      <ViewGuestProfileModal 
        isOpen={!!selectedGuest}
        onClose={() => setSelectedGuest(null)}
        guest={selectedGuest}
      />
    </div>
  );
};
