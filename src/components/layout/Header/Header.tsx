"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart, User } from 'lucide-react';
import { clsx } from 'clsx';
import { mainNavigation } from '@/lib/constants/navigation';
import { SearchTrigger } from '@/components/search/SearchTrigger/SearchTrigger';
import { CartButton } from './CartButton';
import styles from './Header.module.css';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={clsx(styles.header, isScrolled && styles.scrolled)}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label="SmartCart Home">
          {/* We'll use text as placeholder until next/image with actual logo is ready */}
          <span className={styles.logoText}>SmartCart</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.nav} aria-label="Main Navigation">
          <ul className={styles.navList}>
            {mainNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.navLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Search */}
        <div className={styles.searchContainer}>
          <SearchTrigger />
        </div>

        {/* Icons */}
        <div className={styles.actions}>
          <Link href="/wishlist" className={styles.iconBtn} aria-label="Wishlist">
            <Heart size={24} strokeWidth={1.5} />
          </Link>
          <Link href="/account" className={styles.iconBtn} aria-label="Account">
            <User size={24} strokeWidth={1.5} />
          </Link>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
