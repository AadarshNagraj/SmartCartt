import React from 'react';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs/Breadcrumbs';
import styles from './CollectionHero.module.css';

interface CollectionHeroProps {
  title: string;
  description: string;
  image: string;
  productCount?: number;
}

export function CollectionHero({ title, description, image, productCount }: CollectionHeroProps) {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Collections', href: '/collections' },
    { label: title }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Breadcrumbs items={breadcrumbItems} />
        
        <div className={styles.banner}>
          <div className={styles.imageWrapper}>
            <Image
              src={image}
              alt={title}
              fill
              priority
              className={styles.image}
              sizes="100vw"
            />
            <div className={styles.overlay} />
          </div>
          
          <div className={styles.content}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.description}>{description}</p>
            {productCount !== undefined && (
              <span className={styles.count}>{productCount} Products</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
