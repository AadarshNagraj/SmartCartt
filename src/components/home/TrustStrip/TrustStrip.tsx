import React from 'react';
import { Truck, ShieldCheck, RefreshCcw, Award } from 'lucide-react';
import styles from './TrustStrip.module.css';

const trustPoints = [
  { icon: Truck, text: 'Fast Delivery' },
  { icon: ShieldCheck, text: 'Secure Payments' },
  { icon: RefreshCcw, text: 'Easy Returns' },
  { icon: Award, text: 'Premium Quality' },
];

export function TrustStrip() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div key={index} className={styles.point}>
                <Icon size={24} strokeWidth={1.5} className={styles.icon} />
                <span className={styles.text}>{point.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
