"use client";

import React from 'react';
import { Lock, Smartphone, Shield, MonitorSmartphone } from 'lucide-react';
import styles from './page.module.css';

export default function SecurityPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Security & Settings</h1>
        <p className={styles.subtitle}>Manage your password and account security preferences.</p>
      </div>

      <div className={styles.grid}>
        {/* Password */}
        <section className={styles.card}>
          <div className={styles.cardIcon}><Lock size={20} /></div>
          <div className={styles.cardContent}>
            <h2 className={styles.cardTitle}>Password</h2>
            <p className={styles.cardDesc}>Last changed 3 months ago</p>
          </div>
          <button className={styles.actionBtn} disabled>Coming Soon</button>
        </section>

        {/* 2FA */}
        <section className={styles.card}>
          <div className={styles.cardIcon}><Smartphone size={20} /></div>
          <div className={styles.cardContent}>
            <h2 className={styles.cardTitle}>Two-Factor Authentication</h2>
            <p className={styles.cardDesc}>Add an extra layer of security to your account</p>
          </div>
          <button className={styles.actionBtn} disabled>Coming Soon</button>
        </section>

        {/* Connected Devices */}
        <section className={styles.card}>
          <div className={styles.cardIcon}><MonitorSmartphone size={20} /></div>
          <div className={styles.cardContent}>
            <h2 className={styles.cardTitle}>Active Sessions</h2>
            <p className={styles.cardDesc}>Manage the devices logged into your account</p>
          </div>
          <button className={styles.actionBtn} disabled>Coming Soon</button>
        </section>

        {/* Data Privacy */}
        <section className={`${styles.card} ${styles.dangerZone}`}>
          <div className={`${styles.cardIcon} ${styles.dangerIcon}`}><Shield size={20} /></div>
          <div className={styles.cardContent}>
            <h2 className={styles.cardTitle}>Data Privacy & Deletion</h2>
            <p className={styles.cardDesc}>Request an archive of your data or permanently delete your account.</p>
          </div>
          <button className={styles.dangerBtn} disabled>Coming Soon</button>
        </section>
      </div>
    </div>
  );
}
