"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero} aria-label="Homepage Hero">
      <div className={styles.container}>
        <div className={styles.content}>

          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={styles.textContent}
          >
            {/* NEW COLLECTION badge */}
            <div className={styles.badge}>
              <Star size={12} fill="#F5A623" color="#F5A623" />
              <span>NEW COLLECTION</span>
            </div>

            {/* Headline */}
            <h1 className={styles.headline}>
              Shop Smart.<br />
              <span className={styles.accent}>Live Better.</span>
            </h1>

            {/* Description */}
            <p className={styles.description}>
              Discover premium products across fashion, electronics, home, beauty,
              lifestyle and more. Curated collections, trusted brands, and fast
              delivery&mdash;all in one place.
            </p>

            {/* Category Pills */}
            <div className={styles.categories}>
              {['Fashion', 'Electronics', 'Home', 'Beauty', 'Sports'].map((cat) => (
                <span key={cat} className={styles.categoryPill}>{cat}</span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className={styles.actions}>
              <Link href="/categories/all" className={styles.btnPrimary}>
                Shop Now
                <ArrowRight size={16} />
              </Link>
              <Link href="/categories/all" className={styles.btnSecondary}>
                Explore Collections
              </Link>
            </div>
          </motion.div>

          {/* Right: Hero Product Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className={styles.imageWrapper}
          >
            {/* Main lifestyle product image */}
            <div className={styles.heroImageContainer}>
              <Image
                src="/images/media__1782499560760.png"
                alt="Premium multi-category products — fashion, electronics, accessories and lifestyle"
                fill
                priority
                className={styles.heroImage}
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              {/* Overlay products - layered composition */}
              <div className={styles.productBadge}>
                <span className={styles.badgeLabel}>Up to</span>
                <span className={styles.badgeValue}>40% OFF</span>
              </div>
            </div>

            {/* Floating product cards */}
            <motion.div
              className={styles.floatCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className={styles.floatCardInner}>
                <div className={styles.floatImageWrapper}>
                  <Image
                    src="/images/prod_watch_1782501766597.png"
                    alt="Premium smartwatch"
                    width={48}
                    height={48}
                    className={styles.floatImage}
                  />
                </div>
                <div className={styles.floatInfo}>
                  <span className={styles.floatTitle}>SmartWatch Pro</span>
                  <span className={styles.floatPrice}>₹4,999</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Background decorative shape */}
      <div className={styles.bgShape} aria-hidden="true" />
    </section>
  );
}
