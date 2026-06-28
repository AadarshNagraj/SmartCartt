"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CollectionModel } from '@/commerce/models';
import styles from './FeaturedCategories.module.css';

interface FeaturedCategoriesProps {
  categories: CollectionModel[];
}

export function FeaturedCategories({ categories }: FeaturedCategoriesProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Shop by Category</h2>
        </div>
        
        <div className={styles.grid}>
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.handle}`} className={styles.card}>
              <div className={styles.imageWrapper}>
                {category.image && (
                  <Image
                    src={category.image.url}
                    alt={category.image.altText || category.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
                    className={styles.image}
                  />
                )}
              </div>
              <h3 className={styles.cardTitle}>{category.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
