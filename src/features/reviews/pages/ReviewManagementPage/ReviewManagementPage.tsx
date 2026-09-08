import React, { useState } from 'react';
import { Download, Star, Flag } from 'lucide-react';
import { Button } from '../../../../components/design-system/Button/Button';
import { Select } from '../../../../components/design-system/Select/Select';
import { exportToCSV } from '../../../../utils/exportUtils';
import styles from './ReviewManagementPage.module.css';

interface Review {
  id: string;
  guestName: string;
  source: string;
  date: string;
  rating: number;
  text: string;
  reply?: string;
}

const mockReviews: Review[] = [
  {
    id: 'REV-01',
    guestName: 'Erika Santoso',
    source: 'Google',
    date: '2026-07-30',
    rating: 5,
    text: 'Room is clean, staff is very friendly. Breakfast is delicious!',
  },
  {
    id: 'REV-02',
    guestName: 'Dimas Ardiansyah',
    source: 'Traveloka',
    date: '2026-07-25',
    rating: 3,
    text: 'AC in room 204 is not cold enough, but the location is strategic.',
  },
  {
    id: 'REV-03',
    guestName: 'Clara Wijaya',
    source: 'Booking.com',
    date: '2026-07-20',
    rating: 4,
    text: 'Suite is spacious and comfortable, check-in took a while.',
    reply: 'Thank you Ms. Clara, we will speed up the check-in process.',
  }
];

export const ReviewManagementPage: React.FC = () => {
  const [sourceFilter, setSourceFilter] = useState('All Source');
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [markedReviews, setMarkedReviews] = useState<Record<string, boolean>>({});

  const handleUseTemplate = (id: string) => {
    setReplyDrafts(prev => ({ 
      ...prev, 
      [id]: "Thank you for your feedback! We truly appreciate you taking the time to share your experience with us. We hope to welcome you back soon." 
    }));
  };

  const handleToggleMark = (id: string) => {
    setMarkedReviews(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleReplyChange = (id: string, text: string) => {
    setReplyDrafts(prev => ({ ...prev, [id]: text }));
  };

  const handleSendReply = (id: string) => {
    const draft = replyDrafts[id];
    if (!draft || draft.trim() === '') return;

    setReviews(prev => prev.map(review => 
      review.id === id ? { ...review, reply: draft } : review
    ));
    
    // Clear draft
    setReplyDrafts(prev => {
      const newDrafts = { ...prev };
      delete newDrafts[id];
      return newDrafts;
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= rating ? styles.starFilled : styles.starEmpty}
          />
        ))}
      </div>
    );
  };

  const filteredReviews = sourceFilter === 'All Source'
    ? reviews
    : reviews.filter(review => review.source === sourceFilter);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>Review Management</h1>
          <p className={styles.subtitle}>Showing {filteredReviews.length} reviews.</p>
        </div>
        <div className={styles.actionArea}>
          <Select
            options={['All Source', 'Google', 'Traveloka', 'Booking.com']}
            value={sourceFilter}
            onChange={setSourceFilter}
          />
          <Button variant="secondary" onClick={() => exportToCSV(filteredReviews, 'reviews')}>
            <Download size={16} /> Export
          </Button>
        </div>
      </header>

      <div className={styles.reviewList}>
        {filteredReviews.map((review, index) => (
          <div 
            key={review.id} 
            className={`${styles.reviewCard} animate-pop-in`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={styles.cardHeader}>
              <div className={styles.guestInfo}>
                <h3 className={styles.guestName}>
                  {review.guestName}
                  {markedReviews[review.id] && (
                    <Flag size={14} fill="#F79008" color="#F79008" style={{ marginLeft: '8px', display: 'inline-block' }} />
                  )}
                </h3>
                <p className={styles.reviewMeta}>
                  {review.source} - {review.date}
                </p>
              </div>
              {renderStars(review.rating)}
            </div>

            <p className={styles.reviewText}>{review.text}</p>

            {review.reply ? (
              <div className={styles.replyBlock}>
                <h4 className={styles.replyBlockTitle}>Hotel's Reply</h4>
                <p className={styles.replyBlockText}>{review.reply}</p>
              </div>
            ) : (
              <div className={styles.replySection}>
                <textarea 
                  className={styles.replyInput} 
                  placeholder="Write a reply to the guest..."
                  value={replyDrafts[review.id] || ''}
                  onChange={(e) => handleReplyChange(review.id, e.target.value)}
                />
                <div className={styles.replyActions}>
                  <button 
                    className={styles.primaryBtn}
                    onClick={() => handleSendReply(review.id)}
                    disabled={!replyDrafts[review.id]?.trim()}
                  >
                    Send Reply
                  </button>
                  <button 
                    className={styles.secondaryBtn}
                    onClick={() => handleUseTemplate(review.id)}
                  >
                    Use Template
                  </button>
                  <button 
                    className={styles.secondaryBtn}
                    onClick={() => handleToggleMark(review.id)}
                  >
                    {markedReviews[review.id] ? 'Unmark' : 'Mark'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
