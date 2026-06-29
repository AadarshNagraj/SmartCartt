"use client";

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useSearch } from '../SearchProvider';
import styles from './SearchTrigger.module.css';

export function SearchTrigger() {
  const { openSearch } = useSearch();
  // Lazy init - runs once on mount, safe on client only
  const [shortcut] = useState(() => {
    if (typeof navigator === 'undefined') return '⌘K';
    return navigator.userAgent.toLowerCase().includes('mac') ? '⌘K' : 'Ctrl K';
  });

  return (
    <button 
      className={styles.triggerBtn} 
      onClick={openSearch}
      aria-label="Search SmartCart"
    >
      <Search size={18} className={styles.icon} />
      <span className={styles.placeholder}>Search SmartCart...</span>
      <span className={styles.shortcut} aria-hidden="true">{shortcut}</span>
    </button>
  );
}
