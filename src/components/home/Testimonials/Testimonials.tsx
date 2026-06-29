import React from 'react';
import { Star } from 'lucide-react';
import { testimonials } from '@/lib/constants/mockData';
import styles from './Testimonials.module.css';

export function Testimonials() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>What Our Customers Say</h2>
        </div>
        
        <div className={styles.grid}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className={styles.card}>
              <div className={styles.stars}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i}
                    size={16}
                    fill={i < testimonial.rating ? 'var(--color-accent)' : 'transparent'}
                    color={i < testimonial.rating ? 'var(--color-accent)' : 'var(--color-border)'}
                  />
                ))}
              </div>
              <p className={styles.text}>&ldquo;{testimonial.text}&rdquo;</p>
              <div className={styles.author}>
                <span className={styles.name}>{testimonial.name}</span>
                <span className={styles.role}>{testimonial.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
