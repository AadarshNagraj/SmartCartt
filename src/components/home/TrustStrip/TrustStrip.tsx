import React from 'react';
import { Truck, ShieldCheck, RefreshCcw, Award } from 'lucide-react';
import styles from './TrustStrip.module.css';

const trustPoints = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    subtitle: 'On orders above ₹999',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    subtitle: '100% protected',
  },
  {
    icon: RefreshCcw,
    title: 'Easy Returns',
    subtitle: '7-day return policy',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    subtitle: 'Top brands & products',
  },
];

export function TrustStrip() {
  return (
    <section className={styles.section} aria-label="Why shop with SmartCart">
      <div className={styles.container}>
        <div className={styles.grid}>
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div key={index} className={styles.card}>
                <div className={styles.iconWrapper}>
                  <Icon size={22} strokeWidth={1.75} className={styles.icon} />
                </div>
                <div className={styles.textGroup}>
                  <span className={styles.title}>{point.title}</span>
                  <span className={styles.subtitle}>{point.subtitle}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
