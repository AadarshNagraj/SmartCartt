"use client";

import React, { useRef, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import styles from './SearchInput.module.css';

interface SearchInputProps {
  query: string;
  setQuery: (val: string) => void;
  isLoading: boolean;
  onClose: () => void;
}

export function SearchInput({ query, setQuery, isLoading, onClose }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus when mounted
  useEffect(() => {
    // Small delay to ensure the framer-motion animation has started 
    // so focus doesn't cause a layout jump
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container}>
      <Search className={styles.searchIcon} size={24} />
      
      <input
        ref={inputRef}
        type="text"
        className={styles.input}
        placeholder="Search SmartCart..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        role="combobox"
        aria-expanded="true"
        aria-controls="search-results"
        aria-autocomplete="list"
      />

      <div className={styles.actions}>
        {isLoading && <Loader2 className={styles.spinner} size={20} />}
        
        {query && !isLoading && (
          <button 
            className={styles.clearBtn} 
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
          >
            <X size={20} />
          </button>
        )}
        
        <button className={styles.escBadge} onClick={onClose} aria-label="Close search">
          ESC
        </button>
      </div>
    </div>
  );
}
