"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CollectionModel } from '@/commerce/models';
import styles from './FeaturedCategories.module.css';

// Static fallback categories shown in the mockup design
const staticCategories = [
  { slug: 'electronics', label: 'Electronics', badge: 'Up to 40% off', imageSrc: '/images/prod_watch_1782501766597.png' },
  { slug: 'fashion', label: 'Fashion', badge: 'New Collection', imageSrc: '/images/media__1782499485776.png' },
  { slug: 'accessories', label: 'Accessories', badge: 'Best Deals', imageSrc: '/images/prod_watch_1782501766597.png' },
  { slug: 'home-living', label: 'Home & Living', badge: 'New Arrivals', imageSrc: '/images/promo_lifestyle_1782501792063.png' },
  { slug: 'beauty', label: 'Beauty', badge: 'Top Brands', imageSrc: '/images/media__1782499496254.png' },
  { slug: 'sports', label: 'Sports', badge: 'Up to 30% off', imageSrc: '/images/media__1782499560760.png' },
];

interface FeaturedCategoriesProps {
  categories: CollectionModel[];
}

export function FeaturedCategories({ categories }: FeaturedCategoriesProps) {
  // Merge Shopify collections with static fallbacks
  const displayCategories = staticCategories.map((staticCat) => {
    const shopifyMatch = categories.find(
      (c) => c.handle.toLowerCase().includes(staticCat.slug) || staticCat.slug.includes(c.handle.toLowerCase())
    );
    return {
      href: shopifyMatch ? `/categories/${shopifyMatch.handle}` : `/categories/${staticCat.slug}`,
      label: shopifyMatch?.title || staticCat.label,
      badge: staticCat.badge,
      imageSrc: shopifyMatch?.image?.url || staticCat.imageSrc,
      imageAlt: shopifyMatch?.image?.altText || staticCat.label,
    };
  });

  return (
    <section className={styles.section} aria-labelledby="categories-heading">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title} id="categories-heading">Shop by Category</h2>
          <Link href="/categories/all" className={styles.viewAll}>
            View All Categories →
          </Link>
        </div>

        <div className={styles.grid}>
          {displayCategories.map((cat) => (
            <Link key={cat.href} href={cat.href} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={cat.imageSrc}
                  alt={cat.imageAlt}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 20vw, 16vw"
                  className={styles.image}
                />
                <div className={styles.imageOverlay} />
              </div>
              <div className={styles.cardInfo}>
                <span className={styles.cardTitle}>{cat.label}</span>
                <span className={styles.cardBadge}>{cat.badge}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
