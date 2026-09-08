import React from 'react';
import { Star, Quote } from 'lucide-react';
import styles from './Testimonials.module.css';

const TESTIMONIALS = [
  {
    quote: "Calam made our daily operation dramatically simpler. Our front desk team finally has everything they need in one place without jumping between 5 different browser tabs.",
    author: "Hendrawan Kusuma",
    role: "Property Owner",
    property: "Boutique Resort & Villas, Bali",
    stars: 5,
  },
  {
    quote: "The interface is so intuitive that our newly hired receptionists understood the entire booking and check-in workflow within 15 minutes of onboarding. Absolutely game-changing.",
    author: "Nadira Santoso",
    role: "Front Desk Manager",
    property: "Heritage Hotel, Bandung",
    stars: 5,
  },
  {
    quote: "The live housekeeping sync eliminated our walkie-talkie chaos completely. Rooms get inspected and turned over 40% faster, leading to much happier guests at check-in.",
    author: "Bagus Wicaksono",
    role: "Operations Director",
    property: "Urban Sanctuary Hotel, Yogyakarta",
    stars: 5,
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className={styles.testiSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Customer Stories</span>
          <h2 className={styles.title}>Built for people who run hospitality.</h2>
          <p className={styles.subtitle}>
            Hear how boutique hotel operators and property managers transformed their daily operations with Calam.
          </p>
        </div>

        <div className={styles.testiGrid}>
          {TESTIMONIALS.map((item, idx) => (
            <div key={idx} className={styles.testiCard}>
              <div className={styles.starsRow}>
                {[...Array(item.stars)].map((_, s) => (
                  <Star key={s} size={16} className={styles.starIcon} fill="#F79008" />
                ))}
              </div>
              <p className={styles.quoteText}>"{item.quote}"</p>
              <div className={styles.authorArea}>
                <div className={styles.avatarCircle}>
                  {item.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div className={styles.authorMeta}>
                  <span className={styles.authorName}>{item.author}</span>
                  <span className={styles.authorRole}>{item.role} · {item.property}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
