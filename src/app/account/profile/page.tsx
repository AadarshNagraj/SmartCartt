"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from '@/providers/AuthProvider';
import { useToast } from '@/providers/ToastProvider';
import { Loader2, User, Mail, Phone, Globe, Bell, CreditCard } from 'lucide-react';
import styles from './page.module.css';

export default function ProfilePage() {
  const { session } = useSession();
  const { addToast } = useToast();
  
  const customer = session?.customer;
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (customer) {
      setFirstName(customer.firstName);
      setLastName(customer.lastName);
      setEmail(customer.email);
      setPhone(customer.phone || '');
    }
  }, [customer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Mock network request
      await new Promise(resolve => setTimeout(resolve, 800));
      addToast('Profile updated successfully', 'success');
    } catch (err) {
      addToast('Failed to update profile', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Profile</h1>
        <p className={styles.subtitle}>Manage your personal information and preferences.</p>
      </div>

      <div className={styles.layout}>
        {/* Main Form */}
        <section className={styles.mainSection}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Personal Details</h2>
            </div>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="firstName" className={styles.label}>First name</label>
                  <div className={styles.inputWrapper}>
                    <User size={16} className={styles.inputIcon} />
                    <input
                      id="firstName"
                      type="text"
                      className={styles.input}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="lastName" className={styles.label}>Last name</label>
                  <div className={styles.inputWrapper}>
                    <User size={16} className={styles.inputIcon} />
                    <input
                      id="lastName"
                      type="text"
                      className={styles.input}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <div className={styles.inputWrapper}>
                  <Mail size={16} className={styles.inputIcon} />
                  <input
                    id="email"
                    type="email"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.label}>Phone number</label>
                <div className={styles.inputWrapper}>
                  <Phone size={16} className={styles.inputIcon} />
                  <input
                    id="phone"
                    type="tel"
                    className={styles.input}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className={styles.formActions}>
                <button type="button" className={styles.secondaryBtn}>Cancel</button>
                <button type="submit" className={styles.primaryBtn} disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Future-proof Placeholders */}
        <aside className={styles.sideSection}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Preferences</h2>
            </div>
            <div className={styles.preferencesList}>
              <div className={styles.preferenceItem}>
                <div className={styles.preferenceIcon}><Globe size={18} /></div>
                <div className={styles.preferenceInfo}>
                  <span className={styles.preferenceName}>Language & Region</span>
                  <span className={styles.preferenceValue}>English (US), USD</span>
                </div>
                <button className={styles.editBtn} disabled>Edit</button>
              </div>
              
              <div className={styles.preferenceItem}>
                <div className={styles.preferenceIcon}><Bell size={18} /></div>
                <div className={styles.preferenceInfo}>
                  <span className={styles.preferenceName}>Marketing</span>
                  <span className={styles.preferenceValue}>Subscribed to emails</span>
                </div>
                <button className={styles.editBtn} disabled>Edit</button>
              </div>

              <div className={styles.preferenceItem}>
                <div className={styles.preferenceIcon}><CreditCard size={18} /></div>
                <div className={styles.preferenceInfo}>
                  <span className={styles.preferenceName}>Payment Methods</span>
                  <span className={styles.preferenceValue}>Manage saved cards</span>
                </div>
                <button className={styles.editBtn} disabled>Manage</button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
