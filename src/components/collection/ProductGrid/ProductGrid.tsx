"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/product/ProductCard/ProductCard';
import { ProductModel } from '@/commerce/models';
import { clsx } from 'clsx';
import styles from './ProductGrid.module.css';

interface ProductGridProps {
  products: ProductModel[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const searchParams = useSearchParams();
  const columns = searchParams.get('grid') || '4'; // Default to 4 on desktop

  // Using CSS modules, we'll map the column intent to a specific class
  const gridClass = clsx(
    styles.grid,
    columns === '2' && styles.cols2,
    columns === '3' && styles.cols3,
    columns === '4' && styles.cols4
  );

  return (
    <div className={gridClass}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
