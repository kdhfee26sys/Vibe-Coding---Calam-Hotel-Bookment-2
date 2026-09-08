import React from 'react';
import { Calendar, UserCheck, Sparkles, CreditCard, ArrowRight, Check, Search, CheckCircle, Clock } from 'lucide-react';
import styles from './FeatureBento.module.css';

export const FeatureBento: React.FC = () => {
  return (
    <section className={styles.bentoSection} id="features">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.badge}>Core Capabilities</span>
          <h2 className={styles.title}>
            Everything your hotel needs.
            <br />
            Nothing your team doesn't.
          </h2>
          <p className={styles.subtitle}>
            Built specifically to eliminate operational friction and give your staff superpowers.
          </p>
        </div>

        {/* 4 Cards Bento Grid */}
        <div className={styles.bentoGrid}>
          {/* Bento Card 1 (Large 2-col): Reservation Calendar */}
          <div className={`${styles.bentoCard} ${styles.cardSpan2}`}>
            <div className={styles.cardInfo}>
              <div className={styles.cardIconWrapper}>
                <Calendar size={20} className={styles.iconBrand} />
              </div>
              <span className={styles.cardTag}>Reservation Calendar</span>
              <h3 className={styles.cardTitle}>See every stay at a glance.</h3>
              <p className={styles.cardDesc}>
                Plan room inventory, prevent overbooking, and manage stays effortlessly with an interactive timeline supporting Daily, Weekly, and 12-Month full-year views.
              </p>
            </div>

            {/* Interactive Timeline Mockup */}
            <div className={styles.calendarMockup}>
              <div className={styles.calendarControls}>
                <span className={styles.mockupPillActive}>Weekly View</span>
                <span className={styles.mockupPill}>Juli 2026</span>
                <span className={styles.mockupPill}>All Types</span>
              </div>
              <div className={styles.timelineGrid}>
                <div className={styles.timelineRow}>
                  <span className={styles.timelineRoom}>101 · Std</span>
                  <div className={styles.timelineTrack}>
                    <div className={styles.bookingBarPurple} style={{ left: '10%', width: '45%' }}>
                      <span>Rahmat (4 nights)</span>
                    </div>
                  </div>
                </div>
                <div className={styles.timelineRow}>
                  <span className={styles.timelineRoom}>203 · Dlx</span>
                  <div className={styles.timelineTrack}>
                    <div className={styles.bookingBarBrand} style={{ left: '35%', width: '55%' }}>
                      <span>Andini Prasetya (3 nights)</span>
                    </div>
                  </div>
                </div>
                <div className={styles.timelineRow}>
                  <span className={styles.timelineRoom}>301 · Ste</span>
                  <div className={styles.timelineTrack}>
                    <div className={styles.bookingBarGreen} style={{ left: '0%', width: '60%' }}>
                      <span>Clara Wijaya (5 nights)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Front Desk Check-in */}
          <div className={styles.bentoCard}>
            <div className={styles.cardInfo}>
              <div className={styles.cardIconWrapper}>
                <UserCheck size={20} className={styles.iconBlue} />
              </div>
              <span className={styles.cardTag}>Front Desk Workflow</span>
              <h3 className={styles.cardTitle}>Check guests in. Not boxes.</h3>
              <p className={styles.cardDesc}>
                Search bookings instantly, verify IDs, assign room keys, and complete check-in in under 30 seconds.
              </p>
            </div>

            {/* Front Desk Visual */}
            <div className={styles.frontDeskMockup}>
              <div className={styles.searchBarSim}>
                <Search size={14} className={styles.searchIcon} />
                <span>BK-1042 · Andini Prasetya</span>
              </div>
              <div className={styles.checkinCardMini}>
                <div className={styles.guestRow}>
                  <span className={styles.gName}>Andini Prasetya</span>
                  <span className={styles.gRoom}>Room 203</span>
                </div>
                <div className={styles.actionRow}>
                  <span className={styles.keyAssigned}>Key: Card #203</span>
                  <button className={styles.confirmCheckinBtn}>
                    <Check size={12} /> Checked-In
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 3: Housekeeping */}
          <div className={styles.bentoCard}>
            <div className={styles.cardInfo}>
              <div className={styles.cardIconWrapper}>
                <Sparkles size={20} className={styles.iconGreen} />
              </div>
              <span className={styles.cardTag}>Live Housekeeping</span>
              <h3 className={styles.cardTitle}>Know what's ready. In real time.</h3>
              <p className={styles.cardDesc}>
                Give housekeeping and the front desk the exact same live status on every room without walkie-talkies.
              </p>
            </div>

            {/* Housekeeping Visual */}
            <div className={styles.hkGridMockup}>
              <div className={styles.hkStatusTile}>
                <span className={styles.hkTileNum}>102</span>
                <span className={styles.hkTagAvail}>Available</span>
              </div>
              <div className={styles.hkStatusTile}>
                <span className={styles.hkTileNum}>204</span>
                <span className={styles.hkTagClean}>Cleaning</span>
              </div>
              <div className={styles.hkStatusTile}>
                <span className={styles.hkTileNum}>301</span>
                <span className={styles.hkTagOcc}>Occupied</span>
              </div>
              <div className={styles.hkStatusTile}>
                <span className={styles.hkTileNum}>305</span>
                <span className={styles.hkTagMaint}>Maintenance</span>
              </div>
            </div>
          </div>

          {/* Bento Card 4 (Large 2-col): Payments & Invoicing */}
          <div className={`${styles.bentoCard} ${styles.cardSpan2}`}>
            <div className={styles.cardInfo}>
              <div className={styles.cardIconWrapper}>
                <CreditCard size={20} className={styles.iconOrange} />
              </div>
              <span className={styles.cardTag}>Multi-Method Payment Center</span>
              <h3 className={styles.cardTitle}>Every payment. One place.</h3>
              <p className={styles.cardDesc}>
                Track cash, credit cards, QRIS, bank transfers, and OTA virtual cards in a single centralized ledger with one-click tax invoices.
              </p>
            </div>

            {/* Payment Ledger Mockup */}
            <div className={styles.paymentTableMockup}>
              <div className={styles.payRowHeader}>
                <span>TRANSACTION</span>
                <span>METHOD</span>
                <span>STATUS</span>
                <span>AMOUNT</span>
              </div>
              <div className={styles.payRow}>
                <span className={styles.payTx}>PAY-9001 · BK-1042</span>
                <span className={styles.payMethod}>Bank Transfer</span>
                <span className={styles.payStatusPaid}>Paid</span>
                <span className={styles.payAmount}>Rp 2.400.000</span>
              </div>
              <div className={styles.payRow}>
                <span className={styles.payTx}>PAY-9002 · BK-1044</span>
                <span className={styles.payMethod}>Credit Card</span>
                <span className={styles.payStatusPartial}>Partial</span>
                <span className={styles.payAmount}>Rp 4.000.000</span>
              </div>
              <div className={styles.payRow}>
                <span className={styles.payTx}>PAY-9003 · BK-1046</span>
                <span className={styles.payMethod}>QRIS</span>
                <span className={styles.payStatusPaid}>Paid</span>
                <span className={styles.payAmount}>Rp 1.500.000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
