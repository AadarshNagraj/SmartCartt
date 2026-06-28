"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { CartItem } from '@/components/cart/CartItem/CartItem';
import { CartSummary } from '@/components/cart/CartSummary/CartSummary';
import { ShippingProgress } from '@/components/cart/ShippingProgress/ShippingProgress';
import { TrustSection } from '@/components/cart/TrustSection/TrustSection';
import { CartEmptyState } from '@/components/cart/CartEmptyState/CartEmptyState';
import styles from './page.module.css';

export default function CartPage() {
  const { cart, isLoading, initializeCart } = useCartStore();

  useEffect(() => {
    initializeCart();
  }, [initializeCart]);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <h1>Your Cart</h1>
          {/* A simple placeholder while loading */}
          <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Loading Cart...
          </div>
        </div>
      </div>
    );
  }

  const isEmpty = !cart || cart.lines.length === 0;

  if (isEmpty) {
    return (
      <div className={styles.page}>
        <div className={styles.emptyContainer}>
          <CartEmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Your Cart</h1>
          <Link href="/collections/all" className={styles.continueLink}>
            <ChevronLeft size={16} />
            Continue Shopping
          </Link>
        </div>

        <div className={styles.layout}>
          {/* Left Column: Items */}
          <div className={styles.itemsCol}>
            <div className={styles.itemsList}>
              {cart.lines.map(line => (
                <CartItem key={line.id} item={line} />
              ))}
            </div>
          </div>

          {/* Right Column: Summary */}
          <div className={styles.summaryCol}>
            <ShippingProgress subtotal={parseFloat(cart.cost.subtotalAmount.amount)} />
            <CartSummary cart={cart} />
            <button 
              className={styles.checkoutBtn}
              onClick={() => alert("Proceeding to secure checkout...")}
            >
              Proceed to Secure Checkout
            </button>
            <TrustSection />
          </div>
        </div>
      </div>
    </div>
  );
}
