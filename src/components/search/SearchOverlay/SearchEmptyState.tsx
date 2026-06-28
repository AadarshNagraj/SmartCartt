import React from 'react';
import { SearchX } from 'lucide-react';
import styles from './SearchEmptyState.module.css';

export function SearchEmptyState({ query }: { query: string }) {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <SearchX size={32} strokeWidth={1.5} />
      </div>
      <div className={styles.emptyState}>
        <p className={styles.title}>No results found for &quot;{query}&quot;</p>
        <p className={styles.hint}>Try checking your spelling or using different keywords.</p>
      </div>
    </div>
  );
}
