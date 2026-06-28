"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './SortDropdown.module.css';
import { clsx } from 'clsx';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'best-selling', label: 'Best Selling' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

export function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const currentSort = searchParams.get('sort') || 'featured';
  const currentLabel = sortOptions.find(opt => opt.value === currentSort)?.label || 'Sort by';

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'featured') {
      params.delete('sort');
    } else {
      params.set('sort', value);
    }
    router.push(`?${params.toString()}`, { scroll: false });
    setIsOpen(false);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button 
        className={styles.trigger} 
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={styles.label}>Sort by: </span>
        <span className={styles.value}>{currentLabel}</span>
        <ChevronDown size={16} className={clsx(styles.icon, isOpen && styles.iconOpen)} />
      </button>

      {isOpen && (
        <ul className={styles.menu} role="listbox">
          {sortOptions.map((option) => (
            <li key={option.value} role="none">
              <button
                role="option"
                aria-selected={currentSort === option.value}
                className={clsx(styles.option, currentSort === option.value && styles.selected)}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
                {currentSort === option.value && <Check size={16} className={styles.checkIcon} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
