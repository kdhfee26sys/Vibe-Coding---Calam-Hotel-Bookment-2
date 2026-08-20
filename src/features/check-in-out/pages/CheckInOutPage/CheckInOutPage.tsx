import React, { useState } from 'react';
import { Loader2, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './CheckInOutPage.module.css';

interface CheckInOutGuest {
  id: string;
  name: string;
  bookingId: string;
  room: string;
  nights: number;
  total: string;
  paymentStatus: 'Paid' | 'Unpaid';
}

const initialData: Record<'arrivals' | 'in-house' | 'departures', CheckInOutGuest[]> = {
  'arrivals': [
    {
      id: '1',
      name: 'Andini Prasetya',
      bookingId: 'BK-1042',
      room: 'Room 203',
      nights: 2,
      total: 'Rp 2.400.000',
      paymentStatus: 'Unpaid'
    },
    {
      id: '2',
      name: 'Bagas Wirawan',
      bookingId: 'BK-1043',
      room: 'Room 105',
      nights: 1,
      total: 'Rp 750.000',
      paymentStatus: 'Paid'
    },
    {
      id: '3',
      name: 'Dimas Ardiansyah',
      bookingId: 'BK-1045',
      room: 'Room 204',
      nights: 2,
      total: 'Rp 2.400.000',
      paymentStatus: 'Paid'
    }
  ],
  'in-house': [
    {
      id: '4',
      name: 'Reza Rahadian',
      bookingId: 'BK-1030',
      room: 'Room 305',
      nights: 3,
      total: 'Rp 4.500.000',
      paymentStatus: 'Paid'
    }
  ],
  'departures': [
    {
      id: '5',
      name: 'Siti Nurhaliza',
      bookingId: 'BK-1025',
      room: 'Room 102',
      nights: 2,
      total: 'Rp 2.000.000',
      paymentStatus: 'Paid'
    }
  ]
};

export const CheckInOutPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'arrivals' | 'in-house' | 'departures'>('arrivals');
  const [guestsData, setGuestsData] = useState(initialData);
  const [guestStatus, setGuestStatus] = useState<Record<string, 'idle' | 'processing' | 'success' | 'leaving'>>({});
  const navigate = useNavigate();

  const handleProceed = (id: string, tab: 'arrivals' | 'in-house' | 'departures') => {
    if (guestStatus[id]) return; // Prevent double click

    setGuestStatus(prev => ({ ...prev, [id]: 'processing' }));
    
    // Simulate API call
    setTimeout(() => {
      setGuestStatus(prev => ({ ...prev, [id]: 'success' }));
      
      // Show success for a bit, then animate out
      setTimeout(() => {
        setGuestStatus(prev => ({ ...prev, [id]: 'leaving' }));
        
        // Remove from list after animation
        setTimeout(() => {
          setGuestsData(prev => ({
            ...prev,
            [tab]: prev[tab].filter(g => g.id !== id)
          }));
          setGuestStatus(prev => {
            const newStatus = { ...prev };
            delete newStatus[id];
            return newStatus;
          });
        }, 400); // Wait for the slide out animation
      }, 1500); // Show success indicator for 1.5s
    }, 800); // Simulate 800ms loading
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Check-in & Check-out</h1>
        <p className={styles.subtitle}>Manage guest arrivals and departures today.</p>
      </div>

      <div className={styles.tabsContainer}>
        <button 
          className={`${styles.tab} ${activeTab === 'arrivals' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('arrivals')}
        >
          Arrivals ({guestsData['arrivals'].length})
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'in-house' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('in-house')}
        >
          In-house ({guestsData['in-house'].length})
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'departures' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('departures')}
        >
          Departures ({guestsData['departures'].length})
        </button>
      </div>

      <div className={`${styles.listContainer} animate-pop-in`}>
        {guestsData[activeTab].length === 0 ? (
          <div className={styles.emptyState}>No more guests to process today.</div>
        ) : (
          guestsData[activeTab].map((guest) => {
            const status = guestStatus[guest.id] || 'idle';
            return (
              <div 
                key={guest.id} 
                className={`${styles.listItem} ${status === 'leaving' ? styles.itemLeaving : ''} ${status === 'success' ? styles.itemSuccess : ''}`}
              >
                <div className={styles.guestInfo}>
                  <h3 className={styles.guestName}>{guest.name}</h3>
                  <p className={styles.bookingDetails}>
                    {guest.bookingId} &middot; {guest.room} &middot; {guest.nights} {guest.nights > 1 ? 'Nights' : 'Night'} &middot; {guest.total}
                  </p>
                </div>
                
                <div className={styles.actions}>
                  {status === 'success' ? (
                    <div className={styles.successIndicator}>
                      <Check size={20} className={styles.successIcon} />
                      <span>{activeTab === 'departures' ? 'Checked Out' : 'Checked In'}</span>
                    </div>
                  ) : (
                    <>
                      <span className={`${styles.paymentBadge} ${guest.paymentStatus === 'Paid' ? styles.badgePaid : styles.badgeUnpaid}`}>
                        {guest.paymentStatus}
                      </span>
                      <button 
                        className={styles.detailButton} 
                        disabled={status === 'processing'}
                        onClick={() => navigate('/bookings', { state: { highlightedBookingId: guest.bookingId } })}
                      >
                        Detail
                      </button>
                      {activeTab !== 'in-house' && (
                        <button 
                          className={styles.proceedButton}
                          onClick={() => handleProceed(guest.id, activeTab)}
                          disabled={status === 'processing'}
                        >
                          {status === 'processing' ? (
                            <>
                              <Loader2 size={16} className={styles.spinner} />
                              Processing...
                            </>
                          ) : (
                            activeTab === 'departures' ? 'Proceed Check-out' : 'Proceed Check-in'
                          )}
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
