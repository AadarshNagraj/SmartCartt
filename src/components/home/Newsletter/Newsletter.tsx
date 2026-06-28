"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { Mail } from 'lucide-react';
import styles from './Newsletter.module.css';

export function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter signup logic
    setEmail('');
    alert('Thank you for subscribing!');
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>Join the Club</h2>
            <p className={styles.description}>
              Subscribe to get exclusive access to new releases, special offers, and curated tech content.
            </p>
          </div>
          
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputWrapper}>
              <Mail className={styles.icon} size={20} />
              <input
                type="email"
                placeholder="Enter your email address"
                required
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
              />
            </div>
            <Button type="submit" variant="primary" size="lg" className={styles.submitBtn}>
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
