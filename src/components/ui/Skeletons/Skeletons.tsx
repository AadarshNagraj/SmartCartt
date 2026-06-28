import React from 'react';
import styles from './Skeletons.module.css';
import { clsx } from 'clsx';

export function HeroSkeleton() {
  return (
    <div className={clsx(styles.skeleton, styles.hero)} aria-hidden="true" />
  );
}

export function CategorySkeleton() {
  return (
    <div className={clsx(styles.skeleton, styles.category)} aria-hidden="true" />
  );
}

export function ProductSkeleton() {
  return (
    <div className={styles.productCard} aria-hidden="true">
      <div className={clsx(styles.skeleton, styles.productImage)} />
      <div className={clsx(styles.skeleton, styles.textLine, styles.w3_4)} style={{ marginTop: 'var(--space-4)' }} />
      <div className={clsx(styles.skeleton, styles.textLine, styles.w1_2)} style={{ marginTop: 'var(--space-2)' }} />
      <div className={clsx(styles.skeleton, styles.textLine, styles.w1_4)} style={{ marginTop: 'var(--space-2)' }} />
    </div>
  );
}

export function CollectionHeroSkeleton() {
  return (
    <div className={clsx(styles.skeleton, styles.collectionHero)} aria-hidden="true" />
  );
}

export function ToolbarSkeleton() {
  return (
    <div className={clsx(styles.skeleton, styles.toolbar)} aria-hidden="true" />
  );
}

export function SidebarSkeleton() {
  return (
    <div className={styles.sidebar} aria-hidden="true">
      <div className={clsx(styles.skeleton, styles.textLine, styles.w1_2)} style={{ marginBottom: 'var(--space-6)', height: '1.5rem' }} />
      <div className={clsx(styles.skeleton, styles.filterBlock)} />
      <div className={clsx(styles.skeleton, styles.filterBlock)} />
      <div className={clsx(styles.skeleton, styles.filterBlock)} />
    </div>
  );
}

export function PDPSkeleton() {
  return (
    <div className={styles.pdpContainer}>
      {/* Breadcrumb */}
      <div className={clsx(styles.skeleton, styles.textLine, styles.w1_4)} style={{ marginBottom: 'var(--space-8)' }} />
      
      <div className={styles.pdpLayout}>
        {/* Gallery Side */}
        <div className={styles.pdpGallerySide}>
          <div className={clsx(styles.skeleton, styles.pdpMainImage)} />
          <div className={styles.pdpThumbnails}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={clsx(styles.skeleton, styles.pdpThumb)} />
            ))}
          </div>
        </div>
        
        {/* Info Side */}
        <div className={styles.pdpInfoSide}>
          <div className={clsx(styles.skeleton, styles.textLine, styles.w3_4)} style={{ height: '2.5rem', marginBottom: 'var(--space-4)' }} />
          <div className={clsx(styles.skeleton, styles.textLine, styles.w1_4)} style={{ height: '2rem', marginBottom: 'var(--space-6)' }} />
          
          <div className={clsx(styles.skeleton, styles.textLine, styles.w1_2)} style={{ marginBottom: 'var(--space-2)' }} />
          <div className={clsx(styles.skeleton, styles.textLine, styles.w3_4)} style={{ marginBottom: 'var(--space-8)' }} />
          
          {/* Variants Mock */}
          <div className={styles.pdpVariants}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className={clsx(styles.skeleton, styles.pdpVariantCircle)} />
            ))}
          </div>
          
          <div className={clsx(styles.skeleton, styles.pdpButton)} style={{ marginTop: 'var(--space-8)' }} />
          <div className={clsx(styles.skeleton, styles.pdpButton)} style={{ marginTop: 'var(--space-4)' }} />
        </div>
      </div>
    </div>
  );
}
