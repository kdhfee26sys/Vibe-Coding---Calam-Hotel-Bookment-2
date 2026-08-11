import React from 'react';
import { Search, Plus, Download } from 'lucide-react';
import { Button } from '../../../../components/design-system/Button/Button';
import styles from './BookingManagementPage.module.css';

interface Booking {
  id: string;
  guestName: string;
  room: string;
  checkIn: string;
  checkOut: string;
  source: string;
  status: 'Confirmed' | 'Pending' | 'Checked-in' | 'Checked-out';
  payment: 'Paid' | 'Unpaid' | 'Partial';
  total: string;
}

const mockBookings: Booking[] = [
  {
    id: 'BK-1042',
    guestName: 'Andini Prasetya',
    room: '203 · Deluxe',
    checkIn: '2026-07-31',
    checkOut: '2026-08-02',
    source: 'Website',
    status: 'Confirmed',
    payment: 'Paid',
    total: 'Rp 2.400.000'
  },
  {
    id: 'BK-1043',
    guestName: 'Bagas Wirawan',
    room: '105 · Standard',
    checkIn: '2026-07-31',
    checkOut: '2026-08-01',
    source: 'Traveloka',
    status: 'Pending',
    payment: 'Unpaid',
    total: 'Rp 750.000'
  },
  {
    id: 'BK-1044',
    guestName: 'Clara Wijaya',
    room: '301 · Suite',
    checkIn: '2026-07-29',
    checkOut: '2026-08-03',
    source: 'Walk-in',
    status: 'Checked-in',
    payment: 'Partial',
    total: 'Rp 8.750.000'
  },
  {
    id: 'BK-1045',
    guestName: 'Dimas Ardiansyah',
    room: '204 · Deluxe',
    checkIn: '2026-08-04',
    checkOut: '2026-08-06',
    source: 'Booking.com',
    status: 'Confirmed',
    payment: 'Paid',
    total: 'Rp 2.400.000'
  },
  {
    id: 'BK-1046',
    guestName: 'Erika Santoso',
    room: '102 · Standard',
    checkIn: '2026-07-28',
    checkOut: '2026-07-30',
    source: 'Website',
    status: 'Checked-out',
    payment: 'Paid',
    total: 'Rp 1.500.000'
  }
];

export const BookingManagementPage: React.FC = () => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Confirmed': return styles.statusConfirmed;
      case 'Pending': return styles.statusPending;
      case 'Checked-in': return styles.statusCheckedIn;
      case 'Checked-out': return styles.statusCheckedOut;
      default: return '';
    }
  };

  const getPaymentClass = (payment: string) => {
    switch (payment) {
      case 'Paid': return styles.paymentPaid;
      case 'Unpaid': return styles.paymentUnpaid;
      case 'Partial': return styles.paymentPartial;
      default: return '';
    }
  };

  return (
    <div className={styles.container}>
      {/* Page Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Booking Management</h1>
          <p className={styles.subtitle}>6 reservasi ditemukan.</p>
        </div>
        <div className={styles.headerActions}>
          <Button variant="secondary">
            <Download size={16} /> Export
          </Button>
          <Button>
            <Plus size={16} /> New Booking
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
              placeholder="Cari nama tamu atau booking ID" 
              className={styles.searchInput}
            />

          </div>
          
          <select className={styles.selectDropdown}>
            <option>Status: Semua</option>
          </select>
          <select className={styles.selectDropdown}>
            <option>Pembayaran: Semua</option>
          </select>
          <select className={styles.selectDropdown}>
            <option>Tipe Kamar: Semua</option>
          </select>
          <select className={styles.selectDropdown}>
            <option>Sumber: Semua</option>
          </select>
          
          <button className={styles.resetButton}>Reset</button>
        </div>

        {/* Data Table */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Tamu</th>
                <th>Kamar</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Sumber</th>
                <th>Status</th>
                <th>Bayar</th>
                <th style={{ textAlign: 'right' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {mockBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className={styles.boldText}>{booking.id}</td>
                  <td className={styles.boldText}>{booking.guestName}</td>
                  <td>{booking.room}</td>
                  <td>{booking.checkIn}</td>
                  <td>{booking.checkOut}</td>
                  <td>{booking.source}</td>
                  <td>
                    <span className={`${styles.badge} ${getStatusClass(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.badge} ${getPaymentClass(booking.payment)}`}>
                      {booking.payment}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }} className={styles.boldText}>{booking.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <span className={styles.pageInfo}>Halaman 1 dari 2</span>
          <div className={styles.pageControls}>
            <button className={styles.pageButton}>Previous</button>
            <button className={styles.pageButton}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};
