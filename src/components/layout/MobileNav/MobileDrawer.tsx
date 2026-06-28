"use client";

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';
import { mainNavigation, secondaryNavigation } from '@/lib/constants/navigation';
import styles from './MobileDrawer.module.css';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Escape key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

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
            ref={drawerRef}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
          >
            <div className={styles.header}>
              <span className={styles.logoText}>SmartCart</span>
              <button 
                onClick={onClose} 
                className={styles.closeBtn}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <div className={styles.content}>
              <nav>
                <ul className={styles.mainNav}>
                  <li>
                    <Link href="/" className={styles.link} onClick={onClose}>Home</Link>
                  </li>
                  {mainNavigation.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className={styles.link} onClick={onClose}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <hr className={styles.divider} />

                <ul className={styles.secondaryNav}>
                  <li><Link href="/account" className={styles.link} onClick={onClose}>Account</Link></li>
                  <li><Link href="/wishlist" className={styles.link} onClick={onClose}>Wishlist</Link></li>
                  <li><Link href="/orders" className={styles.link} onClick={onClose}>Orders</Link></li>
                </ul>

                <hr className={styles.divider} />

                <ul className={styles.secondaryNav}>
                  {secondaryNavigation.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className={styles.link} onClick={onClose}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
