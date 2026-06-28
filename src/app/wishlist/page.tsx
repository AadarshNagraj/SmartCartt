"use client";

import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { ProductCard } from '@/components/product/ProductCard/ProductCard';
import { productRepository } from '@/commerce/repositories/implementations/ShopifyProductRepository';
import { ProductModel } from '@/commerce/models';
import { useWishlistStore } from '@/store/useWishlistStore';
import { ProductSkeleton } from '@/components/ui/Skeletons/Skeletons';
import styles from './page.module.css';

export default function WishlistPage() {
  const { items: handleList } = useWishlistStore();
  const [wishlistItems, setWishlistItems] = useState<ProductModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const fetchWishlist = async () => {
      if (!handleList || handleList.length === 0) {
        if (isMounted) {
          setWishlistItems([]);
          setIsLoading(false);
        }
        return;
      }

      setIsLoading(true);
      try {
        const promises = handleList.map(handle => productRepository.getProductByHandle(handle).catch(() => null));
        const results = await Promise.all(promises);
        
        // Filter out any products that were not found
        const validProducts = results.filter((p): p is ProductModel => p !== null);
        
        if (isMounted) {
          setWishlistItems(validProducts);
        }
      } catch (error) {
        console.error("Failed to fetch wishlist items:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchWishlist();
    
    return () => { isMounted = false; };
  }, [handleList]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <Heart size={28} className={styles.headerIcon} />
            <h1 className={styles.title}>Your Wishlist</h1>
          </div>
          <p className={styles.subtitle}>Save your favorite items and track their availability.</p>
        </div>

        {isLoading ? (
          <div className={styles.grid}>
            {Array.from({ length: Math.max(handleList.length || 0, 4) }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : wishlistItems.length > 0 ? (
          <div className={styles.grid}>
            {wishlistItems.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <Heart size={48} className={styles.emptyIcon} strokeWidth={1} />
            <h2 className={styles.emptyTitle}>Your wishlist is empty</h2>
            <p className={styles.emptySubtitle}>Explore our collections and discover something new.</p>
            <Link href="/collections/all" className={styles.primaryBtn}>
              Explore Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
