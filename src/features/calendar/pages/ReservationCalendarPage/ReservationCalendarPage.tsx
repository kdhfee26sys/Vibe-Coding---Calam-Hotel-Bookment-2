import React, { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '../../../../components/design-system/Button/Button';
import styles from './ReservationCalendarPage.module.css';

// Hardcoded dates for the grid based on Figma design
const dates = [
  '28/07', '29/07', '30/07', '31/07', '01/08', 
  '02/08', '03/08', '04/08', '05/08', '06/08'
];

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

// Hardcoded reservations mapped to grid positions
// Column 1 is Room Info. Columns 2 to 11 are dates.
const reservations = [
  { room: '102', name: 'Erika', startCol: 2, span: 2 }, // 28/07 to 29/07
  { room: '105', name: 'Bagas', startCol: 5, span: 1 }, // 31/07
  { room: '203', name: 'Andini', startCol: 5, span: 2 }, // 31/07 to 01/08
  { room: '204', name: 'Dimas', startCol: 8, span: 3 }, // 04/08 to 06/08
  { room: '301', name: 'Clara', startCol: 3, span: 4 }, // 29/07 to 01/08
];

export const ReservationCalendarPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'harian' | 'mingguan' | 'bulanan'>('mingguan');

  return (
    <div className={styles.pageContainer}>
      
      {/* Header Area */}
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>Reservation Calendar</h1>
          <p className={styles.subtitle}>Tampilan mingguan · minggu 1</p>
        </div>
        
        <div className={styles.actionArea}>
          <div className={styles.toggleGroup}>
            <button 
              className={`${styles.toggleButton} ${viewMode === 'harian' ? styles.active : ''}`}
              onClick={() => setViewMode('harian')}
            >
              Harian
            </button>
            <button 
              className={`${styles.toggleButton} ${viewMode === 'mingguan' ? styles.active : ''}`}
              onClick={() => setViewMode('mingguan')}
            >
              Mingguan
            </button>
            <button 
              className={`${styles.toggleButton} ${viewMode === 'bulanan' ? styles.active : ''}`}
              onClick={() => setViewMode('bulanan')}
            >
              Bulanan
            </button>
          </div>
          
          <button className={styles.filterSelect}>
            Semua tipe <ChevronDown size={16} />
          </button>
          
          <button className={styles.iconButton}>
            <ChevronLeft size={18} />
          </button>
          <button className={styles.iconButton}>
            <ChevronRight size={18} />
          </button>
          
          <Button variant="primary">
            <Plus size={16} />
            New Booking
          </Button>
        </div>
      </header>

      {/* Calendar Card */}
      <div className={`${styles.card} animate-pop-in`}>
        <div className={styles.calendarWrapper}>
          <div className={styles.calendarGrid}>
            
            {/* Header Row */}
            <div className={styles.gridRow}>
              <div className={`${styles.gridHeader} ${styles.roomHeader}`}>
                Kamar
              </div>
              {dates.map(date => (
                <div key={date} className={styles.gridHeader}>
                  {date}
                </div>
              ))}
            </div>

            {/* Room Rows */}
            {rooms.map((room) => {
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
                  {/* We render exactly 10 empty cells for the grid background */}
                  {dates.map((date, index) => (
                    <div key={`${room.id}-${date}`} className={styles.dateCell}>
                      {/* Check if a reservation starts exactly at this column */}
                      {roomReservations.find(r => r.startCol - 2 === index) && (() => {
                        const res = roomReservations.find(r => r.startCol - 2 === index)!;
                        return (
                          <div 
                            className={styles.reservationBlock}
                            style={{ 
                              // Position the block using absolute positioning relative to the cell, 
                              // or just make it span across. Since it's inside the cell, we can set width
                              // based on the span. 100% is 1 cell, 200% is 2 cells, etc. plus borders.
                              // Actually, CSS Grid would be better if blocks were direct children of .calendarGrid.
                              // But since they are inside .dateCell, we can use absolute positioning to span over the next cells.
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
            <span>Terisi</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.kosong}`}></div>
            <span>Kosong</span>
          </div>
          
          <div className={styles.legendAction}>
            Tampilkan sebagai list
          </div>
        </div>
      </div>
      
    </div>
  );
};
