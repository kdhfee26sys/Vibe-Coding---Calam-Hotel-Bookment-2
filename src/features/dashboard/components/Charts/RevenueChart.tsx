import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './Charts.module.css';

const data = [
  { name: 'Feb', value: 180 },
  { name: 'Mar', value: 210 },
  { name: 'Apr', value: 195 },
  { name: 'Mei', value: 250 },
  { name: 'Jun', value: 290 },
  { name: 'Jul', value: 320 },
];

export const RevenueChart: React.FC = () => {
  return (
    <div className={`${styles.chartCard} animate-pop-in`}>
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>Revenue & Booking Trend</h3>
        <span className={styles.chartSubtitle}>dalam juta rupiah</span>
      </div>
      <div className={styles.chartBody} style={{ minHeight: '260px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-bg-bg-color-bg-brand-solid)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-bg-bg-color-bg-brand-solid)" stopOpacity={0}/>
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
              tickMargin={16}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--color-bg-bg-gray-bg-primary)', 
                borderColor: 'var(--color-border-border-gray-border-secondary)',
                borderRadius: '8px',
                color: 'var(--color-text-text-gray-text-primary)'
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="var(--color-bg-bg-color-bg-brand-solid)" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
