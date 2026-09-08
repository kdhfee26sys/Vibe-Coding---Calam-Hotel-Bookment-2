import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, Calendar as CalendarIcon, User, Bed, CreditCard, ShieldCheck } from 'lucide-react';
import { Select } from '../../../../components/design-system/Select/Select';
import { Button } from '../../../../components/design-system/Button/Button';
import styles from './ReservationCalendarPage.module.css';

interface Booking {
  id: string;
  guestName: string;
  room: string;
  roomNumber?: string;
  roomType?: string;
  checkIn: string;
  checkOut: string;
  source?: string;
  status?: 'Confirmed' | 'Pending' | 'Checked-in' | 'Checked-out';
  payment?: 'Paid' | 'Unpaid' | 'Partial';
  total?: string;
}

interface Room {
  id: string;
  type: string;
  floor?: string;
  status?: string;
}

const DEFAULT_ROOMS: Room[] = [
  { id: '101', type: 'Standard', floor: '1' },
  { id: '102', type: 'Standard', floor: '1' },
  { id: '105', type: 'Standard', floor: '1' },
  { id: '203', type: 'Deluxe', floor: '2' },
  { id: '204', type: 'Deluxe', floor: '2' },
  { id: '205', type: 'Deluxe', floor: '2' },
  { id: '301', type: 'Suite', floor: '3' },
  { id: '302', type: 'Suite', floor: '3' },
  { id: '305', type: 'Suite', floor: '3' },
];

const FULL_YEAR_MONTHS = [
  { label: 'Januari 2026', value: '2026-01-01', monthName: 'Jan', index: 0 },
  { label: 'Februari 2026', value: '2026-02-01', monthName: 'Feb', index: 1 },
  { label: 'Maret 2026', value: '2026-03-01', monthName: 'Mar', index: 2 },
  { label: 'April 2026', value: '2026-04-01', monthName: 'Apr', index: 3 },
  { label: 'Mei 2026', value: '2026-05-01', monthName: 'Mei', index: 4 },
  { label: 'Juni 2026', value: '2026-06-01', monthName: 'Jun', index: 5 },
  { label: 'Juli 2026', value: '2026-07-28', monthName: 'Jul', index: 6 },
  { label: 'Agustus 2026', value: '2026-08-01', monthName: 'Agu', index: 7 },
  { label: 'September 2026', value: '2026-09-01', monthName: 'Sep', index: 8 },
  { label: 'Oktober 2026', value: '2026-10-01', monthName: 'Okt', index: 9 },
  { label: 'November 2026', value: '2026-11-01', monthName: 'Nov', index: 10 },
  { label: 'Desember 2026', value: '2026-12-01', monthName: 'Des', index: 11 },
];

const DEFAULT_BOOKINGS: Booking[] = [
  // Januari 2026
  {
    id: 'BK-1011',
    guestName: 'Rahmat',
    room: '101 · Standard',
    roomNumber: '101',
    roomType: 'Standard',
    checkIn: '2026-01-10',
    checkOut: '2026-01-14',
    source: 'Website',
    status: 'Confirmed',
    payment: 'Paid',
    total: 'Rp 2.000.000'
  },
  {
    id: 'BK-1012',
    guestName: 'Siska',
    room: '203 · Deluxe',
    roomNumber: '203',
    roomType: 'Deluxe',
    checkIn: '2026-01-20',
    checkOut: '2026-01-25',
    source: 'Agoda',
    status: 'Confirmed',
    payment: 'Paid',
    total: 'Rp 3.000.000'
  },

  // Februari 2026
  {
    id: 'BK-1015',
    guestName: 'David',
    room: '102 · Standard',
    roomNumber: '102',
    roomType: 'Standard',
    checkIn: '2026-02-05',
    checkOut: '2026-02-09',
    source: 'Traveloka',
    status: 'Confirmed',
    payment: 'Paid',
    total: 'Rp 2.000.000'
  },
  {
    id: 'BK-1016',
    guestName: 'Maya',
    room: '301 · Suite',
    roomNumber: '301',
    roomType: 'Suite',
    checkIn: '2026-02-14',
    checkOut: '2026-02-18',
    source: 'Direct',
    status: 'Confirmed',
    payment: 'Paid',
    total: 'Rp 7.000.000'
  },

  // Maret 2026
  {
    id: 'BK-1020',
    guestName: 'Wahyu',
    room: '105 · Standard',
    roomNumber: '105',
    roomType: 'Standard',
    checkIn: '2026-03-08',
    checkOut: '2026-03-12',
    source: 'Booking.com',
    status: 'Confirmed',
    payment: 'Paid',
    total: 'Rp 2.000.000'
  },
  {
    id: 'BK-1021',
    guestName: 'Cynthia',
    room: '204 · Deluxe',
    roomNumber: '204',
    roomType: 'Deluxe',
    checkIn: '2026-03-22',
    checkOut: '2026-03-26',
    source: 'Website',
    status: 'Confirmed',
    payment: 'Paid',
    total: 'Rp 3.200.000'
  },

  // April 2026
  {
    id: 'BK-1025',
    guestName: 'Aldi',
    room: '205 · Deluxe',
    roomNumber: '205',
    roomType: 'Deluxe',
    checkIn: '2026-04-12',
    checkOut: '2026-04-16',
    source: 'Agoda',
    status: 'Confirmed',
    payment: 'Paid',
    total: 'Rp 3.200.000'
  },
  {
    id: 'BK-1026',
    guestName: 'Felicia',
    room: '302 · Suite',
    roomNumber: '302',
    roomType: 'Suite',
    checkIn: '2026-04-25',
    checkOut: '2026-04-29',
    source: 'Traveloka',
    status: 'Confirmed',
    payment: 'Paid',
    total: 'Rp 7.000.000'
  },

  // Mei 2026
  {
    id: 'BK-1030',
    guestName: 'Joni',
    room: '101 · Standard',
    roomNumber: '101',
    roomType: 'Standard',
    checkIn: '2026-05-02',
    checkOut: '2026-05-06',
    source: 'Website',
    status: 'Confirmed',
    payment: 'Paid',
    total: 'Rp 2.000.000'
  },
  {
    id: 'BK-1031',
    guestName: 'Jessica',
    room: '203 · Deluxe',
    roomNumber: '203',
    roomType: 'Deluxe',
    checkIn: '2026-05-18',
    checkOut: '2026-05-22',
    source: 'Booking.com',
    status: 'Confirmed',
    payment: 'Paid',
    total: 'Rp 3.200.000'
  },

  // Juni 2026
  {
    id: 'BK-1035',
    guestName: 'Toni',
    room: '102 · Standard',
    roomNumber: '102',
    roomType: 'Standard',
    checkIn: '2026-06-10',
    checkOut: '2026-06-15',
    source: 'Walk-in',
    status: 'Confirmed',
    payment: 'Paid',
    total: 'Rp 2.500.000'
  },
  {
    id: 'BK-1036',
    guestName: 'Robert',
    room: '305 · Suite',
    roomNumber: '305',
    roomType: 'Suite',
    checkIn: '2026-06-20',
    checkOut: '2026-06-25',
    source: 'Agoda',
    status: 'Confirmed',
    payment: 'Paid',
    total: 'Rp 8.750.000'
  },

  // Juli 2026 (Active week default)
  {
    id: 'BK-1046',
    guestName: 'Erika',
    room: '102 · Standard',
    roomNumber: '102',
    roomType: 'Standard',
    checkIn: '2026-07-28',
    checkOut: '2026-07-30',
    source: 'Agoda',
    status: 'Confirmed',
    payment: 'Paid',
    total: 'Rp 1.500.000'
  },
  {
    id: 'BK-1043',
    guestName: 'Bagas',
    room: '105 · Standard',
    roomNumber: '105',
    roomType: 'Standard',
    checkIn: '2026-07-31',
    checkOut: '2026-08-01',
    source: 'Traveloka',
    status: 'Pending',
    payment: 'Unpaid',
    total: 'Rp 750.000'
  },
  {
    id: 'BK-1042',
    guestName: 'Andini',
    room: '203 · Deluxe',
    roomNumber: '203',
    roomType: 'Deluxe',
    checkIn: '2026-07-31',
    checkOut: '2026-08-02',
    source: 'Website',
    status: 'Confirmed',
    payment: 'Paid',
    total: 'Rp 2.400.000'
  },
  {
    id: 'BK-1044',
    guestName: 'Clara',
    room: '301 · Suite',
    roomNumber: '301',
    roomType: 'Suite',
    checkIn: '2026-07-29',
    checkOut: '2026-08-02',
    source: 'Walk-in',
    status: 'Checked-in',
    payment: 'Partial',
    total: 'Rp 8.750.000'
  },

  // Agustus 2026
  {
    id: 'BK-1045',
    guestName: 'Dimas',
    room: '204 · Deluxe',
    roomNumber: '204',
    roomType: 'Deluxe',
    checkIn: '2026-08-03',
    checkOut: '2026-08-05',
    source: 'Booking.com',
    status: 'Confirmed',
    payment: 'Paid',
    total: 'Rp 3.600.000'
  },
  {
    id: 'BK-1048',
    guestName: 'Budi',
    room: '101 · Standard',
    roomNumber: '101',
    roomType: 'Standard',
    checkIn: '2026-08-15',
    checkOut: '2026-08-19',
    source: 'Direct',
    status: 'Confirmed',
    payment: 'Paid',
    total: 'Rp 2.000.000'
  },

  // September 2026
  {
    id: 'BK-1050',
    guestName: 'Sarah',
    room: '205 · Deluxe',
    roomNumber: '205',
    roomType: 'Deluxe',
    checkIn: '2026-09-10',
    checkOut: '2026-09-14',
    source: 'Website',
    status: 'Confirmed',
    payment: 'Paid',
    total: 'Rp 3.200.000'
  },
  {
    id: 'BK-1051',
    guestName: 'Hendra',
    room: '302 · Suite',
    roomNumber: '302',
    roomType: 'Suite',
    checkIn: '2026-09-22',
    checkOut: '2026-09-26',
    source: 'Traveloka',
    status: 'Confirmed',
    payment: 'Paid',
    total: 'Rp 7.000.000'
  },

  // Oktober 2026
  {
    id: 'BK-1055',
    guestName: 'Rian',
    room: '105 · Standard',
    roomNumber: '105',
    roomType: 'Standard',
    checkIn: '2026-10-05',
    checkOut: '2026-10-09',
    source: 'Booking.com',
    status: 'Confirmed',
    payment: 'Paid',
    total: 'Rp 2.000.000'
  },
  {
    id: 'BK-1056',
    guestName: 'Nadia',
    room: '203 · Deluxe',
    roomNumber: '203',
    roomType: 'Deluxe',
    checkIn: '2026-10-18',
    checkOut: '2026-10-22',
    source: 'Agoda',
    status: 'Confirmed',
    payment: 'Paid',
    total: 'Rp 3.200.000'
  },

  // November 2026
  {
    id: 'BK-1060',
    guestName: 'Kevin',
    room: '102 · Standard',
    roomNumber: '102',
    roomType: 'Standard',
    checkIn: '2026-11-12',
    checkOut: '2026-11-16',
    source: 'Website',
    status: 'Confirmed',
    payment: 'Paid',
    total: 'Rp 2.000.000'
  },
  {
    id: 'BK-1061',
    guestName: 'Putri',
    room: '204 · Deluxe',
    roomNumber: '204',
    roomType: 'Deluxe',
    checkIn: '2026-11-24',
    checkOut: '2026-11-28',
    source: 'Traveloka',
    status: 'Confirmed',
    payment: 'Paid',
    total: 'Rp 3.200.000'
  },

  // Desember 2026
  {
    id: 'BK-1065',
    guestName: 'Reza',
    room: '301 · Suite',
    roomNumber: '301',
    roomType: 'Suite',
    checkIn: '2026-12-24',
    checkOut: '2026-12-28',
    source: 'Direct',
    status: 'Confirmed',
    payment: 'Paid',
    total: 'Rp 8.750.000'
  },
  {
    id: 'BK-1066',
    guestName: 'Natasha',
    room: '203 · Deluxe',
    roomNumber: '203',
    roomType: 'Deluxe',
    checkIn: '2026-12-29',
    checkOut: '2027-01-02',
    source: 'Agoda',
    status: 'Confirmed',
    payment: 'Paid',
    total: 'Rp 4.000.000'
  }
];

export const ReservationCalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'Daily' | 'Weekly' | 'Monthly'>('Weekly');
  const [selectedRoomType, setSelectedRoomType] = useState('All types');
  const [selectedMonth, setSelectedMonth] = useState('2026-07-28');
  const [currentDate, setCurrentDate] = useState<Date>(new Date('2026-07-28'));
  
  const [bookings, setBookings] = useState<Booking[]>(DEFAULT_BOOKINGS);
  const [rooms, setRooms] = useState<Room[]>(DEFAULT_ROOMS);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Fetch bookings and rooms from backend API if available
  const fetchCalendarData = async () => {
    try {
      const [bookingsRes, roomsRes] = await Promise.all([
        fetch('http://localhost:3000/api/bookings'),
        fetch('http://localhost:3000/api/rooms'),
      ]);

      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json();
        if (Array.isArray(bookingsData) && bookingsData.length > 0) {
          // Merge API data with default bookings
          const existingIds = new Set(bookingsData.map((b: any) => b.id));
          const merged = [...bookingsData, ...DEFAULT_BOOKINGS.filter(b => !existingIds.has(b.id))];
          setBookings(merged);
        }
      }

      if (roomsRes.ok) {
        const roomsData = await roomsRes.json();
        if (Array.isArray(roomsData) && roomsData.length > 0) {
          const mappedRooms: Room[] = roomsData.map((r: any) => ({
            id: r.roomNumber || r.id,
            type: r.type || 'Standard',
            floor: r.floor || '1',
            status: r.status || 'available'
          }));
          setRooms(mappedRooms);
        }
      }
    } catch (err) {
      // Use fallback default data
    }
  };

  useEffect(() => {
    fetchCalendarData();
  }, []);

  // Format Helper: YYYY-MM-DD
  const toISODate = (d: Date): string => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Handler for Month selection
  const handleMonthChange = (val: string) => {
    setSelectedMonth(val);
    setCurrentDate(new Date(val));
  };

  // Navigate Prev / Next
  const handlePrev = () => {
    setCurrentDate(prev => {
      const next = new Date(prev);
      if (viewMode === 'Daily') next.setDate(prev.getDate() - 1);
      else if (viewMode === 'Weekly') next.setDate(prev.getDate() - 7);
      else next.setFullYear(prev.getFullYear() - 1);
      return next;
    });
  };

  const handleNext = () => {
    setCurrentDate(prev => {
      const next = new Date(prev);
      if (viewMode === 'Daily') next.setDate(prev.getDate() + 1);
      else if (viewMode === 'Weekly') next.setDate(prev.getDate() + 7);
      else next.setFullYear(prev.getFullYear() + 1);
      return next;
    });
  };

  // Generate dynamic date columns based on viewMode
  const { dateColumns, subtitle } = useMemo(() => {
    const cols: { dateObj?: Date; dateStr: string; display: string; isMonthView?: boolean; monthIdx?: number }[] = [];

    let sub = '';

    if (viewMode === 'Daily') {
      for (let i = 0; i < 7; i++) {
        const d = new Date(currentDate);
        d.setDate(currentDate.getDate() + i);
        const iso = toISODate(d);
        const dayStr = String(d.getDate()).padStart(2, '0');
        const monthStr = String(d.getMonth() + 1).padStart(2, '0');
        cols.push({
          dateObj: d,
          dateStr: iso,
          display: `${dayStr}/${monthStr}`,
        });
      }
      sub = `Daily view • ${cols[0]?.display || ''} - ${cols[cols.length - 1]?.display || ''}`;
    } else if (viewMode === 'Weekly') {
      // 7 days weekly window
      for (let i = 0; i < 7; i++) {
        const d = new Date(currentDate);
        d.setDate(currentDate.getDate() + i);
        const iso = toISODate(d);
        const dayStr = String(d.getDate()).padStart(2, '0');
        const monthStr = String(d.getMonth() + 1).padStart(2, '0');
        cols.push({
          dateObj: d,
          dateStr: iso,
          display: `${dayStr}/${monthStr}`,
        });
      }
      sub = 'Weekly view • Week 1';
    } else {
      // Monthly view: 12 months full year (Januari - Desember 2026)
      FULL_YEAR_MONTHS.forEach((m) => {
        cols.push({
          dateStr: m.value,
          display: `${m.monthName} '26`,
          isMonthView: true,
          monthIdx: m.index,
        });
      });
      sub = 'Monthly view • Januari - Desember 2026';
    }

    return { dateColumns: cols, subtitle: sub };
  }, [viewMode, currentDate]);

  // Filter rooms based on selected room type
  const filteredRooms = useMemo(() => {
    return selectedRoomType === 'All types'
      ? rooms
      : rooms.filter(room => room.type.toLowerCase().includes(selectedRoomType.toLowerCase()));
  }, [rooms, selectedRoomType]);

  // Compute reservation blocks positioned on the grid
  const getRoomReservations = (roomId: string) => {
    if (dateColumns.length === 0) return [];

    // Filter bookings for this room number
    const roomBookings = bookings.filter(b => {
      const num = b.roomNumber || b.room.split(/[\s·]/)[0];
      return num === roomId;
    });

    const placements: { booking: Booking; startIndex: number; span: number }[] = [];

    if (viewMode === 'Monthly') {
      // Map bookings by month index (0 to 11 for Jan-Dec 2026)
      for (const b of roomBookings) {
        const startMonth = parseInt(b.checkIn.split('-')[1], 10) - 1;
        const endMonth = parseInt(b.checkOut.split('-')[1], 10) - 1;
        const startYear = parseInt(b.checkIn.split('-')[0], 10);
        
        if (startYear === 2026 && startMonth >= 0 && startMonth < 12) {
          const span = Math.max(1, endMonth >= startMonth ? endMonth - startMonth + 1 : 1);
          placements.push({
            booking: b,
            startIndex: startMonth,
            span
          });
        }
      }
    } else {
      // Daily / Weekly view (match by exact ISO date string)
      const firstDateStr = dateColumns[0].dateStr;
      const lastDateStr = dateColumns[dateColumns.length - 1].dateStr;

      for (const b of roomBookings) {
        if (b.checkIn <= lastDateStr && b.checkOut >= firstDateStr) {
          let startIndex = dateColumns.findIndex(col => col.dateStr === b.checkIn);
          if (startIndex === -1) {
            if (b.checkIn < firstDateStr) {
              startIndex = 0;
            } else {
              continue;
            }
          }

          let endIndex = dateColumns.findIndex(col => col.dateStr === b.checkOut);
          if (endIndex === -1) {
            endIndex = dateColumns.length;
          }

          const span = Math.max(1, endIndex - startIndex);

          placements.push({
            booking: b,
            startIndex,
            span
          });
        }
      }
    }

    return placements;
  };

  return (
    <div className={styles.pageContainer}>
      
      {/* Header Area */}
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>Reservation Calendar</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        
        <div className={styles.actionArea}>
          {/* Navigation Stepper (Chevron Buttons) */}
          <div className={styles.navButtonsGroup}>
            <button className={styles.iconButton} onClick={handlePrev} title="Previous">
              <ChevronLeft size={16} />
            </button>
            <button className={styles.iconButton} onClick={handleNext} title="Next">
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Month Selector for quick jump across 1 year (Januari - Desember) */}
          {viewMode !== 'Monthly' && (
            <Select
              options={FULL_YEAR_MONTHS.map(m => ({ label: m.label, value: m.value }))}
              value={selectedMonth}
              onChange={handleMonthChange}
            />
          )}

          {/* View Mode Toggle */}
          <div className={styles.toggleGroup}>
            <button 
              className={`${styles.toggleButton} ${viewMode === 'Daily' ? styles.active : ''}`}
              onClick={() => setViewMode('Daily')}
            >
              Daily
            </button>
            <button 
              className={`${styles.toggleButton} ${viewMode === 'Weekly' ? styles.active : ''}`}
              onClick={() => setViewMode('Weekly')}
            >
              Weekly
            </button>
            <button 
              className={`${styles.toggleButton} ${viewMode === 'Monthly' ? styles.active : ''}`}
              onClick={() => setViewMode('Monthly')}
            >
              Monthly
            </button>
          </div>

          {/* Room Type Selector */}
          <Select
            options={['All types', 'Standard', 'Deluxe', 'Suite']}
            value={selectedRoomType}
            onChange={(type) => setSelectedRoomType(type)}
          />
        </div>
      </header>

      {/* Calendar Card */}
      <div className={`${styles.card} animate-pop-in`}>
        <div className={styles.calendarWrapper}>
          <div 
            className={styles.calendarGrid} 
            style={{ 
              gridTemplateColumns: `140px repeat(${dateColumns.length}, minmax(${viewMode === 'Monthly' ? '85px' : '100px'}, 1fr))` 
            }}
          >
            
            {/* Header Row */}
            <div className={styles.gridRow}>
              <div className={`${styles.gridHeader} ${styles.roomHeader}`}>
                Room
              </div>
              {dateColumns.map(col => (
                <div 
                  key={col.dateStr} 
                  className={styles.gridHeader}
                >
                  {col.display}
                </div>
              ))}
            </div>

            {/* Room Rows */}
            {filteredRooms.map((room) => {
              const roomReservations = getRoomReservations(room.id);
              
              return (
                <div key={room.id} className={styles.gridRow}>
                  {/* Room Info Cell */}
                  <div className={styles.roomInfoCell}>
                    <span className={styles.roomNumber}>{room.id}</span>
                    <span className={styles.roomType}>{room.type}</span>
                  </div>
                  
                  {/* Date / Month Cells */}
                  {dateColumns.map((col, index) => {
                    const startingReservation = roomReservations.find(r => r.startIndex === index);

                    return (
                      <div 
                        key={`${room.id}-${col.dateStr}`} 
                        className={styles.dateCell}
                      >
                        {startingReservation && (
                          <div 
                            className={styles.reservationBlock}
                            style={{ 
                              width: `calc(${startingReservation.span * 100}% + ${(startingReservation.span - 1) * 1}px)`,
                            }}
                            onClick={() => setSelectedBooking(startingReservation.booking)}
                            title={`${startingReservation.booking.guestName} (${startingReservation.booking.room}) - ${startingReservation.booking.checkIn} to ${startingReservation.booking.checkOut}`}
                          >
                            {startingReservation.booking.guestName}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Legend */}
        <div className={styles.legendArea}>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.terisi}`}></div>
            <span>Occupied</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.kosong}`}></div>
            <span>Available</span>
          </div>

          <button 
            type="button"
            className={styles.viewAsListBtn}
            onClick={() => navigate('/bookings')}
          >
            View as list
          </button>
        </div>
      </div>

      {/* Booking Details Modal Popup */}
      {selectedBooking && (
        <div className={styles.modalBackdrop} onClick={() => setSelectedBooking(null)}>
          <div className={`${styles.modalContent} animate-pop-in`} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Reservation Details</h3>
              <button className={styles.closeBtn} onClick={() => setSelectedBooking(null)}>
                <X size={18} />
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Booking ID</span>
                <span className={styles.detailValue}>{selectedBooking.id}</span>
              </div>
              
              <div className={styles.detailRow}>
                <span className={styles.detailLabel} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <User size={14} /> Guest Name
                </span>
                <span className={styles.detailValue}>{selectedBooking.guestName}</span>
              </div>

              <div className={styles.detailRow}>
                <span className={styles.detailLabel} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Bed size={14} /> Room
                </span>
                <span className={styles.detailValue}>{selectedBooking.room}</span>
              </div>

              <div className={styles.detailRow}>
                <span className={styles.detailLabel} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CalendarIcon size={14} /> Check-in
                </span>
                <span className={styles.detailValue}>{selectedBooking.checkIn}</span>
              </div>

              <div className={styles.detailRow}>
                <span className={styles.detailLabel} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CalendarIcon size={14} /> Check-out
                </span>
                <span className={styles.detailValue}>{selectedBooking.checkOut}</span>
              </div>

              {selectedBooking.status && (
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={14} /> Status
                  </span>
                  <span 
                    className={styles.statusBadge}
                    style={{
                      backgroundColor: selectedBooking.status === 'Checked-in' ? '#d1fae5' : selectedBooking.status === 'Confirmed' ? 'var(--color-bg-bg-color-bg-brand-primary)' : '#fef3c7',
                      color: selectedBooking.status === 'Checked-in' ? '#065f46' : selectedBooking.status === 'Confirmed' ? 'var(--color-text-text-color-text-brand-primary)' : '#92400e',
                    }}
                  >
                    {selectedBooking.status}
                  </span>
                </div>
              )}

              {selectedBooking.total && (
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CreditCard size={14} /> Total / Payment
                  </span>
                  <span className={styles.detailValue}>
                    {selectedBooking.total} {selectedBooking.payment ? `(${selectedBooking.payment})` : ''}
                  </span>
                </div>
              )}

              <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="secondary" onClick={() => setSelectedBooking(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};
