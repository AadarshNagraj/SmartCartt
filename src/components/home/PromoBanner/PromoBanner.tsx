import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button/Button';
import styles from './PromoBanner.module.css';

export function PromoBanner() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/promo_lifestyle_1782501792063.png"
              alt="Premium workspace setup"
              fill
              className={styles.image}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className={styles.textContent}>
            <h2 className={styles.title}>The Modern Workspace Collection</h2>
            <p className={styles.description}>
              Transform your daily routine with our curated selection of premium desk accessories and smart gadgets designed for focus and flow.
            </p>
            <Button variant="primary" size="lg" className={styles.cta}>
              Explore Collection
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
