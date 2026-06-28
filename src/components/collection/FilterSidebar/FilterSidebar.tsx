import React from 'react';
import { FilterSection } from '../FilterSection/FilterSection';
import { collectionFilters } from '@/lib/constants/mockData';
import styles from './FilterSidebar.module.css';

export function FilterSidebar() {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>Filters</h2>
      <div className={styles.filters}>
        {collectionFilters.map(group => (
          <FilterSection key={group.id} group={group} defaultExpanded={true} />
        ))}
      </div>
    </aside>
  );
}
