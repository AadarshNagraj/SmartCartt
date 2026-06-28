"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './ShippingProgress.module.css';

export function ShippingProgress({ subtotal }: { subtotal: number }) {
  const FREE_SHIPPING_THRESHOLD = 999;
  
  const percentage = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
  const isFree = subtotal >= FREE_SHIPPING_THRESHOLD;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {isFree ? (
          <span className={styles.successText}>You've unlocked Free Shipping!</span>
        ) : (
          <span>
            Only <span className={styles.highlight}>₹{remaining.toFixed(2)}</span> away from <strong>Free Shipping</strong>
          </span>
        )}
      </div>
      
      <div className={styles.track}>
        <motion.div 
          className={styles.fill}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ backgroundColor: isFree ? 'var(--color-success)' : 'var(--color-primary)' }}
        />
      </div>
    </div>
  );
}
