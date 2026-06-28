"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';
import styles from './CartBadge.module.css';

export function CartBadge() {
  const { cart } = useCartStore();
  const quantity = cart?.totalQuantity || 0;
  
  const [hasMounted, setHasMounted] = useState(false);
  const [prevQuantity, setPrevQuantity] = useState(quantity);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted && quantity !== prevQuantity) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      setPrevQuantity(quantity);
      return () => clearTimeout(timer);
    }
  }, [quantity, prevQuantity, hasMounted]);

  if (!hasMounted || quantity === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="badge"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isAnimating ? [1, 1.3, 1] : 1,
          opacity: 1 
        }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={styles.badge}
      >
        {quantity > 99 ? '99+' : quantity}
      </motion.div>
    </AnimatePresence>
  );
}
