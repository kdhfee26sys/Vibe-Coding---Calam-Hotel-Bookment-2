import React from 'react';
import styles from './RecentActivity.module.css';

interface ActivityItem {
  id: string;
  text: string;
  time: string;
  colorClass: string;
}

const activities: ActivityItem[] = [
  { id: '1', text: 'Booking baru BK-1045 dari Booking.com', time: '5 menit lalu', colorClass: styles.colorPurple },
  { id: '2', text: 'Clara Wijaya check-in ke kamar 301', time: '42 menit lalu', colorClass: styles.colorBlue },
  { id: '3', text: 'Pembayaran Rp 2.400.000 diterima (BK-1042)', time: '1 jam lalu', colorClass: styles.colorGreen },
  { id: '4', text: 'Ulasan baru bintang 5 dari Google', time: '3 jam lalu', colorClass: styles.colorPurple },
  { id: '5', text: 'Kamar 205 masuk status maintenance', time: 'Kemarin', colorClass: styles.colorOrange },
];

export const RecentActivity: React.FC = () => {
  return (
    <div className={`${styles.container} animate-pop-in`}>
      <div className={styles.header}>
        <h3 className={styles.title}>Recent Activity</h3>
        <a href="#" className={styles.link}>Lihat Semua</a>
      </div>
      
      <div className={styles.list}>
        {activities.map((activity) => (
          <div key={activity.id} className={styles.item}>
            <div className={`${styles.dot} ${activity.colorClass}`}></div>
            <div className={styles.content}>
              <p className={styles.text}>{activity.text}</p>
              <p className={styles.time}>{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className={styles.summaryButton}>
        Kirim Ringkasan Harian
      </button>
    </div>
  );
};
