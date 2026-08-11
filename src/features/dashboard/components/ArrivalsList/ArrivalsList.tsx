import React from 'react';
import styles from './ArrivalsList.module.css';

interface ArrivalItem {
  id: string;
  name: string;
  bookingId: string;
  room: string;
  nights: number;
}

const arrivals: ArrivalItem[] = [
  { id: '1', name: 'Andini Prasetya', bookingId: 'BK-1042', room: 'Kamar 203', nights: 2 },
  { id: '2', name: 'Bagas Wirawan', bookingId: 'BK-1043', room: 'Kamar 105', nights: 1 },
  { id: '3', name: 'Clara Wijaya', bookingId: 'BK-1044', room: 'Kamar 301', nights: 5 },
  { id: '4', name: 'Dimas Ardiansyah', bookingId: 'BK-1045', room: 'Kamar 204', nights: 2 },
];

export const ArrivalsList: React.FC = () => {
  return (
    <div className={`${styles.container} animate-pop-in`}>
      <div className={styles.header}>
        <h3 className={styles.title}>Kedatangan Hari Ini</h3>
        <a href="#" className={styles.link}>Lihat semua booking</a>
      </div>
      
      <div className={styles.list}>
        {arrivals.map((arrival) => (
          <div key={arrival.id} className={styles.item}>
            <div className={styles.info}>
              <p className={styles.guestName}>{arrival.name}</p>
              <p className={styles.bookingDetails}>
                {arrival.bookingId} · {arrival.room} · {arrival.nights} malam
              </p>
            </div>
            <button className={styles.detailButton}>Detail</button>
          </div>
        ))}
      </div>
    </div>
  );
};
