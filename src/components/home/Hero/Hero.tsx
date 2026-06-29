"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button/Button';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={styles.textContent}
          >
            <h1 className={styles.headline}>Elevate Your Sound.</h1>
            <p className={styles.description}>
              Experience the next generation of premium wireless audio. Designed for audiophiles, crafted for everyday life.
            </p>
            <div className={styles.actions}>
              <Button variant="primary" size="lg" className={styles.cta}>
                Shop Now
              </Button>
              <Button variant="secondary" size="lg" className={styles.cta}>
                Explore Collection
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className={styles.imageWrapper}
          >
            <Image
              src="/images/hero_headphones_1782501737558.png"
              alt="Premium wireless headphones"
              fill
              priority
              className={styles.image}
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
