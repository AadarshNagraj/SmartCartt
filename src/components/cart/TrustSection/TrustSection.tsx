import React from 'react';
import { ShieldCheck, RefreshCw, Truck, Lock } from 'lucide-react';
import styles from './TrustSection.module.css';

export function TrustSection() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <ShieldCheck size={16} />
        <span>Secure Checkout</span>
      </div>
      <div className={styles.item}>
        <RefreshCw size={16} />
        <span>Easy Returns</span>
      </div>
      <div className={styles.item}>
        <Truck size={16} />
        <span>Fast Delivery</span>
      </div>
      <div className={styles.item}>
        <Lock size={16} />
        <span>Safe Payments</span>
      </div>
    </div>
  );
}
