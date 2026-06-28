"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button/Button';
import { ProductModel, ProductVariant } from '@/commerce/models';
import { formatMoney } from '@/commerce/utils/helpers';
import styles from './StickyPurchaseBar.module.css';

interface StickyPurchaseBarProps {
  product: ProductModel;
  activeVariant?: ProductVariant;
  onAddToCart: () => void;
  showBarThreshold?: number; // Scroll position to show bar
}

export function StickyPurchaseBar({ product, activeVariant, onAddToCart, showBarThreshold = 800 }: StickyPurchaseBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > showBarThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [showBarThreshold]);

  const price = activeVariant ? activeVariant.price : product.priceRange.minVariantPrice;
  const compareAtPrice = activeVariant?.compareAtPrice;
  const image = activeVariant?.image || product.images[0];
  const isAvailable = activeVariant ? activeVariant.availableForSale : product.availableForSale;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // In a real app, this might also open a mobile variant drawer or highlight the selector
  };

  const handleMobilePurchase = () => {
    if (!activeVariant && product.options.length > 0) {
      scrollToTop(); // Scroll to select variants
    } else {
      onAddToCart();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Desktop Bar (Sticky Top) */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={styles.desktopBar}
          >
            <div className={styles.container}>
              <div className={styles.left}>
                {image && (
                  <div className={styles.imageWrapper}>
                    <Image src={image.url} alt={image.altText || product.title} fill className={styles.image} sizes="48px" />
                  </div>
                )}
                <div className={styles.info}>
                  <span className={styles.title}>{product.title}</span>
                  <div className={styles.rating}>
                    <Star size={12} fill="currentColor" className={styles.star} />
                    <span>4.8</span>
                  </div>
                </div>
              </div>

              <div className={styles.right}>
                <div className={styles.priceBlock}>
                  <span className={styles.price}>{formatMoney(price.amount, price.currencyCode)}</span>
                {compareAtPrice && (
                  <span className={styles.comparePrice}>{formatMoney(compareAtPrice.amount, compareAtPrice.currencyCode)}</span>
                )}</div>
                <Button 
                  variant="primary" 
                  onClick={onAddToCart}
                  disabled={!isAvailable}
                  className={styles.addBtn}
                >
                  {isAvailable ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Mobile Bar (Sticky Bottom) */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={styles.mobileBar}
          >
            <div className={styles.mobileContainer}>
              <div className={styles.mobilePriceBlock}>
                <span className={styles.mobilePrice}>{formatMoney(price.amount, price.currencyCode)}</span>
                {!activeVariant && product.options.length > 0 && (
                  <span className={styles.mobileSelectPrompt}>Select options</span>
                )}
              </div>
              <Button 
                variant="primary" 
                onClick={handleMobilePurchase}
                disabled={!isAvailable}
                className={styles.mobileAddBtn}
              >
                {!activeVariant && product.options.length > 0 ? 'Select' : (isAvailable ? 'Add to Cart' : 'Out of Stock')}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
