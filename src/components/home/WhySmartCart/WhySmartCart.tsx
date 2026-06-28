import React from 'react';
import { Leaf, Zap, Headphones, ShieldCheck } from 'lucide-react';
import styles from './WhySmartCart.module.css';

const reasons = [
  {
    icon: Zap,
    title: 'Cutting-Edge Tech',
    description: 'We source only the most advanced electronics to keep you ahead of the curve.'
  },
  {
    icon: Headphones,
    title: 'Audiophile Grade',
    description: 'Experience sound exactly as the creator intended with our premium audio selection.'
  },
  {
    icon: ShieldCheck,
    title: 'Extended Warranty',
    description: 'Every product comes with our comprehensive 2-year protection plan built-in.'
  },
  {
    icon: Leaf,
    title: 'Sustainable Packaging',
    description: '100% recyclable materials used in all our shipping and product packaging.'
  }
];

export function WhySmartCart() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Why SmartCart?</h2>
          <p className={styles.subtitle}>We believe in quality without compromise.</p>
        </div>
        
        <div className={styles.grid}>
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div key={index} className={styles.card}>
                <div className={styles.iconWrapper}>
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className={styles.cardTitle}>{reason.title}</h3>
                <p className={styles.cardDescription}>{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
