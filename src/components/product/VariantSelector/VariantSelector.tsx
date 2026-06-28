"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { ProductOption } from '@/lib/types/product';
import styles from './VariantSelector.module.css';

interface VariantSelectorProps {
  options: ProductOption[];
  selectedOptions: { [key: string]: string };
  onSelectOption: (optionName: string, value: string) => void;
}

// A simple map to translate color names to hex codes for the UI
const colorMap: { [key: string]: string } = {
  Black: '#000000',
  White: '#FFFFFF',
  Sand: '#D2B48C',
  Orange: '#FFA500',
  Silver: '#C0C0C0',
  Grey: '#808080'
};

export function VariantSelector({ options, selectedOptions, onSelectOption }: VariantSelectorProps) {
  if (!options || options.length === 0) return null;

  return (
    <div className={styles.container}>
      {options.map((option) => {
        const isColorOption = option.name.toLowerCase() === 'color';
        const selectedValue = selectedOptions[option.name];

        return (
          <div key={option.id} className={styles.optionGroup}>
            <div className={styles.header}>
              <span className={styles.optionName}>{option.name}</span>
              <span className={styles.selectedValue}>{selectedValue}</span>
            </div>

            <div className={clsx(styles.values, isColorOption ? styles.colorValues : styles.pillValues)}>
              {option.values.map((value) => {
                const isSelected = selectedValue === value;
                
                if (isColorOption) {
                  const hexCode = colorMap[value] || '#CCCCCC';
                  return (
                    <button
                      key={value}
                      className={clsx(styles.colorSwatch, isSelected && styles.selectedColor)}
                      onClick={() => onSelectOption(option.name, value)}
                      aria-label={`Select ${value}`}
                      aria-pressed={isSelected}
                    >
                      <span 
                        className={styles.colorFill} 
                        style={{ backgroundColor: hexCode }} 
                      />
                      {isSelected && (
                        <motion.span 
                          layoutId={`color-ring-${option.name}`}
                          className={styles.colorRing}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                }

                return (
                  <button
                    key={value}
                    className={clsx(styles.pill, isSelected && styles.selectedPill)}
                    onClick={() => onSelectOption(option.name, value)}
                    aria-pressed={isSelected}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId={`pill-bg-${option.name}`}
                        className={styles.pillBg}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className={styles.pillText}>{value}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
