import React from 'react';
import styles from './SearchSkeleton.module.css';
import { clsx } from 'clsx';
import globalStyles from '@/components/ui/Skeletons/Skeletons.module.css';

export function SearchSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.group}>
        <div className={clsx(globalStyles.skeleton, styles.groupTitle)} />
        <div className={styles.list}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={styles.item}>
              <div className={clsx(globalStyles.skeleton, styles.image)} />
              <div className={styles.info}>
                <div className={clsx(globalStyles.skeleton, styles.title)} />
                <div className={clsx(globalStyles.skeleton, styles.price)} />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.group}>
        <div className={clsx(globalStyles.skeleton, styles.groupTitle)} />
        <div className={styles.list}>
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className={styles.simpleItem}>
              <div className={clsx(globalStyles.skeleton, styles.title)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
