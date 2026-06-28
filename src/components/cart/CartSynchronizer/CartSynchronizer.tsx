'use client';

import { useEffect, useRef } from 'react';
import { useCartStore } from '@/store/useCartStore';

export function CartSynchronizer() {
  const { initializeCart } = useCartStore();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      initializeCart();
    }
  }, [initializeCart]);

  return null; // This is a logic-only component
}
