import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ArrivalsList.module.css';

interface ArrivalItem {
  id: string;
  name: string;
  bookingId: string;
  room: string;
  nights: number;
}

const arrivals: ArrivalItem[] = [
  { id: '1', name: 'Andini Prasetya', bookingId: 'BK-1042', room: 'Room 203', nights: 2 },
  { id: '2', name: 'Bagas Wirawan', bookingId: 'BK-1043', room: 'Room 105', nights: 1 },
  { id: '3', name: 'Clara Wijaya', bookingId: 'BK-1044', room: 'Room 301', nights: 5 },
  { id: '4', name: 'Dimas Ardiansyah', bookingId: 'BK-1045', room: 'Room 204', nights: 2 },
];

export const ArrivalsList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={`${styles.container} animate-pop-in`}>
      <div className={styles.header}>
        <h3 className={styles.title}>Today's Arrivals</h3>
        <Link to="/bookings" className={styles.link}>View all bookings</Link>
      </div>
      
      <div className={styles.list}>
        {arrivals.map((arrival) => (
          <div key={arrival.id} className={styles.item}>
            <div className={styles.info}>
              <p className={styles.guestName}>{arrival.name}</p>
              <p className={styles.bookingDetails}>
                {arrival.bookingId} &middot; {arrival.room} &middot; {arrival.nights} nights
              </p>
            </div>
            <button 
              className={styles.detailButton} 
              onClick={() => navigate('/bookings', { state: { highlightedBookingId: arrival.bookingId } })}
            >
              Detail
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
