import React from 'react';
import { Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import styles from './DeliveryCards.module.css';

export function DeliveryCards() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <Truck size={20} strokeWidth={1.5} />
        </div>
        <div className={styles.content}>
          <span className={styles.title}>Free Delivery</span>
          <span className={styles.value}>Tomorrow</span>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <RotateCcw size={20} strokeWidth={1.5} />
        </div>
        <div className={styles.content}>
          <span className={styles.title}>Easy Returns</span>
          <span className={styles.value}>7 Days</span>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <ShieldCheck size={20} strokeWidth={1.5} />
        </div>
        <div className={styles.content}>
          <span className={styles.title}>Secure Checkout</span>
          <span className={styles.value}>Encrypted</span>
        </div>
      </div>
    </div>
  );
}
