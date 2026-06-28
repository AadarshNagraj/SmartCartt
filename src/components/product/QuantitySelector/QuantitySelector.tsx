"use client";

import React from 'react';
import { Minus, Plus } from 'lucide-react';
import styles from './QuantitySelector.module.css';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export function QuantitySelector({ quantity, onIncrease, onDecrease }: QuantitySelectorProps) {
  return (
    <div className={styles.container}>
      <button 
        className={styles.btn} 
        onClick={onDecrease}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>
      
      <span className={styles.value} aria-live="polite">
        {quantity}
      </span>
      
      <button 
        className={styles.btn} 
        onClick={onIncrease}
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
