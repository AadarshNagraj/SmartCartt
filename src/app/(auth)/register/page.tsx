"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GuestRoute } from '@/components/auth/GuestRoute';
import { useToast } from '@/providers/ToastProvider';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './../Auth.module.css';

export default function RegisterPage() {
  const { addToast } = useToast();
  const router = useRouter();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !firstName) return;

    setIsSubmitting(true);
    try {
      // Mock network request
      await new Promise(resolve => setTimeout(resolve, 800));
      addToast('Account created successfully! Please log in.', 'success');
      router.push('/login');
    } catch (err) {
      addToast('Registration failed. Try again.', 'error');
      setIsSubmitting(false);
    }
  };

  return (
    <GuestRoute>
      <div className={styles.container}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={styles.card}
        >
          <div className={styles.header}>
            <h1 className={styles.title}>Create an account</h1>
            <p className={styles.subtitle}>Join SmartCart for a premium experience.</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName" className={styles.label}>First name</label>
                <input
                  id="firstName"
                  type="text"
                  className={styles.input}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="lastName" className={styles.label}>Last name</label>
                <input
                  id="lastName"
                  type="text"
                  className={styles.input}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                id="email"
                type="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input
                id="password"
                type="password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className={styles.primaryBtn} 
              disabled={isSubmitting || !email || !password || !firstName}
            >
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : 'Create Account'}
            </button>
          </form>

          <div className={styles.footer}>
            <span className={styles.footerText}>Already have an account?</span>
            <Link href="/login" className={styles.footerLink}>Sign in</Link>
          </div>
        </motion.div>
      </div>
    </GuestRoute>
  );
}
