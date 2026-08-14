import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import styles from './Charts.module.css';

const data = [
  { name: 'Sen', value: 60 },
  { name: 'Sel', value: 65 },
  { name: 'Rab', value: 70 },
  { name: 'Kam', value: 72 },
  { name: 'Jum', value: 85 },
  { name: 'Sab', value: 95 },
  { name: 'Min', value: 88 },
];

export const OccupancyChart: React.FC = () => {
  return (
    <div className={`${styles.chartCard} animate-pop-in`}>
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>Occupancy Mingguan</h3>
      </div>
      <div className={styles.chartBody} style={{ minHeight: '260px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barSize={32}>
            <defs>
              <linearGradient id="colorOccupancy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8A5DFF" stopOpacity={1}/>
                <stop offset="100%" stopColor="#4F46E5" stopOpacity={1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border-border-gray-border-secondary)" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--color-text-text-gray-text-tertiary)', fontSize: 12 }} 
              tickMargin={8}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--color-text-text-gray-text-tertiary)', fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
              tickMargin={16}
            />
            <Tooltip 
              cursor={{ fill: 'var(--color-bg-bg-gray-bg-secondary)', opacity: 0.5 }}
              contentStyle={{ 
                backgroundColor: 'var(--color-bg-bg-gray-bg-primary)', 
                borderColor: 'var(--color-border-border-gray-border-secondary)',
                borderRadius: '8px',
                color: 'var(--color-text-text-gray-text-primary)'
              }}
              formatter={(value) => [`${value}%`, 'Occupancy']}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="url(#colorOccupancy)" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
