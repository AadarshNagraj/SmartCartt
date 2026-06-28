"use client";

import React from 'react';
import { History, TrendingUp, Tags } from 'lucide-react';
import styles from './SearchIdleState.module.css';

interface SearchIdleStateProps {
  recentSearches: string[];
  onSelectRecent: (query: string) => void;
  onClearRecent: () => void;
}

const POPULAR_CATEGORIES = ['Audio', 'Wearables', 'Keyboards'];
const TRENDING_PRODUCTS = ['Sonic Pro Wireless Earbuds', 'Mechanical Keyboard Pro'];

export function SearchIdleState({ recentSearches, onSelectRecent, onClearRecent }: SearchIdleStateProps) {
  return (
    <div className={styles.container}>
      {recentSearches.length > 0 && (
        <div className={styles.section}>
          <div className={styles.header}>
            <h3 className={styles.title}>Recent Searches</h3>
            <button className={styles.clearBtn} onClick={onClearRecent}>Clear</button>
          </div>
          <ul className={styles.list}>
            {recentSearches.map((search, idx) => (
              <li key={idx}>
                <button className={styles.itemBtn} onClick={() => onSelectRecent(search)}>
                  <History size={16} className={styles.icon} />
                  <span>{search}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.section}>
        <div className={styles.header}>
          <h3 className={styles.title}>Popular Categories</h3>
        </div>
        <ul className={styles.list}>
          {POPULAR_CATEGORIES.map((category, idx) => (
            <li key={idx}>
              <button className={styles.itemBtn} onClick={() => onSelectRecent(category)}>
                <Tags size={16} className={styles.icon} />
                <span>{category}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <div className={styles.header}>
          <h3 className={styles.title}>Trending Products</h3>
        </div>
        <ul className={styles.list}>
          {TRENDING_PRODUCTS.map((product, idx) => (
            <li key={idx}>
              <button className={styles.itemBtn} onClick={() => onSelectRecent(product)}>
                <TrendingUp size={16} className={styles.icon} />
                <span>{product}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
