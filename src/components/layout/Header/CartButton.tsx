"use client";

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { CartBadge } from '@/components/cart/CartBadge/CartBadge';
import styles from './Header.module.css';

export function CartButton() {
  const { openDrawer } = useCartStore();

  return (
    <button 
      className={styles.iconBtn} 
      onClick={openDrawer}
      aria-label="Open cart"
    >
      <div style={{ position: 'relative', display: 'flex' }}>
        <ShoppingBag size={24} strokeWidth={1.5} />
        <CartBadge />
      </div>
    </button>
  );
}
