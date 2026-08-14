import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RecentActivity.module.css';

interface RecentActivityProps {
  onSendSummary?: () => void;
}

interface ActivityItem {
  id: string;
  text: string;
  time: string;
  colorClass: string;
}

const activities: ActivityItem[] = [
  { id: '1', text: 'New booking BK-1045 from Booking.com', time: '5 mins ago', colorClass: styles.colorPurple },
  { id: '2', text: 'Clara Wijaya checked into Room 301', time: '42 mins ago', colorClass: styles.colorBlue },
  { id: '3', text: 'Payment of Rp 2.400.000 received (BK-1042)', time: '1 hour ago', colorClass: styles.colorGreen },
  { id: '4', text: 'New 5-star review from Google', time: '3 hours ago', colorClass: styles.colorPurple },
  { id: '5', text: 'Room 205 entered maintenance status', time: 'Yesterday', colorClass: styles.colorOrange },
];

export const RecentActivity: React.FC<RecentActivityProps> = ({ onSendSummary }) => {
  return (
    <div className={`${styles.container} animate-pop-in`}>
      <div className={styles.header}>
        <h3 className={styles.title}>Recent Activity</h3>
        <Link to="/reports" className={styles.link}>View All</Link>
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
      
      <button className={styles.summaryButton} onClick={onSendSummary}>
        Send Daily Summary
      </button>
    </div>
  );
};
