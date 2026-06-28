"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, MapPin, Package, Settings, LogOut, ChevronDown, Heart } from 'lucide-react';
import { useSession } from '@/providers/AuthProvider';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AccountSidebar.module.css';

const NAV_ITEMS = [
  { label: 'Overview', href: '/account', icon: User, exact: true },
  { label: 'Orders', href: '/account/orders', icon: Package },
  { label: 'Wishlist', href: '/wishlist', icon: Heart }, // Linking to global wishlist
  { label: 'Addresses', href: '/account/addresses', icon: MapPin },
  { label: 'Security & Settings', href: '/account/security', icon: Settings },
];

export function AccountSidebar() {
  const pathname = usePathname();
  const { session, logout } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const currentItem = NAV_ITEMS.find(item => 
    item.exact ? pathname === item.href : pathname.startsWith(item.href)
  ) || NAV_ITEMS[0];

  return (
    <aside className={styles.sidebar}>
      {/* Mobile Header / Toggle */}
      <div className={styles.mobileHeader}>
        <button 
          className={styles.mobileToggle}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className={styles.mobileToggleInfo}>
            <span className={styles.mobileToggleLabel}>Account</span>
            <span className={styles.mobileToggleCurrent}>{currentItem.label}</span>
          </div>
          <ChevronDown 
            size={20} 
            style={{ transform: isMobileMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
          />
        </button>
      </div>

      {/* Navigation Links */}
      <AnimatePresence initial={false}>
        <motion.nav 
          className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ''}`}
        >
          <div className={styles.greeting}>
            <div className={styles.avatar}>
              {session?.customer?.firstName.charAt(0) || 'U'}
            </div>
            <div className={styles.userInfo}>
              <span className={styles.welcome}>Hello,</span>
              <span className={styles.name}>{session?.customer?.firstName}</span>
            </div>
          </div>

          <div className={styles.links}>
            {NAV_ITEMS.map((item) => {
              const isActive = item.exact 
                ? pathname === item.href 
                : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.link} ${isActive ? styles.active : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className={styles.footer}>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </motion.nav>
      </AnimatePresence>
    </aside>
  );
}
