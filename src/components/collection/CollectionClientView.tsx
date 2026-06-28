"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { CollectionModel, ProductModel } from '@/commerce/models';
import { CollectionHero } from '@/components/collection/CollectionHero/CollectionHero';
import { CollectionToolbar } from '@/components/collection/CollectionToolbar/CollectionToolbar';
import { FilterSidebar } from '@/components/collection/FilterSidebar/FilterSidebar';
import { FilterDrawer } from '@/components/collection/FilterDrawer/FilterDrawer';
import { ProductGrid } from '@/components/collection/ProductGrid/ProductGrid';
import { EmptyState } from '@/components/collection/EmptyState/EmptyState';
import { LoadMoreButton } from '@/components/collection/LoadMoreButton/LoadMoreButton';
import { RecentlyViewed } from '@/components/collection/RecentlyViewed/RecentlyViewed';
import { ProductSkeleton } from '@/components/ui/Skeletons/Skeletons';
import { trackViewItemList } from '@/lib/analytics';
import styles from '@/app/categories/[slug]/page.module.css';

interface CollectionClientViewProps {
  collection: CollectionModel;
  initialProducts: ProductModel[];
}

export function CollectionClientView({ collection, initialProducts }: CollectionClientViewProps) {
  const searchParams = useSearchParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    trackViewItemList(collection.title, initialProducts);
  }, [collection.title, initialProducts]);

  // Simulate filtering/sorting latency when search params change
  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => setIsFiltering(false), 300);
    return () => clearTimeout(timer);
  }, [searchParams]);

  // Compute mock filtered products (Simulating backend logic for now since we don't have Shopify filters fully implemented yet)
  const filteredProducts = useMemo(() => {
    const brandParam = searchParams.get('brand');
    const categoryParam = searchParams.get('category');
    
    if (brandParam?.includes('logitech') || categoryParam?.includes('accessories')) {
      return [];
    }
    
    return initialProducts;
  }, [searchParams, initialProducts]);

  return (
    <div className={styles.page}>
      <CollectionHero 
        title={collection.title}
        description={collection.description}
        image={collection.image?.url || '/images/hero_headphones_1782501737558.png'}
      />

      <div className={styles.container}>
        <CollectionToolbar 
          productCount={filteredProducts.length} 
          onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
        />

        <div className={styles.layout}>
          <FilterSidebar />

          <div className={styles.mainContent}>
            {isFiltering ? (
              <div className={styles.gridLoader}>
                {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
              </div>
            ) : filteredProducts.length > 0 ? (
              <>
                <ProductGrid products={filteredProducts} />
                <LoadMoreButton />
              </>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>

      <RecentlyViewed />

      <FilterDrawer 
        isOpen={isMobileFiltersOpen} 
        onClose={() => setIsMobileFiltersOpen(false)} 
      />
    </div>
  );
}
