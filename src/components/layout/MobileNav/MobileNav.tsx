"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Home, Grid, Heart, User, Menu } from 'lucide-react';
import { MobileDrawer } from './MobileDrawer';
import styles from './MobileNav.module.css';

export function MobileNav() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <nav className={styles.bottomNav} aria-label="Mobile Navigation">
        <Link href="/" className={styles.navItem}>
          <Home size={24} strokeWidth={1.5} />
          <span>Home</span>
        </Link>
        <Link href="/categories" className={styles.navItem}>
          <Grid size={24} strokeWidth={1.5} />
          <span>Categories</span>
        </Link>
        <button className={styles.navItem} onClick={() => setIsDrawerOpen(true)}>
          <Menu size={24} strokeWidth={1.5} />
          <span>Menu</span>
        </button>
        <Link href="/wishlist" className={styles.navItem}>
          <Heart size={24} strokeWidth={1.5} />
          <span>Wishlist</span>
        </Link>
        <Link href="/account" className={styles.navItem}>
          <User size={24} strokeWidth={1.5} />
          <span>Account</span>
        </Link>
      </nav>

      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}
