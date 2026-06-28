"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { PredictiveSearchResult, PredictiveSearchProduct } from '@/lib/types/search';
import { SearchSkeleton } from './SearchSkeleton';
import { SearchEmptyState } from './SearchEmptyState';
import styles from './SearchResults.module.css';
import { clsx } from 'clsx';

interface SearchResultsProps {
  results: PredictiveSearchResult | null;
  isLoading: boolean;
  query: string;
  onSelect: (url: string, itemTitle: string) => void;
}

export function SearchResults({ results, isLoading, query, onSelect }: SearchResultsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [focusableItems, setFocusableItems] = useState<HTMLButtonElement[]>([]);

  useEffect(() => {
    if (!isLoading && containerRef.current) {
      const items = Array.from(containerRef.current.querySelectorAll(`button.${styles.resultItem}`)) as HTMLButtonElement[];
      setFocusableItems(items);
      setActiveIndex(-1);
    }
  }, [results, isLoading]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (focusableItems.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(prev => {
          const next = (prev + 1) % focusableItems.length;
          focusableItems[next]?.focus();
          return next;
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prev => {
          const next = prev <= 0 ? focusableItems.length - 1 : prev - 1;
          focusableItems[next]?.focus();
          return next;
        });
      } else if (e.key === 'Home') {
        e.preventDefault();
        setActiveIndex(0);
        focusableItems[0]?.focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        const last = focusableItems.length - 1;
        setActiveIndex(last);
        focusableItems[last]?.focus();
      } else if (e.key === 'Tab') {
        // We will let native tab handle group jumping if we use proper tabindex, 
        // but for a strict command palette, we usually hijack tab to behave like arrow down/up
        // or shift+tab.
        e.preventDefault();
        if (e.shiftKey) {
          setActiveIndex(prev => {
            const next = prev <= 0 ? focusableItems.length - 1 : prev - 1;
            focusableItems[next]?.focus();
            return next;
          });
        } else {
          setActiveIndex(prev => {
            const next = (prev + 1) % focusableItems.length;
            focusableItems[next]?.focus();
            return next;
          });
        }
      }
    };

    // Attach to window since input might be focused
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusableItems]);

  if (isLoading) {
    return <SearchSkeleton />;
  }

  if (!results) return null;

  const hasResults = 
    results.products.length > 0 || 
    results.collections.length > 0 || 
    results.pages.length > 0 || 
    results.articles.length > 0;

  if (!hasResults) {
    return <SearchEmptyState query={query} />;
  }

  // Highlight helper
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return <span>{text}</span>;
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) => 
          regex.test(part) ? <span key={i} className={styles.highlight}>{part}</span> : part
        )}
      </span>
    );
  };

  return (
    <div className={styles.container} ref={containerRef}>
      {results.products.length > 0 && (
        <div className={styles.group}>
          <h3 className={styles.groupTitle}>Products</h3>
          <ul className={styles.list}>
            {results.products.map(product => (
              <li key={product.id}>
                <button 
                  className={styles.resultItem}
                  onClick={() => onSelect(`/products/${product.handle}`, product.title)}
                >
                  {product.image && (
                    <div className={styles.imageWrapper}>
                      <Image 
                        src={product.image.url} 
                        alt={product.image.altText}
                        fill
                        sizes="40px"
                        className={styles.image}
                      />
                    </div>
                  )}
                  <div className={styles.itemInfo}>
                    <span className={styles.itemTitle}>{highlightText(product.title, query)}</span>
                    <span className={styles.itemPrice}>${product.price.amount}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {results.collections.length > 0 && (
        <div className={styles.group}>
          <h3 className={styles.groupTitle}>Collections</h3>
          <ul className={styles.list}>
            {results.collections.map(collection => (
              <li key={collection.id}>
                <button 
                  className={clsx(styles.resultItem, styles.simpleItem)}
                  onClick={() => onSelect(`/collections/${collection.handle}`, collection.title)}
                >
                  <span className={styles.itemTitle}>{highlightText(collection.title, query)}</span>
                  <ChevronRight size={16} className={styles.arrowIcon} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {results.pages.length > 0 && (
        <div className={styles.group}>
          <h3 className={styles.groupTitle}>Pages</h3>
          <ul className={styles.list}>
            {results.pages.map(page => (
              <li key={page.id}>
                <button 
                  className={clsx(styles.resultItem, styles.simpleItem)}
                  onClick={() => onSelect(`/pages/${page.handle}`, page.title)}
                >
                  <span className={styles.itemTitle}>{highlightText(page.title, query)}</span>
                  <ChevronRight size={16} className={styles.arrowIcon} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {results.articles.length > 0 && (
        <div className={styles.group}>
          <h3 className={styles.groupTitle}>Articles</h3>
          <ul className={styles.list}>
            {results.articles.map(article => (
              <li key={article.id}>
                <button 
                  className={clsx(styles.resultItem, styles.simpleItem)}
                  onClick={() => onSelect(`/blogs/news/${article.handle}`, article.title)}
                >
                  <span className={styles.itemTitle}>{highlightText(article.title, query)}</span>
                  <ChevronRight size={16} className={styles.arrowIcon} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
