import React from 'react';
import { ProductModel } from '@/commerce/models';
import { ProductCard } from '@/components/product/ProductCard/ProductCard';
import styles from './FeaturedProducts.module.css';

interface FeaturedProductsProps {
  products: ProductModel[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Featured Products</h2>
        </div>
        
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
