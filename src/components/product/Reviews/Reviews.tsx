import React from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import styles from './Reviews.module.css';

const distribution = [
  { stars: 5, percentage: 80 },
  { stars: 4, percentage: 14 },
  { stars: 3, percentage: 4 },
  { stars: 2, percentage: 1 },
  { stars: 1, percentage: 1 },
];

export function Reviews() {
  return (
    <section className={styles.section} id="reviews">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Customer Reviews</h2>
          <Button variant="secondary">Write a Review</Button>
        </div>

        <div className={styles.summaryContainer}>
          <div className={styles.overallRating}>
            <span className={styles.bigScore}>4.8</span>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="currentColor" className={styles.starIcon} />
              ))}
            </div>
            <span className={styles.reviewCount}>1,248 Reviews</span>
          </div>

          <div className={styles.distribution}>
            {distribution.map((row) => (
              <div key={row.stars} className={styles.distRow}>
                <div className={styles.distStars}>
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      fill={i < row.stars ? 'currentColor' : 'transparent'} 
                      className={i < row.stars ? styles.starIcon : styles.starIconEmpty}
                    />
                  ))}
                </div>
                <div className={styles.barContainer}>
                  <div className={styles.barFill} style={{ width: `${row.percentage}%` }} />
                </div>
                <span className={styles.percentage}>{row.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
