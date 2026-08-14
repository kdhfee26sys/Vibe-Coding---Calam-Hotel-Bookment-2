import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../../../../components/design-system/Button/Button';
import { Select } from '../../../../components/design-system/Select/Select';
import { Toast } from '../../../../components/shared/Toast/Toast';
import { NewRoomModal } from '../../components/NewRoomModal/NewRoomModal';
import styles from './RoomManagementPage.module.css';

const initialRooms = [
  { id: '101', type: 'Standard', floor: 1, price: 'Rp 750.000/Night', housekeeping: 'Clean', status: 'Available' },
  { id: '102', type: 'Standard', floor: 1, price: 'Rp 750.000/Night', housekeeping: 'Clean', status: 'Dirty' },
  { id: '105', type: 'Standard', floor: 1, price: 'Rp 750.000/Night', housekeeping: 'Inspected', status: 'Available' },
  { id: '203', type: 'Deluxe', floor: 2, price: 'Rp 750.000/Night', housekeeping: 'Clean', status: 'Occupied' },
  { id: '204', type: 'Deluxe', floor: 2, price: 'Rp 1.200.000/Night', housekeeping: 'Clean', status: 'Available' },
  { id: '205', type: 'Deluxe', floor: 2, price: 'Rp 1.200.000/Night', housekeeping: 'Dirty', status: 'Maintenance' },
  { id: '301', type: 'Suite', floor: 3, price: 'Rp 1.750.000/Night', housekeeping: 'In Progress', status: 'Occupied' },
  { id: '302', type: 'Suite', floor: 3, price: 'Rp 1.750.000/Night', housekeeping: 'In Progress', status: 'Available' },
];

export const RoomManagementPage: React.FC = () => {
  const [rooms, setRooms] = useState(initialRooms);
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isNewRoomModalOpen, setIsNewRoomModalOpen] = useState(false);

  const readyToSellCount = rooms.filter(room => room.status === 'Available').length;
  const filteredRooms = rooms.filter(room => statusFilter === 'All Status' || room.status === statusFilter);

  const handleStatusChange = (roomId: string, newStatus: string) => {
    setRooms(prevRooms => prevRooms.map(room => 
      room.id === roomId ? { ...room, status: newStatus } : room
    ));
    setToastMessage(`Status kamar ${roomId} berhasil diperbarui`);
    setIsToastOpen(true);
  };

  const handleRoomAdded = (newRoom: any) => {
    setRooms(prevRooms => [...prevRooms, newRoom]);
    setToastMessage(`Kamar ${newRoom.id} berhasil ditambahkan`);
    setIsToastOpen(true);
  };

  return (
    <div className={styles.container}>
      {/* Page Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Room Management</h1>
          <p className={styles.subtitle}>{rooms.length} registered rooms - {readyToSellCount} ready to sell.</p>
        </div>
        <div className={styles.headerActions}>
          <Select
            options={['All Status', 'Available', 'Occupied', 'Dirty', 'Maintenance']}
            value={statusFilter}
            onChange={setStatusFilter}
          />
          <Button onClick={() => setIsNewRoomModalOpen(true)}>
            <Plus size={16} /> Add Room
          </Button>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className={styles.roomsGrid}>
        {filteredRooms.map((room, index) => (
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
                  <button 
                    key={action} 
                    className={styles.actionButton}
                    onClick={() => handleStatusChange(room.id, action)}
                  >
                    {action}
                  </button>
                ))
              }
            </div>
          </div>
        ))}
      </div>

      <NewRoomModal 
        isOpen={isNewRoomModalOpen} 
        onClose={() => setIsNewRoomModalOpen(false)} 
        onRoomAdded={handleRoomAdded} 
      />

      <Toast 
        isVisible={isToastOpen} 
        onClose={() => setIsToastOpen(false)} 
        message={toastMessage} 
      />
    </div>
  );
};
