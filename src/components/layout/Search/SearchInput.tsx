"use client";

import React from 'react';
import { Search, X } from 'lucide-react';
import { useSearch } from './SearchProvider';
import styles from './SearchInput.module.css';

export function SearchInput() {
  const { searchQuery, setSearchQuery, openSearch, isOpen, closeSearch } = useSearch();

  return (
    <div className={styles.container}>
      <Search size={18} className={styles.icon} />
      <input 
        type="text" 
        placeholder="Search products, brands and more..." 
        className={styles.input}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={openSearch}
      />
      {searchQuery && (
        <button 
          className={styles.clearBtn} 
          onClick={() => {
            setSearchQuery("");
            closeSearch();
          }}
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
