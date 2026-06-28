"use client";

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Tag } from 'lucide-react';
import { CartModel } from '@/commerce/models';
import styles from './CartSummary.module.css';

// Animated number component
function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => `$${current.toFixed(2)}`);

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}

export function CartSummary({ cart }: { cart: CartModel | null }) {
  const [couponCode, setCouponCode] = useState('');

  if (!cart) return null;

  const subtotal = parseFloat(cart.cost.subtotalAmount.amount);
  const tax = cart.cost.totalTaxAmount ? parseFloat(cart.cost.totalTaxAmount.amount) : 0;
  const total = parseFloat(cart.cost.totalAmount.amount);
  const shipping = subtotal > 999 ? 0 : 25; // Simple mock logic based on threshold

  const finalTotal = total + shipping;

  return (
    <div className={styles.container}>
      {/* Coupon Scaffold */}
      <div className={styles.couponSection}>
        <div className={styles.couponInputWrapper}>
          <Tag size={16} className={styles.couponIcon} />
          <input
            type="text"
            className={styles.couponInput}
            placeholder="Gift card or discount code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            disabled // Prepared for Shopify integration
          />
          <button className={styles.couponBtn} disabled>
            Apply
          </button>
        </div>
      </div>

      {/* Totals */}
      <div className={styles.totalsList}>
        <div className={styles.row}>
          <span className={styles.label}>Subtotal</span>
          <span className={styles.value}>
            <AnimatedNumber value={subtotal} />
          </span>
        </div>
        
        <div className={styles.row}>
          <span className={styles.label}>Shipping</span>
          <span className={styles.value}>
            {shipping === 0 ? 'Free' : <AnimatedNumber value={shipping} />}
          </span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Estimated Tax</span>
          <span className={styles.value}>
            <AnimatedNumber value={tax} />
          </span>
        </div>

        <div className={styles.divider} />

        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>Total</span>
          <span className={styles.totalValue}>
            <AnimatedNumber value={finalTotal} />
          </span>
        </div>
      </div>
      
      <p className={styles.checkoutNote}>
        Final taxes and discounts are calculated securely at checkout.
      </p>
    </div>
  );
}
