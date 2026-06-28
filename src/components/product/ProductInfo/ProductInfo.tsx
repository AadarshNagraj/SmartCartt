"use client";

import React from 'react';
import { Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductModel, ProductVariant } from '@/commerce/models';
import { formatMoney } from '@/commerce/utils/helpers';
import styles from './ProductInfo.module.css';

interface ProductInfoProps {
  product: ProductModel;
  activeVariant?: ProductVariant;
}

export function ProductInfo({ product, activeVariant }: ProductInfoProps) {
  // Use variant price if available, otherwise fallback to min product price
  const price = activeVariant ? activeVariant.price : product.priceRange.minVariantPrice;
  const compareAtPrice = activeVariant ? activeVariant.compareAtPrice : null;
  const isAvailable = activeVariant ? activeVariant.availableForSale : product.availableForSale;

  return (
    <div className={styles.container}>
      <div className={styles.brandRating}>
        <span className={styles.brand}>{product.vendor}</span>
        
        {/* Mocked Rating for now - in reality this would come from a meta field or reviews app */}
        <div className={styles.rating}>
          <Star size={14} fill="currentColor" className={styles.star} />
          <span className={styles.ratingValue}>4.8</span>
          <span className={styles.reviewCount}>(1,248)</span>
        </div>
      </div>

      <h1 className={styles.title}>{product.title}</h1>
      
      <p className={styles.description}>{product.description}</p>

      <div className={styles.priceContainer}>
        <AnimatePresence mode="wait">
          <motion.div
            key={price.amount}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={styles.priceBlock}
          >
            <div className={styles.priceWrapper}>
              <span className={styles.price}>{formatMoney(price.amount, price.currencyCode)}</span>
              {compareAtPrice && (
                <span className={styles.comparePrice}>{formatMoney(compareAtPrice.amount, compareAtPrice.currencyCode)}</span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.stockStatus}>
        <span className={isAvailable ? styles.inStock : styles.outOfStock}>
          {isAvailable ? 'In Stock — Ready to Ship' : 'Out of Stock'}
        </span>
      </div>
    </div>
  );
}
