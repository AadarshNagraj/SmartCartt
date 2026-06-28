"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { FilterSection } from '../FilterSection/FilterSection';
import { collectionFilters } from '@/lib/constants/mockData';
import { Button } from '@/components/ui/Button/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './FilterDrawer.module.css';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FilterDrawer({ isOpen, onClose }: FilterDrawerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Lock body scroll and prevent background interaction
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    const sort = params.get('sort');
    const grid = params.get('grid');
    
    const newParams = new URLSearchParams();
    if (sort) newParams.set('sort', sort);
    if (grid) newParams.set('grid', grid);
    
    router.push(`?${newParams.toString()}`, { scroll: false });
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
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
          >
            <div className={styles.header}>
              <h2 className={styles.title}>Filters</h2>
              <button 
                onClick={onClose} 
                className={styles.closeBtn}
                aria-label="Close filters"
              >
                <X size={24} />
              </button>
            </div>

            <div className={styles.content}>
              {collectionFilters.map(group => (
                <FilterSection key={group.id} group={group} defaultExpanded={false} />
              ))}
            </div>

            <div className={styles.footer}>
              <Button variant="secondary" onClick={handleClearFilters} className={styles.footerBtn}>
                Clear All
              </Button>
              <Button variant="primary" onClick={onClose} className={styles.footerBtn}>
                View Results
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
