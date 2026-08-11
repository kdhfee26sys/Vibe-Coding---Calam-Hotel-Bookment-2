import React from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { Button } from '../../../../components/design-system/Button/Button';
import styles from './RoomManagementPage.module.css';

const initialRooms = [
  { id: '101', type: 'Standard', floor: 1, price: 'Rp 750.000/Night', housekeeping: 'Clean', status: 'Available' },
  { id: '102', type: 'Standard', floor: 1, price: 'Rp 750.000/Night', housekeeping: 'Clean', status: 'Dirty' },
  { id: '105', type: 'Standard', floor: 1, price: 'Rp 750.000/Night', housekeeping: 'Inspected', status: 'Available' },
  { id: '203', type: 'Deluxe', floor: 2, price: 'Rp 750.000/Night', housekeeping: 'Clean', status: 'Occupied' },
  { id: '204', type: 'Deluxe', floor: 2, price: 'Rp 1.200.000/malam', housekeeping: 'Clean', status: 'Available' },
  { id: '205', type: 'Deluxe', floor: 2, price: 'Rp 1.200.000/malam', housekeeping: 'Dirty', status: 'Maintenance' },
  { id: '301', type: 'Suite', floor: 3, price: 'Rp 1.750.000/Night', housekeeping: 'In Progress', status: 'Occupied' },
  { id: '302', type: 'Suite', floor: 3, price: 'Rp 1.750.000/Night', housekeeping: 'In Progress', status: 'Available' },
];

export const RoomManagementPage: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Page Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Room Management</h1>
          <p className={styles.subtitle}>8 kamar terdaftar - 4 siap dijual.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.dropdownButton}>
            All Status <ChevronDown size={16} />
          </button>
          <Button><Plus size={16} /> Add Room</Button>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className={styles.roomsGrid}>
        {initialRooms.map((room, index) => (
          <div 
            key={room.id} 
            className={`${styles.card} animate-pop-in`} 
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className={styles.cardHeader}>
              <div>
                <h3 className={styles.roomName}>Room {room.id}</h3>
                <p className={styles.roomType}>{room.type} &middot; Floor {room.floor}</p>
              </div>
              <span className={`${styles.badge} ${styles[`badge${room.status}`]}`}>
                {room.status}
              </span>
            </div>
            
            <div className={styles.priceSection}>
              <p className={styles.price}>{room.price}</p>
              <p className={styles.housekeeping}>Housekeeping: {room.housekeeping}</p>
            </div>

            <div className={styles.actionsRow}>
              {['Occupied', 'Dirty', 'Maintenance', 'Available']
                .filter(action => action !== room.status)
                .slice(0, 3)
                .map(action => (
                  <button key={action} className={styles.actionButton}>
                    {action}
                  </button>
                ))
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
