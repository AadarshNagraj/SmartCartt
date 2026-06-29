"use client";

import React, { useState, useEffect, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearch } from '../SearchProvider';
import { SearchInput } from '../SearchInput/SearchInput';
import { SearchIdleState } from './SearchIdleState';
import { SearchResults } from './SearchResults';
import { useRecentSearches } from '@/hooks/useRecentSearches';
import { fetchPredictiveSearch } from '@/lib/shopify/searchService';
import { PredictiveSearchResult } from '@/lib/types/search';
import { trackSearch } from '@/lib/analytics';
import styles from './SearchOverlay.module.css';

export function SearchOverlay() {
  const { isOpen, closeSearch } = useSearch();
  const { recentSearches, addRecentSearch, clearRecentSearches } = useRecentSearches();
  
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<PredictiveSearchResult | null>(null);

  // Debounce query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const [, startFetchTransition] = useTransition();

  // Fetch results when debounced query changes
  useEffect(() => {
    let isMounted = true;
    
    if (debouncedQuery.trim().length > 0) {
      startFetchTransition(() => { setIsLoading(true); });
      fetchPredictiveSearch(debouncedQuery).then(res => {
        if (isMounted) {
          setResults(res);
          setIsLoading(false);
        }
      });
    } else {
      setResults(null);
      setIsLoading(false);
    }
    
    return () => { isMounted = false; };
  }, [debouncedQuery]);

  // Lock body scroll when open; reset query via event handler not effect state
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleClose = () => {
    setQuery(''); // Reset query when user explicitly closes
    closeSearch();
  };

  const handleSelectResult = (url: string, itemTitle: string) => {
    trackSearch(query);
    addRecentSearch(itemTitle);
    handleClose();
    window.location.href = url;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={styles.backdrop}
            onClick={handleClose}
            aria-hidden="true"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-label="Search"
          >
            <SearchInput 
              query={query} 
              setQuery={setQuery} 
              isLoading={isLoading} 
              onClose={handleClose} 
            />
            
            <div className={styles.content}>
              {query.trim().length === 0 ? (
                <SearchIdleState 
                  recentSearches={recentSearches}
                  onSelectRecent={(val) => setQuery(val)}
                  onClearRecent={clearRecentSearches}
                />
              ) : (
                <SearchResults 
                  results={results} 
                  isLoading={isLoading}
                  query={query}
                  onSelect={handleSelectResult}
                />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
