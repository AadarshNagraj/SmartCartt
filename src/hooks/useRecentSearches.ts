import { useState, useEffect, useCallback } from 'react';

const RECENT_SEARCHES_KEY = 'smartcart_recent_searches';
const MAX_RECENT_SEARCHES = 5;

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        // eslint-disable-next-line
        setRecentSearches(JSON.parse(stored));
      }
    } catch {
      console.warn('Failed to load recent searches from localStorage');
    }
  }, []);

  const addRecentSearch = useCallback((query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setRecentSearches(prev => {
      // Remove it if it already exists to move it to the top
      const filtered = prev.filter(s => s.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, MAX_RECENT_SEARCHES);
      
      try {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      } catch {
        console.warn('Failed to save recent search to localStorage');
      }
      
      return updated;
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch (e) {
      // Ignore
    }
  }, []);

  return {
    recentSearches,
    addRecentSearch,
    clearRecentSearches
  };
}
