"use client";

import React from 'react';
import { PackageX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button/Button';
import styles from './EmptyState.module.css';

export function EmptyState() {
  const router = useRouter();

  const handleReset = () => {
    // Clear all filters but preserve route
    router.push('?', { scroll: false });
  };

  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <PackageX size={48} strokeWidth={1} />
      </div>
      <h3 className={styles.title}>No products found</h3>
      <p className={styles.description}>
        We couldn't find any products matching your current filters. Try removing some filters or adjusting your search.
      </p>
      <Button variant="secondary" onClick={handleReset} className={styles.action}>
        Clear Filters
      </Button>
    </div>
  );
}
