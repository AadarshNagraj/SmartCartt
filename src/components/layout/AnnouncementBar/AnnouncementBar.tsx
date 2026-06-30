"use client";

import React, { useState } from 'react';
import { Truck, RotateCcw, ShieldCheck, BadgeCheck, X } from 'lucide-react';
import styles from './AnnouncementBar.module.css';

const announcements = [
  { icon: Truck, text: 'Free Delivery on orders above ₹999' },
  { icon: RotateCcw, text: 'Easy 7-Day Returns' },
  { icon: ShieldCheck, text: 'Secure Payments' },
  { icon: BadgeCheck, text: '100% Authentic Products' },
];

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className={styles.announcement} role="banner">
      <div className={styles.container}>
        <div className={styles.items}>
          {announcements.map((item, index) => {
            const Icon = item.icon;
            return (
              <React.Fragment key={index}>
                <div className={styles.item}>
                  <Icon size={13} strokeWidth={2} className={styles.itemIcon} />
                  <span className={styles.itemText}>{item.text}</span>
                </div>
                {index < announcements.length - 1 && (
                  <span className={styles.divider} aria-hidden="true">|</span>
                )}
              </React.Fragment>
            );
          })}
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className={styles.closeBtn}
          aria-label="Close announcement bar"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
