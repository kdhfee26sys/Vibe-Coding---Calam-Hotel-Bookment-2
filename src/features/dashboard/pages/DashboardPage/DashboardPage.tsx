import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { StatCard } from '../../components/StatCard/StatCard';
import { RevenueChart } from '../../components/Charts/RevenueChart';
import { SourcesChart } from '../../components/Charts/SourcesChart';
import { OccupancyChart } from '../../components/Charts/OccupancyChart';
import { RecentActivity } from '../../components/RecentActivity/RecentActivity';
import { ArrivalsList } from '../../components/ArrivalsList/ArrivalsList';
import styles from './DashboardPage.module.css';
import { Button } from '../../../../components/design-system/Button/Button';
import { NewBookingModal } from '../../../bookings/components/NewBookingModal/NewBookingModal';
import { Toast } from '../../../../components/shared/Toast/Toast';

import { Select } from '../../../../components/design-system/Select/Select';

export const DashboardPage: React.FC = () => {
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  
  // Dynamic greeting based on time of day
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const showToast = (message: string) => {
    setToastMessage(message);
    setIsToastOpen(true);
  };
  
  const [selectedDateRange, setSelectedDateRange] = useState('30 hari terakhir');

  const handleDateRangeSelect = (range: string) => {
    setSelectedDateRange(range);
  };

  const dashboardData = {
    '7 hari terakhir': {
      occupancy: { value: '18%', trend: -2.1, subtitle: '1/8 rooms occupied' },
      revenue: { title: 'Revenue This Week', value: 'Rp 3.500.000', trend: 1.5, subtitle: 'vs last week' },
      adr: { value: 'Rp 1.050.000', trend: -1.2, subtitle: 'Average Daily Rate' },
      bookings: { value: '1', trend: 0, subtitle: 'Confirmed & in-house' },
    },
    '30 hari terakhir': {
      occupancy: { value: '25%', trend: 4.2, subtitle: '2/8 rooms occupied' },
      revenue: { title: 'Revenue This Month', value: 'Rp 15.800.000', trend: 9.8, subtitle: 'vs last month' },
      adr: { value: 'Rp 1.128.571', trend: 2.1, subtitle: 'Average Daily Rate' },
      bookings: { value: '3', trend: 3, subtitle: 'Confirmed & in-house' },
    },
    '90 hari terakhir': {
      occupancy: { value: '38%', trend: 12.5, subtitle: '3/8 rooms occupied' },
      revenue: { title: 'Revenue This Quarter', value: 'Rp 45.200.000', trend: 15.3, subtitle: 'vs last quarter' },
      adr: { value: 'Rp 950.000', trend: -5.4, subtitle: 'Average Daily Rate' },
      bookings: { value: '12', trend: 8, subtitle: 'Confirmed & in-house' },
    }
  };

  const currentData = dashboardData[selectedDateRange as keyof typeof dashboardData] || dashboardData['30 hari terakhir'];

  return (
    <div className={styles.container}>
      {/* Page Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.greeting}>{greeting}, <span className={styles.nameHighlight}>Wulan Sari</span> 👋</h1>
          <p className={styles.subtitle}>Performance summary of Hotel Calam Bandung today.</p>
        </div>
        <div className={styles.headerActions}>
          <Select 
            options={['7 hari terakhir', '30 hari terakhir', '90 hari terakhir']}
            value={selectedDateRange}
            onChange={handleDateRangeSelect}
          />
          <Button onClick={() => setIsNewBookingModalOpen(true)}><Plus size={16} /> New Booking</Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className={styles.statsGrid}>
        <StatCard 
          title="Occupancy Rate" 
          value={currentData.occupancy.value} 
          trend={currentData.occupancy.trend} 
          subtitle={currentData.occupancy.subtitle} 
        />
        <StatCard 
          title={currentData.revenue.title} 
          value={currentData.revenue.value} 
          trend={currentData.revenue.trend} 
          subtitle={currentData.revenue.subtitle} 
        />
        <StatCard 
          title="ADR" 
          value={currentData.adr.value} 
          trend={currentData.adr.trend} 
          subtitle={currentData.adr.subtitle} 
        />
        <StatCard 
          title="Active Bookings" 
          value={currentData.bookings.value} 
          trend={currentData.bookings.trend} 
          subtitle={currentData.bookings.subtitle} 
        />
      </div>



      {/* Charts Grid */}
      <div className={styles.chartsGridTop}>
        <div className={styles.revenueCol}>
          <RevenueChart />
        </div>
        <div className={styles.sourcesCol}>
          <SourcesChart />
        </div>
      </div>

      <div className={styles.chartsGridBottom}>
        <div className={styles.occupancyCol}>
          <OccupancyChart />
        </div>
        <div className={styles.activityCol}>
          <RecentActivity onSendSummary={() => showToast("Daily summary has been sent!")} />
        </div>
      </div>

      {/* Bottom Row */}
      <div className={styles.bottomRow}>
        <ArrivalsList />
      </div>

      <NewBookingModal 
        isOpen={isNewBookingModalOpen} 
        onClose={() => setIsNewBookingModalOpen(false)} 
        onBookingAdded={() => {
          showToast("Booking berhasil dibuat");
        }} 
      />

      <Toast 
        isVisible={isToastOpen} 
        onClose={() => setIsToastOpen(false)} 
        message={toastMessage} 
      />
    </div>
  );
};
