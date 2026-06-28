"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GuestRoute } from '@/components/auth/GuestRoute';
import { useToast } from '@/providers/ToastProvider';
import { Loader2 } from 'lucide-react';
import styles from './../Auth.module.css';

export default function ForgotPasswordPage() {
  const { addToast } = useToast();
  
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      // Mock network request
      await new Promise(resolve => setTimeout(resolve, 800));
      addToast('Reset link sent to your email.', 'success');
      setIsSent(true);
    } catch (err) {
      addToast('Something went wrong. Try again.', 'error');
    } finally {
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
            <h1 className={styles.title}>Reset Password</h1>
            <p className={styles.subtitle}>
              {isSent 
                ? "We've sent an email with instructions to reset your password."
                : "Enter your email address and we'll send you a link to reset your password."}
            </p>
          </div>

          {!isSent ? (
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
                />
              </div>

              <button 
                type="submit" 
                className={styles.primaryBtn} 
                disabled={isSubmitting || !email}
              >
                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : 'Send Reset Link'}
              </button>
            </form>
          ) : (
            <Link href="/login" className={styles.primaryBtn} style={{ textDecoration: 'none' }}>
              Return to Login
            </Link>
          )}

          <div className={styles.footer}>
            <Link href="/login" className={styles.footerLink}>Back to login</Link>
          </div>
        </motion.div>
      </div>
    </GuestRoute>
  );
}
