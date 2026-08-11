import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './Charts.module.css';

const data = [
  { name: 'Website', value: 38, color: 'var(--color-bg-bg-color-bg-brand-solid)' },
  { name: 'Traveloka', value: 24, color: 'var(--color-bg-bg-color-bg-success-solid)' },
  { name: 'Booking.com', value: 19, color: 'var(--color-bg-bg-color-bg-warning-solid)' },
  { name: 'Agoda', value: 11, color: 'var(--color-bg-bg-color-bg-info-solid)' },
  { name: 'Walk-in', value: 8, color: 'var(--color-text-text-gray-text-tertiary)' },
];

export const SourcesChart: React.FC = () => {
  return (
    <div className={`${styles.chartCard} animate-pop-in`}>
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>Top Booking Sources</h3>
      </div>
      <div className={styles.pieContainer}>
        <div className={styles.pieWrapper}>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-bg-bg-gray-bg-primary)', 
                  borderColor: 'var(--color-border-border-gray-border-secondary)',
                  borderRadius: '8px'
                }}
                itemStyle={{ color: 'var(--color-text-text-gray-text-primary)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className={styles.legend}>
          {data.map((item, index) => (
            <div key={index} className={styles.legendItem}>
              <div className={styles.legendLeft}>
                <span className={styles.legendDot} style={{ backgroundColor: item.color }}></span>
                <span className={styles.legendLabel}>{item.name}</span>
              </div>
              <span className={styles.legendValue}>{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
