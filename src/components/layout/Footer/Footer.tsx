import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { footerNavigation } from '@/lib/constants/navigation';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          
          {/* Brand & Social */}
          <div className={styles.brandSection}>
            <Link href="/" className={styles.logoText}>SmartCart</Link>
            <p className={styles.tagline}>Shop Smart. Live Better.</p>
            <div className={styles.socials}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                Instagram
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                Twitter
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className={styles.navSection}>
            <h3 className={styles.heading}>Shop</h3>
            <ul className={styles.list}>
              {footerNavigation.shop.map(item => (
                <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className={styles.navSection}>
            <h3 className={styles.heading}>Company</h3>
            <ul className={styles.list}>
              {footerNavigation.company.map(item => (
                <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className={styles.navSection}>
            <h3 className={styles.heading}>Support</h3>
            <ul className={styles.list}>
              {footerNavigation.support.map(item => (
                <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className={styles.navSection}>
            <h3 className={styles.heading}>Legal</h3>
            <ul className={styles.list}>
              {footerNavigation.legal.map(item => (
                <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.bottom}>
          <p className={styles.copyright}>&copy; {new Date().getFullYear()} SmartCart. All rights reserved.</p>
          
          <div className={styles.trustSection}>
            <div className={styles.trustBadge}>
              <ShieldCheck size={16} />
              <span>100% Secure Checkout</span>
            </div>
            {/* Payment Methods placeholders */}
            <div className={styles.payments}>
              <span className={styles.paymentIcon}>VISA</span>
              <span className={styles.paymentIcon}>MC</span>
              <span className={styles.paymentIcon}>AMEX</span>
              <span className={styles.paymentIcon}>PAYPAL</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
