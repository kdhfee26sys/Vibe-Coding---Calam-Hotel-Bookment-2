import React, { useState } from 'react';
import { Select } from '../../../../components/design-system/Select/Select';
import styles from './ReservationCalendarPage.module.css';

// Hardcoded room data
const rooms = [
  { id: '101', type: 'Standard' },
  { id: '102', type: 'Standard' },
  { id: '105', type: 'Standard' },
  { id: '203', type: 'Deluxe' },
  { id: '204', type: 'Deluxe' },
  { id: '205', type: 'Deluxe' },
  { id: '301', type: 'Suite' },
  { id: '302', type: 'Suite' },
  { id: '305', type: 'Suite' },
];

// Dynamic data for different views
const viewData = {
  harian: {
    subtitle: 'Daily view · 29 July 2026',
    dates: ['28/07', '29/07', '30/07'],
    reservations: [
      { room: '102', name: 'Erika', startIndex: 0, span: 2 },
      { room: '301', name: 'Clara', startIndex: 1, span: 2 },
      { room: '204', name: 'Dimas', startIndex: 1, span: 1 },
    ]
  },
  mingguan: {
    subtitle: 'Weekly view · Week 1',
    dates: ['28/07', '29/07', '30/07', '31/07', '01/08', '02/08', '03/08'],
    reservations: [
      { room: '102', name: 'Erika', startIndex: 0, span: 2 },
      { room: '105', name: 'Bagas', startIndex: 3, span: 1 },
      { room: '203', name: 'Andini', startIndex: 3, span: 2 },
      { room: '204', name: 'Dimas', startIndex: 6, span: 1 },
      { room: '301', name: 'Clara', startIndex: 1, span: 4 },
    ]
  },
  bulanan: {
    subtitle: 'Monthly view · July 2026',
    dates: ['01-03', '04-06', '07-09', '10-12', '13-15', '16-18', '19-21', '22-24', '25-27', '28-31'],
    reservations: [
      { room: '101', name: 'Bagas', startIndex: 2, span: 2 },
      { room: '204', name: 'Dimas', startIndex: 5, span: 3 },
      { room: '302', name: 'Siti', startIndex: 1, span: 4 },
      { room: '305', name: 'Reza', startIndex: 7, span: 2 },
    ]
  }
};

export const ReservationCalendarPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'harian' | 'mingguan' | 'bulanan'>('mingguan');
  const [selectedRoomType, setSelectedRoomType] = useState('All types');

  const handleRoomTypeSelect = (type: string) => {
    setSelectedRoomType(type);
  };

  const currentData = viewData[viewMode];
  const { dates, reservations, subtitle } = currentData;

  // Filter rooms based on selected room type
  const filteredRooms = selectedRoomType === 'All types' 
    ? rooms 
    : rooms.filter(room => room.type === selectedRoomType);

  return (
    <div className={styles.pageContainer}>
      
      {/* Header Area */}
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>Reservation Calendar</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        
        <div className={styles.actionArea}>
          <div className={styles.toggleGroup}>
            <button 
              className={`${styles.toggleButton} ${viewMode === 'harian' ? styles.active : ''}`}
              onClick={() => setViewMode('harian')}
            >
              Daily
            </button>
            <button 
              className={`${styles.toggleButton} ${viewMode === 'mingguan' ? styles.active : ''}`}
              onClick={() => setViewMode('mingguan')}
            >
              Weekly
            </button>
            <button 
              className={`${styles.toggleButton} ${viewMode === 'bulanan' ? styles.active : ''}`}
              onClick={() => setViewMode('bulanan')}
            >
              Monthly
            </button>
          </div>
          <Select
            options={['All types', 'Standard', 'Deluxe', 'Suite']}
            value={selectedRoomType}
            onChange={handleRoomTypeSelect}
          />
        </div>
      </header>

      {/* Calendar Card */}
      <div className={`${styles.card} animate-pop-in`}>
        <div className={styles.calendarWrapper}>
          <div className={styles.calendarGrid} style={{ gridTemplateColumns: `140px repeat(${dates.length}, minmax(0, 1fr))` }}>
            
            {/* Header Row */}
            <div className={styles.gridRow}>
              <div className={`${styles.gridHeader} ${styles.roomHeader}`}>
                Room
              </div>
              {dates.map(date => (
                <div key={date} className={styles.gridHeader}>
                  {date}
                </div>
              ))}
            </div>

            {/* Room Rows */}
            {filteredRooms.map((room) => {
              // Find reservations for this room
              const roomReservations = reservations.filter(r => r.room === room.id);
              
              return (
                <div key={room.id} className={styles.gridRow}>
                  {/* Room Info Cell */}
                  <div className={styles.roomInfoCell}>
                    <span className={styles.roomNumber}>{room.id}</span>
                    <span className={styles.roomType}>{room.type}</span>
                  </div>
                  
                  {/* Date Cells */}
                  {dates.map((date, index) => (
                    <div key={`${room.id}-${date}`} className={styles.dateCell}>
                      {/* Check if a reservation starts exactly at this column */}
                      {roomReservations.find(r => r.startIndex === index) && (() => {
                        const res = roomReservations.find(r => r.startIndex === index)!;
                        return (
                          <div 
                            className={styles.reservationBlock}
                            style={{ 
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: `calc(${res.span * 100}% + ${res.span - 1}px)`,
                              height: '100%',
                            }}
                          >
                            {res.name}
                          </div>
                        );
                      })()}
                    </div>
                  ))}
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
          
          <div className={styles.legendAction}>
            View as list
          </div>
        </div>
      </div>
      
    </div>
  );
};
