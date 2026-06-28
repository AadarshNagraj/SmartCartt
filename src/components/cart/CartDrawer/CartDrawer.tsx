"use client";

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { CartItem } from '../CartItem/CartItem';
import { CartEmptyState } from '../CartEmptyState/CartEmptyState';
import { CartSummary } from '../CartSummary/CartSummary';
import { ShippingProgress } from '../ShippingProgress/ShippingProgress';
import { TrustSection } from '../TrustSection/TrustSection';
import { trackBeginCheckout } from '@/lib/analytics';
import styles from './CartDrawer.module.css';

export function CartDrawer() {
  const { isDrawerOpen, closeDrawer, cart } = useCartStore();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Focus trap and ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        closeDrawer();
      }
    };

    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
      // Focus trap for accessibility could go here
    } else {
      document.body.style.overflow = '';
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen, closeDrawer]);

  const isEmpty = !cart || cart.lines.length === 0;

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.backdrop}
            onClick={closeDrawer}
            aria-hidden="true"
          />

          <motion.div
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-label="Your Cart"
          >
            <div className={styles.header}>
              <h2 className={styles.title}>
                Cart {cart?.totalQuantity ? `(${cart.totalQuantity})` : ''}
              </h2>
              <button 
                className={styles.closeBtn} 
                onClick={closeDrawer}
                aria-label="Close cart"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className={styles.body}>
              {isEmpty ? (
                <CartEmptyState />
              ) : (
                <div className={styles.itemsList}>
                  {cart.lines.map((line) => (
                    <CartItem key={line.id} item={line} />
                  ))}
                </div>
              )}
            </div>

            {!isEmpty && cart && (
              <div className={styles.footer}>
                <ShippingProgress subtotal={parseFloat(cart.cost.subtotalAmount.amount)} />
                <CartSummary cart={cart} />
                <button 
                  className={styles.checkoutBtn}
                  onClick={() => {
                    if (cart.checkoutUrl) {
                      trackBeginCheckout(cart);
                      window.location.href = cart.checkoutUrl;
                    }
                  }}
                >
                  Proceed to Secure Checkout
                </button>
                <TrustSection />
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
