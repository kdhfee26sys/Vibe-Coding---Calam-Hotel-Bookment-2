import React, { useState } from 'react';
import { Calendar, Bed, CreditCard, Star, BarChart3, ArrowRight, CheckCircle2, Search, Filter, ShieldCheck, Download, Plus, MessageSquare, Flag } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import styles from './ProductShowcase.module.css';

const TABS = [
  { id: 'front-desk', label: 'Front Desk & Calendar', icon: Calendar },
  { id: 'housekeeping', label: 'Housekeeping & Rooms', icon: Bed },
  { id: 'payments', label: 'Payments & Invoicing', icon: CreditCard },
  { id: 'reviews', label: 'Reviews & Reputation', icon: Star },
  { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
];

const MOCK_BAR_DATA = [
  { month: 'Jan', revenue: 120 },
  { month: 'Feb', revenue: 145 },
  { month: 'Mar', revenue: 135 },
  { month: 'Apr', revenue: 170 },
  { month: 'Mei', revenue: 190 },
  { month: 'Jun', revenue: 210 },
  { month: 'Jul', revenue: 245 },
];

export const ProductShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState('front-desk');

  return (
    <section className={styles.showcaseSection} id="showcase">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.badge}>Interactive Product Tour</span>
          <h2 className={styles.title}>One platform. Every operation.</h2>
          <p className={styles.subtitle}>
            From the front desk to the back office, Calam keeps your entire property moving together with zero friction.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className={styles.tabsNav}>
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className={`${styles.displayCard} animate-pop-in`}>
          {/* TAB 1: Front Desk & Calendar */}
          {activeTab === 'front-desk' && (
            <div className={styles.tabContentGrid}>
              <div className={styles.contentLeft}>
                <span className={styles.contentBadge}>Front Desk & Calendar</span>
                <h3 className={styles.contentTitle}>Your front desk, redesigned for speed.</h3>
                <p className={styles.contentDesc}>
                  See arrivals, departures, reservations, room assignments, and payment status from one intuitive workspace. Check guests in in under 30 seconds with automated key tracking.
                </p>
                <div className={styles.featureBullets}>
                  <div className={styles.bulletItem}>
                    <CheckCircle2 size={16} className={styles.bulletIcon} />
                    <span>Interactive 1-year timeline with conflict prevention</span>
                  </div>
                  <div className={styles.bulletItem}>
                    <CheckCircle2 size={16} className={styles.bulletIcon} />
                    <span>Instant guest identity and booking code lookup</span>
                  </div>
                  <div className={styles.bulletItem}>
                    <CheckCircle2 size={16} className={styles.bulletIcon} />
                    <span>Real-time payment verification before check-in</span>
                  </div>
                </div>
              </div>

              <div className={styles.contentRight}>
                {/* Front Desk Visual Mockup */}
                <div className={styles.mockupWindow}>
                  <div className={styles.mockupHeader}>
                    <span className={styles.mockupTitle}>Live Reservation Grid</span>
                    <span className={styles.mockupBadgeGreen}>9 Rooms Assigned</span>
                  </div>
                  <div className={styles.mockupCalendarSlice}>
                    <div className={styles.miniColHeader}>
                      <span>ROOM</span>
                      <span>MON 28</span>
                      <span>TUE 29</span>
                      <span>WED 30</span>
                    </div>
                    <div className={styles.miniCalRow}>
                      <span className={styles.calRoomName}>101 Standard</span>
                      <div className={styles.calEventBrand}>Rahmat (BK-1011)</div>
                    </div>
                    <div className={styles.miniCalRow}>
                      <span className={styles.calRoomName}>203 Deluxe</span>
                      <div className={styles.calEventPurple}>Andini Prasetya (BK-1042)</div>
                    </div>
                    <div className={styles.miniCalRow}>
                      <span className={styles.calRoomName}>301 Suite</span>
                      <div className={styles.calEventGreen}>Clara Wijaya (BK-1044)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Housekeeping & Rooms */}
          {activeTab === 'housekeeping' && (
            <div className={styles.tabContentGrid}>
              <div className={styles.contentLeft}>
                <span className={styles.contentBadge}>Housekeeping Hub</span>
                <h3 className={styles.contentTitle}>Turn rooms faster. Keep everyone in sync.</h3>
                <p className={styles.contentDesc}>
                  Assign cleaning tasks, track room readiness, and instantly notify the front desk when a room is inspected and ready for the next arrival.
                </p>
                <div className={styles.featureBullets}>
                  <div className={styles.bulletItem}>
                    <CheckCircle2 size={16} className={styles.bulletIcon} />
                    <span>Live 4-state engine: Available, Cleaning, Occupied, Maintenance</span>
                  </div>
                  <div className={styles.bulletItem}>
                    <CheckCircle2 size={16} className={styles.bulletIcon} />
                    <span>Priority flags for incoming VIP arrivals waiting in lobby</span>
                  </div>
                  <div className={styles.bulletItem}>
                    <CheckCircle2 size={16} className={styles.bulletIcon} />
                    <span>Staff task allocation and turnover time logs</span>
                  </div>
                </div>
              </div>

              <div className={styles.contentRight}>
                <div className={styles.mockupWindow}>
                  <div className={styles.mockupHeader}>
                    <span className={styles.mockupTitle}>Housekeeping Board</span>
                    <span className={styles.mockupBadgeOrange}>4 In Progress</span>
                  </div>
                  <div className={styles.hkBoardGrid}>
                    <div className={styles.hkCard}>
                      <div className={styles.hkCardTop}>
                        <span className={styles.hkNum}>Room 102</span>
                        <span className={styles.hkAvailPill}>Ready</span>
                      </div>
                      <span className={styles.hkStaff}>Staff: Siti (Done 11:20)</span>
                    </div>
                    <div className={styles.hkCard}>
                      <div className={styles.hkCardTop}>
                        <span className={styles.hkNum}>Room 204</span>
                        <span className={styles.hkCleanPill}>Cleaning</span>
                      </div>
                      <span className={styles.hkStaff}>Staff: Budi (Priority VIP)</span>
                    </div>
                    <div className={styles.hkCard}>
                      <div className={styles.hkCardTop}>
                        <span className={styles.hkNum}>Room 301</span>
                        <span className={styles.hkOccPill}>Occupied</span>
                      </div>
                      <span className={styles.hkStaff}>Guest: Clara Wijaya</span>
                    </div>
                    <div className={styles.hkCard}>
                      <div className={styles.hkCardTop}>
                        <span className={styles.hkNum}>Room 305</span>
                        <span className={styles.hkMaintPill}>Maintenance</span>
                      </div>
                      <span className={styles.hkStaff}>AC Inspection Needed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Payments & Invoicing */}
          {activeTab === 'payments' && (
            <div className={styles.tabContentGrid}>
              <div className={styles.contentLeft}>
                <span className={styles.contentBadge}>Payment Center</span>
                <h3 className={styles.contentTitle}>Know where every rupiah goes.</h3>
                <p className={styles.contentDesc}>
                  Manage deposits, partial payments, refunds, tax invoices, and transactions without switching between POS and accounting spreadsheets.
                </p>
                <div className={styles.featureBullets}>
                  <div className={styles.bulletItem}>
                    <CheckCircle2 size={16} className={styles.bulletIcon} />
                    <span>Support for QRIS, Credit Cards, Bank Transfers & OTA Cards</span>
                  </div>
                  <div className={styles.bulletItem}>
                    <CheckCircle2 size={16} className={styles.bulletIcon} />
                    <span>One-click branded PDF / CSV invoice generation</span>
                  </div>
                  <div className={styles.bulletItem}>
                    <CheckCircle2 size={16} className={styles.bulletIcon} />
                    <span>Audit-ready financial logs and partial balance tracking</span>
                  </div>
                </div>
              </div>

              <div className={styles.contentRight}>
                <div className={styles.mockupWindow}>
                  <div className={styles.mockupHeader}>
                    <span className={styles.mockupTitle}>Transaction Center</span>
                    <span className={styles.mockupBadgeGreen}>Rp 148.5M Total</span>
                  </div>
                  <div className={styles.payListMini}>
                    <div className={styles.payItem}>
                      <div>
                        <div className={styles.payGuest}>Andini Prasetya (BK-1042)</div>
                        <div className={styles.payMeta}>Bank Transfer · 28 Jul 2026</div>
                      </div>
                      <div className={styles.payRight}>
                        <span className={styles.payStatusDone}>Paid</span>
                        <span className={styles.payVal}>Rp 2.400.000</span>
                      </div>
                    </div>
                    <div className={styles.payItem}>
                      <div>
                        <div className={styles.payGuest}>Clara Wijaya (BK-1044)</div>
                        <div className={styles.payMeta}>Credit Card · 29 Jul 2026</div>
                      </div>
                      <div className={styles.payRight}>
                        <span className={styles.payStatusPart}>Partial (50%)</span>
                        <span className={styles.payVal}>Rp 4.000.000</span>
                      </div>
                    </div>
                    <div className={styles.payItem}>
                      <div>
                        <div className={styles.payGuest}>Erika Santoso (BK-1046)</div>
                        <div className={styles.payMeta}>QRIS Dynamic · 28 Jul 2026</div>
                      </div>
                      <div className={styles.payRight}>
                        <span className={styles.payStatusDone}>Paid</span>
                        <span className={styles.payVal}>Rp 1.500.000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Reviews & Reputation */}
          {activeTab === 'reviews' && (
            <div className={styles.tabContentGrid}>
              <div className={styles.contentLeft}>
                <span className={styles.contentBadge}>Reputation Inbox</span>
                <h3 className={styles.contentTitle}>Every review. One unified inbox.</h3>
                <p className={styles.contentDesc}>
                  Bring guest feedback from key OTA channels into one place and respond 3x faster with ready-to-use hospitality reply templates.
                </p>
                <div className={styles.featureBullets}>
                  <div className={styles.bulletItem}>
                    <CheckCircle2 size={16} className={styles.bulletIcon} />
                    <span>Aggregated stream from Google, Traveloka, Agoda & Booking.com</span>
                  </div>
                  <div className={styles.bulletItem}>
                    <CheckCircle2 size={16} className={styles.bulletIcon} />
                    <span>One-click professional response templates</span>
                  </div>
                  <div className={styles.bulletItem}>
                    <CheckCircle2 size={16} className={styles.bulletIcon} />
                    <span>Urgent complaint flagging for General Manager escalation</span>
                  </div>
                </div>
              </div>

              <div className={styles.contentRight}>
                <div className={styles.mockupWindow}>
                  <div className={styles.mockupHeader}>
                    <span className={styles.mockupTitle}>Review Inbox</span>
                    <span className={styles.mockupBadgeBrand}>4.8 / 5.0 Avg</span>
                  </div>
                  <div className={styles.reviewCardMini}>
                    <div className={styles.revHeader}>
                      <div>
                        <span className={styles.revAuthor}>Erika Santoso</span>
                        <span className={styles.revSource}> · Google Reviews (5★)</span>
                      </div>
                      <span className={styles.revDate}>2 days ago</span>
                    </div>
                    <p className={styles.revBody}>
                      "Room 102 was spotless, staff is super friendly, and check-in took less than a minute!"
                    </p>
                    <div className={styles.revReplyArea}>
                      <span className={styles.revReplyTitle}>Hotel Reply:</span>
                      <p className={styles.revReplyText}>
                        "Thank you Erika! We are thrilled you enjoyed your stay at Calam."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Analytics & Reports */}
          {activeTab === 'analytics' && (
            <div className={styles.tabContentGrid}>
              <div className={styles.contentLeft}>
                <span className={styles.contentBadge}>Executive Intelligence</span>
                <h3 className={styles.contentTitle}>Turn hotel data into higher profit.</h3>
                <p className={styles.contentDesc}>
                  Track occupancy trends, RevPAR, ADR, channel distribution, and staff productivity through an executive dashboard built for property owners.
                </p>
                <div className={styles.featureBullets}>
                  <div className={styles.bulletItem}>
                    <CheckCircle2 size={16} className={styles.bulletIcon} />
                    <span>Real-time RevPAR and ADR calculation</span>
                  </div>
                  <div className={styles.bulletItem}>
                    <CheckCircle2 size={16} className={styles.bulletIcon} />
                    <span>OTA Channel distribution vs Direct Booking ratios</span>
                  </div>
                  <div className={styles.bulletItem}>
                    <CheckCircle2 size={16} className={styles.bulletIcon} />
                    <span>One-click CSV exports for owners and tax accountants</span>
                  </div>
                </div>
              </div>

              <div className={styles.contentRight}>
                <div className={styles.mockupWindow}>
                  <div className={styles.mockupHeader}>
                    <span className={styles.mockupTitle}>Monthly Revenue Trend (Millions IDR)</span>
                    <span className={styles.mockupBadgeGreen}>+24% YoY</span>
                  </div>
                  <div className={styles.chartWrapperMini}>
                    <ResponsiveContainer width="100%" height={170}>
                      <BarChart data={MOCK_BAR_DATA}>
                        <XAxis dataKey="month" stroke="#98A2B3" fontSize={11} tickLine={false} axisLine={false} />
                        <YAxis stroke="#98A2B3" fontSize={10} tickLine={false} axisLine={false} />
                        <Tooltip 
                          formatter={(v: any) => [`Rp ${v} Juta`, 'Revenue']}
                          contentStyle={{ background: '#181D27', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                        />
                        <Bar dataKey="revenue" fill="#8A5DFF" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
