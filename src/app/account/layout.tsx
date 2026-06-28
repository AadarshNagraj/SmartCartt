"use client";

import React from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AccountSidebar } from '@/components/account/AccountSidebar/AccountSidebar';
import styles from './layout.module.css';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className={styles.layout}>
        <div className={styles.container}>
          <div className={styles.sidebarWrapper}>
            <AccountSidebar />
          </div>
          <main className={styles.content}>
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
