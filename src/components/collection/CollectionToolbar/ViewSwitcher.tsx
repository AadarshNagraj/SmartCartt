"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LayoutGrid, Grid3X3, Grid2X2 } from 'lucide-react';
import styles from './ViewSwitcher.module.css';
import { clsx } from 'clsx';

export function ViewSwitcher() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Default to 4 on desktop, handled by CSS mostly, but we track intent
  const currentView = searchParams.get('grid') || '4';

  const handleSelect = (columns: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (columns === '4') {
      params.delete('grid');
    } else {
      params.set('grid', columns);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className={styles.container}>
      <button 
        className={clsx(styles.btn, currentView === '2' && styles.active)}
        onClick={() => handleSelect('2')}
        aria-label="View as 2 columns"
        title="2 Columns"
      >
        <Grid2X2 size={18} strokeWidth={currentView === '2' ? 2 : 1.5} />
      </button>
      <button 
        className={clsx(styles.btn, currentView === '3' && styles.active)}
        onClick={() => handleSelect('3')}
        aria-label="View as 3 columns"
        title="3 Columns"
      >
        <Grid3X3 size={18} strokeWidth={currentView === '3' ? 2 : 1.5} />
      </button>
      <button 
        className={clsx(styles.btn, currentView === '4' && styles.active)}
        onClick={() => handleSelect('4')}
        aria-label="View as 4 columns"
        title="4 Columns"
      >
        <LayoutGrid size={18} strokeWidth={currentView === '4' ? 2 : 1.5} />
      </button>
    </div>
  );
}
