import React from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { StatCard } from '../../components/StatCard/StatCard';
import { RevenueChart } from '../../components/Charts/RevenueChart';
import { SourcesChart } from '../../components/Charts/SourcesChart';
import { OccupancyChart } from '../../components/Charts/OccupancyChart';
import { RecentActivity } from '../../components/RecentActivity/RecentActivity';
import { ArrivalsList } from '../../components/ArrivalsList/ArrivalsList';
import styles from './DashboardPage.module.css';
import { Button } from '../../../../components/design-system/Button/Button';

export const DashboardPage: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Page Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard Overview</h1>
          <p className={styles.subtitle}>Ringkasan performa Hotel Calam Bandung hari ini.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.dropdownButton}>
            30 hari terakhir <ChevronDown size={16} />
          </button>
          <Button><Plus size={16} /> New Booking</Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className={styles.statsGrid}>
        <StatCard 
          title="Occupancy Rate" 
          value="25%" 
          trend={4.2} 
          subtitle="2/8 kamar terisi" 
        />
        <StatCard 
          title="Revenue Bulan Ini" 
          value="Rp 15.800.000" 
          trend={9.8} 
          subtitle="vs bulan lalu" 
        />
        <StatCard 
          title="ADR" 
          value="Rp 1.128.571" 
          trend={2.1} 
          subtitle="Average Daily Rate" 
        />
        <StatCard 
          title="Booking Aktif" 
          value="3" 
          trend={3} 
          subtitle="Confirmed & in-house" 
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
          <RecentActivity />
        </div>
      </div>

      {/* Bottom Row */}
      <div className={styles.bottomRow}>
        <ArrivalsList />
      </div>
    </div>
  );
};
