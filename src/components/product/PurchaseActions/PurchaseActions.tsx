"use client";

import React, { useState } from 'react';
import { Heart, Share } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import { motion } from 'framer-motion';
import styles from './PurchaseActions.module.css';
import { clsx } from 'clsx';

interface PurchaseActionsProps {
  onAddToCart: () => void;
  onBuyNow: () => void;
  isAvailable: boolean;
}

export function PurchaseActions({ onAddToCart, onBuyNow, isAvailable }: PurchaseActionsProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.mainActions}>
        <Button 
          variant="primary" 
          size="lg" 
          className={styles.addBtn}
          onClick={onAddToCart}
          disabled={!isAvailable}
        >
          {isAvailable ? 'Add to Cart' : 'Out of Stock'}
        </Button>
        <Button 
          variant="secondary" 
          size="lg" 
          className={styles.buyBtn}
          onClick={onBuyNow}
          disabled={!isAvailable}
        >
          Buy Now
        </Button>
      </div>

      <div className={styles.secondaryActions}>
        <button 
          className={clsx(styles.iconBtn, isWishlisted && styles.wishlisted)}
          onClick={() => setIsWishlisted(!isWishlisted)}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <motion.div whileTap={{ scale: 0.8 }}>
            <Heart size={20} fill={isWishlisted ? 'currentColor' : 'transparent'} />
          </motion.div>
          <span>Wishlist</span>
        </button>

        <button className={styles.iconBtn} aria-label="Share product">
          <Share size={20} />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
}
