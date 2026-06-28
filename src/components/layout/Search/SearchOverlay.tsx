"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearch } from './SearchProvider';
import styles from './SearchOverlay.module.css';

export function SearchOverlay() {
  const { isOpen, closeSearch } = useSearch();

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
            onClick={closeSearch}
          />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={styles.dropdown}
          >
            <div className={styles.content}>
              {/* Future-ready architecture for Recent Searches, Popular Searches, Results */}
              <p className={styles.placeholder}>Search functionality will be integrated with Shopify later.</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
