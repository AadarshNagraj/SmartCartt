"use client";

import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useSearch } from '../SearchProvider';
import styles from './SearchTrigger.module.css';

export function SearchTrigger() {
  const { openSearch } = useSearch();
  const [shortcut, setShortcut] = useState('⌘K');

  useEffect(() => {
    // Detect OS for shortcut hint
    const isMac = navigator.userAgent.toLowerCase().includes('mac');
    setShortcut(isMac ? '⌘K' : 'Ctrl K');
  }, []);

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
