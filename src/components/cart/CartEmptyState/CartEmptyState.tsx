"use client";

import React, { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import { productRepository } from '@/commerce/repositories/implementations/ShopifyProductRepository';
import { ProductModel } from '@/commerce/models';
import styles from './CartEmptyState.module.css';

export function CartEmptyState() {
  const { closeDrawer } = useCartStore();
  const [recommendations, setRecommendations] = useState<ProductModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const fetchRecs = async () => {
      try {
        const products = await productRepository.getBestSellers(2);
        if (isMounted) {
          setRecommendations(products);
        }
      } catch (error) {
        console.error("Failed to fetch cart recommendations:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchRecs();
    
    return () => { isMounted = false; };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.illustration}>
        <div className={styles.iconCircle}>
          <ShoppingBag size={32} strokeWidth={1.5} />
        </div>
      </div>
      
      <h3 className={styles.title}>Your cart is waiting.</h3>
      <p className={styles.subtitle}>Discover our premium collection of audio and wearable technology.</p>
      
      <button 
        className={styles.primaryBtn} 
        onClick={closeDrawer}
      >
        Start Shopping
      </button>

      {/* Mini Recommendations */}
      {!isLoading && recommendations.length > 0 && (
        <div className={styles.miniRecs}>
          <h4 className={styles.recsTitle}>Trending now</h4>
          <div className={styles.recsList}>
            {recommendations.map(product => (
              <Link 
                key={product.id} 
                href={`/products/${product.handle}`} 
                className={styles.recCard} 
                onClick={closeDrawer}
              >
                <div className={styles.recImagePlaceholder} style={{ position: 'relative', overflow: 'hidden' }}>
                  {product.images.length > 0 ? (
                    <Image 
                      src={product.images[0].url} 
                      alt={product.images[0].altText || product.title} 
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="48px"
                    />
                  ) : (
                    '🛍️'
                  )}
                </div>
                <div className={styles.recInfo}>
                  <span className={styles.recName}>{product.title}</span>
                  <span className={styles.recPrice}>${product.priceRange.minVariantPrice.amount}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
