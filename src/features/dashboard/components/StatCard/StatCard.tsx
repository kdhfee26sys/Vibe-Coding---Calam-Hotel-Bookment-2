import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import styles from './StatCard.module.css';

interface StatCardProps {
  title: string;
  value: string | number;
  trend: number;
  subtitle: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, trend, subtitle }) => {
  const isPositive = trend >= 0;
  
  return (
    <div className={`${styles.card} animate-pop-in`}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.value}>{value}</div>
      <div className={styles.footer}>
        <div className={`${styles.trend} ${isPositive ? styles.positive : styles.negative}`}>
          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          <span>{isPositive ? '+' : ''}{trend}%</span>
        </div>
        <span className={styles.subtitle}>· {subtitle}</span>
      </div>
    </div>
  );
};
