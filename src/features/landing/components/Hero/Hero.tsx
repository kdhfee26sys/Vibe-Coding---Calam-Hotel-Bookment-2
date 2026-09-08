import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle2, TrendingUp, Calendar, Bed, CreditCard, Sparkles, ShieldCheck } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts';
import styles from './Hero.module.css';

const MOCK_CHART_DATA = [
  { day: 'Mon', revenue: 14500000 },
  { day: 'Tue', revenue: 18200000 },
  { day: 'Wed', revenue: 16800000 },
  { day: 'Thu', revenue: 22400000 },
  { day: 'Fri', revenue: 28900000 },
  { day: 'Sat', revenue: 34500000 },
  { day: 'Sun', revenue: 31200000 },
];

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.heroSection}>
      {/* Background Ambient Glow */}
      <div className={styles.ambientGlow} />

      <div className={styles.container}>
        {/* Top Announcement Badge */}
        <div className={styles.badgeWrapper}>
          <div className={styles.badge}>
            <Sparkles size={14} className={styles.badgeIcon} />
            <span>Next-Gen Cloud PMS for Boutique Hotels & Resorts</span>
          </div>
        </div>

        {/* Main Display Headline */}
        <h1 className={styles.headline}>
          Run Your Hotel.
          <span className={styles.highlightText}> Not Your Software.</span>
        </h1>

        {/* Supporting Positioning */}
        <p className={styles.subHeadline}>
          The Modern Operating System for Next-Generation Hospitality.
        </p>

        {/* Description */}
        <p className={styles.description}>
          Calam brings reservations, front desk, housekeeping, payments, guest management, and analytics into one beautifully simple platform.
        </p>

        {/* CTA Buttons */}
        <div className={styles.ctaGroup}>
          <button onClick={() => navigate('/register')} className={styles.primaryBtn}>
            <span>Start Free 14-Day Trial</span>
            <ArrowRight size={16} />
          </button>
          
          <button 
            onClick={() => {
              const el = document.getElementById('showcase');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }} 
            className={styles.secondaryBtn}
          >
            <Play size={15} fill="currentColor" />
            <span>Explore Interactive Preview</span>
          </button>
        </div>

        {/* Micro Guarantee Note */}
        <div className={styles.guaranteeText}>
          <div className={styles.guaranteeItem}>
            <CheckCircle2 size={14} className={styles.checkIcon} />
            <span>No credit card required</span>
          </div>
          <div className={styles.guaranteeDot}>•</div>
          <div className={styles.guaranteeItem}>
            <CheckCircle2 size={14} className={styles.checkIcon} />
            <span>Setup in under 5 minutes</span>
          </div>
          <div className={styles.guaranteeDot}>•</div>
          <div className={styles.guaranteeItem}>
            <CheckCircle2 size={14} className={styles.checkIcon} />
            <span>Cancel anytime</span>
          </div>
        </div>

        {/* Hero Product Visual Dashboard Composition */}
        <div className={styles.productVisualWrapper}>
          {/* Main Dashboard Window */}
          <div className={styles.dashboardWindow}>
            {/* Window Topbar */}
            <div className={styles.windowHeader}>
              <div className={styles.windowDots}>
                <span className={styles.dotRed} />
                <span className={styles.dotYellow} />
                <span className={styles.dotGreen} />
              </div>
              <div className={styles.windowAddressBar}>
                <span>app.calampms.com/dashboard</span>
              </div>
              <div className={styles.windowStatus}>
                <span className={styles.liveIndicator} />
                <span>Live Sync</span>
              </div>
            </div>

            {/* Window Content */}
            <div className={styles.dashboardContent}>
              {/* KPI Cards Row */}
              <div className={styles.kpiGrid}>
                <div className={styles.kpiCard}>
                  <span className={styles.kpiLabel}>Occupancy Rate</span>
                  <div className={styles.kpiValueRow}>
                    <span className={styles.kpiValue}>88.4%</span>
                    <span className={styles.kpiTrendPositive}>+6.2%</span>
                  </div>
                  <span className={styles.kpiSub}>vs previous week</span>
                </div>

                <div className={styles.kpiCard}>
                  <span className={styles.kpiLabel}>Weekly Revenue</span>
                  <div className={styles.kpiValueRow}>
                    <span className={styles.kpiValue}>Rp 166.5M</span>
                    <span className={styles.kpiTrendPositive}>+14.8%</span>
                  </div>
                  <span className={styles.kpiSub}>104 paid bookings</span>
                </div>

                <div className={styles.kpiCard}>
                  <span className={styles.kpiLabel}>Today's Arrivals</span>
                  <div className={styles.kpiValueRow}>
                    <span className={styles.kpiValue}>12 Guests</span>
                    <span className={styles.kpiBadge}>9 Ready</span>
                  </div>
                  <span className={styles.kpiSub}>3 pending key release</span>
                </div>
              </div>

              {/* Chart & Queue Area */}
              <div className={styles.dashboardMainSplit}>
                {/* Revenue Trend Area */}
                <div className={styles.chartPanel}>
                  <div className={styles.panelHeader}>
                    <div>
                      <h4 className={styles.panelTitle}>Revenue Performance</h4>
                      <p className={styles.panelSubtitle}>Daily total collections across all channels</p>
                    </div>
                    <span className={styles.panelBadge}>7-Day View</span>
                  </div>

                  <div className={styles.chartContainer}>
                    <ResponsiveContainer width="100%" height={160}>
                      <AreaChart data={MOCK_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="heroRevGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8A5DFF" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#8A5DFF" stopOpacity={0.0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="day" stroke="#98A2B3" fontSize={11} tickLine={false} axisLine={false} />
                        <Tooltip 
                          formatter={(val: any) => [`Rp ${Number(val).toLocaleString('id-ID')}`, 'Revenue']}
                          contentStyle={{ background: '#181D27', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#8A5DFF" strokeWidth={2.5} fillOpacity={1} fill="url(#heroRevGrad)" isAnimationActive={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Live Check-In List Preview */}
                <div className={styles.arrivalsPanel}>
                  <div className={styles.panelHeader}>
                    <h4 className={styles.panelTitle}>Front Desk Queue</h4>
                    <span className={styles.liveTag}>Live</span>
                  </div>

                  <div className={styles.guestQueueList}>
                    <div className={styles.guestQueueItem}>
                      <div className={styles.guestAvatar}>AP</div>
                      <div className={styles.guestDetails}>
                        <span className={styles.guestName}>Andini Prasetya</span>
                        <span className={styles.guestRoom}>203 · Deluxe Suite</span>
                      </div>
                      <span className={`${styles.statusPill} ${styles.statusReady}`}>Checked-In</span>
                    </div>

                    <div className={styles.guestQueueItem}>
                      <div className={styles.guestAvatar}>CW</div>
                      <div className={styles.guestDetails}>
                        <span className={styles.guestName}>Clara Wijaya</span>
                        <span className={styles.guestRoom}>301 · Penthouse</span>
                      </div>
                      <span className={`${styles.statusPill} ${styles.statusPending}`}>Arriving 14:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Product Badge 1: Reservation Calendar Snippet */}
          <div className={`${styles.floatingCard} ${styles.floatingCalendar}`}>
            <div className={styles.floatingHeader}>
              <Calendar size={14} className={styles.floatingIconBrand} />
              <span>Reservation Timeline</span>
            </div>
            <div className={styles.calendarMiniBlock}>
              <div className={styles.miniRoomLabel}>Room 203 · Deluxe</div>
              <div className={styles.miniBookingChip}>
                <span className={styles.miniChipDot} />
                <span>Andini Prasetya (3 nights)</span>
              </div>
            </div>
          </div>

          {/* Floating Product Badge 2: Housekeeping Live Status */}
          <div className={`${styles.floatingCard} ${styles.floatingHousekeeping}`}>
            <div className={styles.floatingHeader}>
              <Bed size={14} className={styles.floatingIconGreen} />
              <span>Live Housekeeping</span>
            </div>
            <div className={styles.hkStatusRow}>
              <div className={styles.hkItem}>
                <span className={styles.hkRoom}>Room 204</span>
                <span className={styles.hkBadgeAvailable}>Available</span>
              </div>
              <div className={styles.hkItem}>
                <span className={styles.hkRoom}>Room 302</span>
                <span className={styles.hkBadgeCleaning}>Cleaning</span>
              </div>
            </div>
          </div>

          {/* Floating Product Badge 3: Payment Notification */}
          <div className={`${styles.floatingCard} ${styles.floatingPayment}`}>
            <div className={styles.paymentNotif}>
              <div className={styles.paymentIconWrapper}>
                <CreditCard size={15} />
              </div>
              <div className={styles.paymentText}>
                <span className={styles.paymentTitle}>Payment Received</span>
                <span className={styles.paymentAmount}>Rp 2.400.000 via QRIS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
