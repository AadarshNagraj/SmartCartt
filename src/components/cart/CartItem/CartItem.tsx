"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { CartLineModel as CartLine } from '@/commerce/models';
import { QuantityStepper } from '../QuantityStepper/QuantityStepper';
import { useCartStore } from '@/store/useCartStore';
import styles from './CartItem.module.css';

export function CartItem({ item }: { item: CartLine }) {
  const { updateLine, removeLine } = useCartStore();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async () => {
    setIsRemoving(true);
    await removeLine(item.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0, scale: 0.95, marginBottom: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={styles.container}
    >
      <div className={styles.imageWrapper}>
        {item.merchandise.image ? (
          <Image
            src={item.merchandise.image.url}
            alt={item.merchandise.image.altText || item.merchandise.product.title}
            fill
            sizes="80px"
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder} />
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <h4 className={styles.title}>{item.merchandise.product.title}</h4>
            <span className={styles.variant}>{item.merchandise.title}</span>
          </div>
          <span className={styles.price}>
            ${parseFloat(item.cost.totalAmount.amount).toFixed(2)}
          </span>
        </div>

        <div className={styles.actions}>
          <QuantityStepper 
            quantity={item.quantity}
            onIncrease={() => updateLine(item.id, item.quantity + 1)}
            onDecrease={() => updateLine(item.id, item.quantity - 1)}
            disabled={isRemoving}
          />
          <button 
            className={styles.removeBtn} 
            onClick={handleRemove}
            disabled={isRemoving}
            aria-label="Remove item"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
