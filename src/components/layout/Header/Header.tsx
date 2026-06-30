"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={clsx(styles.header, isScrolled && styles.scrolled)}>
      <div className={styles.container}>
        {/* Official SmartCart Logo */}
        <Link href="/" className={styles.logo} aria-label="SmartCart — Shop Smart. Live Better.">
          <Image
            src="/logo.svg"
            alt="SmartCart"
            width={160}
            height={44}
            priority
            className={styles.logoImage}
          />
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

        {/* Action Icons */}
        <div className={styles.actions}>
          <Link href="/wishlist" className={styles.iconBtn} aria-label="Wishlist">
            <Heart size={22} strokeWidth={1.5} />
          </Link>
          <Link href="/account" className={styles.iconBtn} aria-label="Account">
            <User size={22} strokeWidth={1.5} />
          </Link>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
