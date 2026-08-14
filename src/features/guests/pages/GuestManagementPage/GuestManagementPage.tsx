import React, { useState } from 'react';
import { Search, Plus, Download } from 'lucide-react';
import { Button } from '../../../../components/design-system/Button/Button';
import { NewGuestModal } from '../../components/NewGuestModal/NewGuestModal';
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
    totalSpent: 'Rp 9.600.000'
  },
  {
    id: 'G-2',
    name: 'Bagas Wirawan',
    isVip: false,
    email: 'bagas@mail.com',
    phone: '+62 811-2211-9090',
    country: 'Indonesia',
    stays: 1,
    totalSpent: 'Rp 750.000'
  },
  {
    id: 'G-3',
    name: 'Clara Wijaya',
    isVip: true,
    email: 'clara@mail.com',
    phone: '+62 813-7788-1234',
    country: 'Indonesia',
    stays: 7,
    totalSpent: 'Rp 24.500.000'
  },
  {
    id: 'G-4',
    name: 'Dimas Ardiansyah',
    isVip: false,
    email: 'dimas@mail.com',
    phone: '+62 815-4455-6677',
    country: 'Indonesia',
    stays: 2,
    totalSpent: 'Rp 4.800.000'
  },
  {
    id: 'G-5',
    name: 'Erika Santoso',
    isVip: false,
    email: 'erika@mail.com',
    phone: '+62 819-1231-4567',
    country: 'Singapore',
    stays: 3,
    totalSpent: 'Rp 4.500.000'
  }
];

export const GuestManagementPage: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>(mockGuests);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
                    <button className={styles.actionButton}>
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
    </div>
  );
};
