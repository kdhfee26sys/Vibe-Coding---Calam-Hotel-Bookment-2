import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Plus, Download, Filter } from 'lucide-react';
import { Button } from '../../../../components/design-system/Button/Button';
import { NewBookingModal } from '../../components/NewBookingModal/NewBookingModal';
import { FilterBookingsModal } from '../../components/FilterBookingsModal/FilterBookingsModal';
import { Toast } from '../../../../components/shared/Toast/Toast';
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
  const location = useLocation();
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false);
  const [bookingToEdit, setBookingToEdit] = useState<Booking | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Booking berhasil dibuat');
  
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [deletedBookingCache, setDeletedBookingCache] = useState<Booking | null>(null);
  const deleteTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  // Filters State
  const [filters, setFilters] = useState({
    status: 'All',
    payment: 'All',
    roomType: 'All',
    source: 'All'
  });

  const [highlightedId, setHighlightedId] = useState<string | null>(
    location.state?.highlightedBookingId || null
  );

  // FETCH DATA FROM BACKEND
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/bookings');
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        }
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
      }
    };
    fetchBookings();
  }, []);

  useEffect(() => {
    if (highlightedId) {
      const timer = setTimeout(() => {
        setHighlightedId(null);
        // Clear router state to prevent re-highlight on refresh
        window.history.replaceState({}, document.title);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [highlightedId]);

  const handleBookingAdded = (savedBooking: Booking) => {
    setBookings(prev => {
      const exists = prev.find(b => b.id === savedBooking.id);
      if (exists) {
        return prev.map(b => b.id === savedBooking.id ? savedBooking : b);
      } else {
        return [savedBooking, ...prev];
      }
    });
    setToastMessage(bookingToEdit ? 'Booking berhasil diubah' : 'Booking berhasil dibuat');
    setPendingDeleteId(null);
    setShowToast(true);
    setBookingToEdit(null);
  };

  const handleUndo = () => {
    if (deleteTimeoutRef.current) {
      clearTimeout(deleteTimeoutRef.current);
    }
    if (deletedBookingCache) {
      setBookings(prev => [deletedBookingCache, ...prev]);
    }
    setPendingDeleteId(null);
    setDeletedBookingCache(null);
    setShowToast(false);
  };

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

  // Derived State: Filtering
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.guestName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filters.status === 'All' || b.status === filters.status;
    const matchesPayment = filters.payment === 'All' || b.payment === filters.payment;
    const matchesRoom = filters.roomType === 'All' || b.room.includes(filters.roomType);
    const matchesSource = filters.source === 'All' || b.source === filters.source;

    return matchesSearch && matchesStatus && matchesPayment && matchesRoom && matchesSource;
  });

  // Derived State: Pagination
  const totalPages = Math.ceil(filteredBookings.length / pageSize) || 1;
  // Ensure current page is valid when filtering reduces total pages
  const safeCurrentPage = Math.min(currentPage, totalPages);
  
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedBookings = filteredBookings.slice(startIndex, startIndex + pageSize);

  const handleNextPage = () => {
    if (safeCurrentPage < totalPages) setCurrentPage(safeCurrentPage + 1);
  };

  const handlePrevPage = () => {
    if (safeCurrentPage > 1) setCurrentPage(safeCurrentPage - 1);
  };

  return (
    <div className={styles.container}>
      {/* Page Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Booking Management</h1>
          <p className={styles.subtitle}>{filteredBookings.length} reservations found.</p>
        </div>
        <div className={styles.headerActions}>
          <Button variant="secondary">
            <Download size={16} /> Export
          </Button>
          <Button onClick={() => {
            setBookingToEdit(null);
            setIsNewBookingModalOpen(true);
          }}>
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
              placeholder="Search guest name or booking ID" 
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button variant="secondary" onClick={() => setIsFilterModalOpen(true)}>
            <Filter size={16} /> Filters
          </Button>
        </div>

        {/* Data Table */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Guest</th>
                <th>Room</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Source</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBookings.length > 0 ? paginatedBookings.map((booking) => (
                <tr 
                  key={booking.id}
                  className={booking.id === highlightedId ? styles.highlightedRow : ''}
                >
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
                  <td className={styles.boldText}>{booking.total}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-start' }}>
                      <button 
                        onClick={() => {
                          setBookingToEdit(booking);
                          setIsNewBookingModalOpen(true);
                        }}
                        style={{ 
                          background: '#f3f4f6', 
                          border: '1px solid #d1d5db', 
                          borderRadius: '6px',
                          cursor: 'pointer', 
                          color: '#374151', 
                          padding: '6px 12px',
                          fontSize: '0.85rem',
                          fontWeight: '500',
                          transition: 'background 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = '#e5e7eb'}
                        onMouseOut={(e) => e.currentTarget.style.background = '#f3f4f6'}
                        title="Edit Booking"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => {
                          // Optimistic Delete
                          setPendingDeleteId(booking.id);
                          setDeletedBookingCache(booking);
                          setBookings(prev => prev.filter(b => b.id !== booking.id));
                          
                          setToastMessage('Booking berhasil dihapus');
                          setShowToast(true);
                          
                          if (deleteTimeoutRef.current) clearTimeout(deleteTimeoutRef.current);
                          
                          deleteTimeoutRef.current = setTimeout(async () => {
                            try {
                              await fetch(`http://localhost:3000/api/bookings/${booking.id}`, { method: 'DELETE' });
                            } catch (err) {
                              console.error(err);
                            }
                            setPendingDeleteId(null);
                            setDeletedBookingCache(null);
                          }, 5000);
                        }}
                        style={{ 
                          background: '#fef2f2', 
                          border: '1px solid #fecaca', 
                          borderRadius: '6px',
                          cursor: 'pointer', 
                          color: '#ef4444', 
                          padding: '6px 12px',
                          fontSize: '0.85rem',
                          fontWeight: '500',
                          transition: 'background 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = '#fee2e2'}
                        onMouseOut={(e) => e.currentTarget.style.background = '#fef2f2'}
                        title="Delete Booking"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={10} style={{ textAlign: 'center', padding: '2rem' }}>
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <span className={styles.pageInfo}>Page {safeCurrentPage} of {totalPages}</span>
          <div className={styles.pageControls}>
            <Button 
              variant="secondary"
              onClick={handlePrevPage}
              disabled={safeCurrentPage === 1}
              style={{ opacity: safeCurrentPage === 1 ? 0.5 : 1, cursor: safeCurrentPage === 1 ? 'not-allowed' : 'pointer' }}
            >
              Previous
            </Button>
            <Button 
              variant="secondary"
              onClick={handleNextPage}
              disabled={safeCurrentPage === totalPages}
              style={{ opacity: safeCurrentPage === totalPages ? 0.5 : 1, cursor: safeCurrentPage === totalPages ? 'not-allowed' : 'pointer' }}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
      
      <NewBookingModal 
        isOpen={isNewBookingModalOpen} 
        onClose={() => setIsNewBookingModalOpen(false)} 
        onBookingAdded={handleBookingAdded}
        bookingToEdit={bookingToEdit}
      />

      <FilterBookingsModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={(newFilters) => {
          setFilters(newFilters);
          setCurrentPage(1); // Reset page on filter
        }}
        currentFilters={filters}
      />

      <Toast 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
        message={toastMessage} 
        actionText={pendingDeleteId ? 'Undo' : undefined}
        onAction={pendingDeleteId ? handleUndo : undefined}
        duration={pendingDeleteId ? 5000 : 3000}
      />
    </div>
  );
};
