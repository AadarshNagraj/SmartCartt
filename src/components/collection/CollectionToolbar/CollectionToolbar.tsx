"use client";

import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { SortDropdown } from './SortDropdown';
import { ViewSwitcher } from './ViewSwitcher';
import { FilterChip } from '../FilterChip/FilterChip';
import styles from './CollectionToolbar.module.css';
import { useSearchParams, useRouter } from 'next/navigation';

interface CollectionToolbarProps {
  productCount: number;
  onOpenMobileFilters: () => void;
}

export function CollectionToolbar({ productCount, onOpenMobileFilters }: CollectionToolbarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract active filters (excluding 'sort' and 'grid')
  const activeFilters: { key: string; value: string }[] = [];
  searchParams.forEach((value, key) => {
    if (key !== 'sort' && key !== 'grid') {
      // Handle multiple values for the same key if they are comma separated (e.g. brand=sony,apple)
      const values = value.split(',');
      values.forEach(v => {
        if (v) activeFilters.push({ key, value: v });
      });
    }
  });

  const removeFilter = (key: string, valueToRemove: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValue = params.get(key);
    
    if (currentValue) {
      const values = currentValue.split(',').filter(v => v !== valueToRemove);
      if (values.length > 0) {
        params.set(key, values.join(','));
      } else {
        params.delete(key);
      }
      router.push(`?${params.toString()}`, { scroll: false });
    }
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    // Keep layout and sort state
    const sort = params.get('sort');
    const grid = params.get('grid');
    
    // Create new params with only preserved keys
    const newParams = new URLSearchParams();
    if (sort) newParams.set('sort', sort);
    if (grid) newParams.set('grid', grid);
    
    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <div className={styles.left}>
          <button 
            className={styles.filterToggle} 
            onClick={onOpenMobileFilters}
            aria-label="Open filters"
          >
            <SlidersHorizontal size={18} />
            <span>Filters</span>
          </button>
          <span className={styles.count}>Showing {productCount} products</span>
        </div>
        
        <div className={styles.right}>
          <SortDropdown />
          <ViewSwitcher />
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className={styles.activeFilters}>
          <span className={styles.activeFiltersLabel}>Active Filters:</span>
          <div className={styles.chips}>
            {activeFilters.map((filter, idx) => (
              <FilterChip 
                key={`${filter.key}-${filter.value}-${idx}`} 
                label={filter.value} 
                onRemove={() => removeFilter(filter.key, filter.value)} 
              />
            ))}
            <button className={styles.clearAll} onClick={clearAllFilters}>
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
