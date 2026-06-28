"use client";

import React from 'react';
import { Minus, Plus } from 'lucide-react';
import styles from './QuantityStepper.module.css';

interface QuantityStepperProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  disabled?: boolean;
}

export function QuantityStepper({ quantity, onIncrease, onDecrease, disabled }: QuantityStepperProps) {
  return (
    <div className={styles.container}>
      <button 
        className={styles.button} 
        onClick={onDecrease}
        disabled={disabled || quantity <= 1}
        aria-label="Decrease quantity"
      >
        <Minus size={14} />
      </button>
      
      <span className={styles.quantity} aria-live="polite">
        {quantity}
      </span>
      
      <button 
        className={styles.button} 
        onClick={onIncrease}
        disabled={disabled}
        aria-label="Increase quantity"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
