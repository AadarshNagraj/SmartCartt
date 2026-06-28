"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GuestRoute } from '@/components/auth/GuestRoute';
import { useSession } from '@/providers/AuthProvider';
import { useToast } from '@/providers/ToastProvider';
import { Loader2 } from 'lucide-react';
import styles from '../Auth.module.css';

export default function LoginPage() {
  const { login } = useSession();
  const { addToast } = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsSubmitting(true);
    try {
      await login(email, password);
      addToast('Successfully signed in', 'success');
      // GuestRoute will automatically redirect to /account when status becomes 'authenticated'
    } catch (err) {
      addToast('Invalid email or password', 'error');
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
            <h1 className={styles.title}>Welcome back</h1>
            <p className={styles.subtitle}>Enter your details to access your account.</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                id="email"
                type="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@example.com"
                required
                autoComplete="email"
              />
            </div>
            
            <div className={styles.formGroup}>
              <div className={styles.labelRow}>
                <label htmlFor="password" className={styles.label}>Password</label>
                <Link href="/forgot-password" className={styles.forgotLink}>
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            <button 
              type="submit" 
              className={styles.primaryBtn} 
              disabled={isSubmitting || !email || !password}
            >
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : 'Sign In'}
            </button>
          </form>

          <div className={styles.footer}>
            <span className={styles.footerText}>Don't have an account?</span>
            <Link href="/register" className={styles.footerLink}>Sign up</Link>
          </div>
        </motion.div>
      </div>
    </GuestRoute>
  );
}
