import React from 'react';
import { CalendarX2, Clock, AlertTriangle, FileSpreadsheet, MessageSquare, Layers } from 'lucide-react';
import styles from './ProblemSection.module.css';

export const ProblemSection: React.FC = () => {
  return (
    <section className={styles.problemSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.sectionBadge}>The Reality of Legacy Hotel Operations</span>
          <h2 className={styles.sectionTitle}>
            Your hotel shouldn't run on disconnected tools.
          </h2>
          <p className={styles.sectionSubtitle}>
            Spreadsheets for bookings. WhatsApp for housekeeping. Separate terminals for payments. Another dashboard for reports. <strong>Hospitality shouldn't be this fragmented.</strong>
          </p>
        </div>

        {/* 4 Problem Cards Grid */}
        <div className={styles.problemGrid}>
          {/* Problem 01 */}
          <div className={styles.problemCard}>
            <div className={styles.cardHeader}>
              <div className={`${styles.iconWrapper} ${styles.iconRed}`}>
                <CalendarX2 size={20} />
              </div>
              <span className={styles.problemNumber}>01</span>
            </div>
            <h3 className={styles.cardTitle}>Booking Chaos</h3>
            <p className={styles.cardDesc}>
              Manual spreadsheets and un-synced OTA channels cause double-bookings, missed cancellations, and furious guests at 11 PM.
            </p>

            {/* Visual Micro Mockup */}
            <div className={styles.microMockup}>
              <div className={styles.mockupAlert}>
                <AlertTriangle size={14} className={styles.alertIconRed} />
                <span>Overbooking Alert: Room 203 booked twice</span>
              </div>
              <div className={styles.mockupConflictBar}>
                <span className={styles.conflictItemA}>BK-1042 (Website)</span>
                <span className={styles.conflictOverlap}>CONFLICT</span>
                <span className={styles.conflictItemB}>BK-9041 (OTA)</span>
              </div>
            </div>
          </div>

          {/* Problem 02 */}
          <div className={styles.problemCard}>
            <div className={styles.cardHeader}>
              <div className={`${styles.iconWrapper} ${styles.iconOrange}`}>
                <Clock size={20} />
              </div>
              <span className={styles.problemNumber}>02</span>
            </div>
            <h3 className={styles.cardTitle}>Slow Front Desk</h3>
            <p className={styles.cardDesc}>
              Front desk staff jump across 4 browser tabs searching for booking codes, ID numbers, and key assignments while lines pile up in the lobby.
            </p>

            {/* Visual Micro Mockup */}
            <div className={styles.microMockup}>
              <div className={styles.tabChaos}>
                <span className={styles.miniTabInactive}>Excel_Bookings.xlsx</span>
                <span className={styles.miniTabInactive}>WhatsApp Web (32)</span>
                <span className={styles.miniTabActive}>Searching guest...</span>
              </div>
              <div className={styles.slowBar}>
                <div className={styles.slowFill} />
              </div>
            </div>
          </div>

          {/* Problem 03 */}
          <div className={styles.problemCard}>
            <div className={styles.cardHeader}>
              <div className={`${styles.iconWrapper} ${styles.iconYellow}`}>
                <MessageSquare size={20} />
              </div>
              <span className={styles.problemNumber}>03</span>
            </div>
            <h3 className={styles.cardTitle}>Housekeeping Blind Spots</h3>
            <p className={styles.cardDesc}>
              A room isn't ready until everyone knows it's ready. Relying on walkie-talkies and messaging groups causes room turnover delays and dirty room assignments.
            </p>

            {/* Visual Micro Mockup */}
            <div className={styles.microMockup}>
              <div className={styles.chatBubbleGroup}>
                <div className={styles.chatBubbleLeft}>
                  <span>"Is room 302 clean yet? Guest is here"</span>
                </div>
                <div className={styles.chatBubbleRight}>
                  <span>"Still cleaning bathroom, 20 mins..."</span>
                </div>
              </div>
            </div>
          </div>

          {/* Problem 04 */}
          <div className={styles.problemCard}>
            <div className={styles.cardHeader}>
              <div className={`${styles.iconWrapper} ${styles.iconBlue}`}>
                <Layers size={20} />
              </div>
              <span className={styles.problemNumber}>04</span>
            </div>
            <h3 className={styles.cardTitle}>Scattered Financial Data</h3>
            <p className={styles.cardDesc}>
              Reconciling partial deposits, QRIS codes, credit card slips, and OTA virtual cards requires hours of detective work at the end of every month.
            </p>

            {/* Visual Micro Mockup */}
            <div className={styles.microMockup}>
              <div className={styles.paymentFragmentGrid}>
                <span className={styles.payBadge}>Cash Slip ?</span>
                <span className={styles.payBadge}>QRIS Screenshot</span>
                <span className={styles.payBadge}>Bank Transfer PDF</span>
                <span className={styles.payBadge}>OTA Virtual Card</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
