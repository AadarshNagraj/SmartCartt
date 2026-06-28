"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';
import { clsx } from 'clsx';
import { Button } from '@/components/ui/Button/Button';
import { useCartStore } from '@/hooks/useCartStore';
import { ProductModel } from '@/commerce/models';
import { formatMoney } from '@/commerce/utils/helpers';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: ProductModel;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore(state => state.addItem);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product page
    addItem({ id: product.id, quantity: 1 });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    // Wishlist logic will go here
  };

  return (
    <Link 
      href={`/products/${product.handle}`}
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.imageContainer}>
        {/* Sales or custom badges can be dynamically inserted here */}
        
        <button 
          className={clsx(styles.wishlistBtn, isHovered && styles.wishlistVisible)}
          onClick={handleWishlist}
          aria-label="Add to wishlist"
        >
          <Heart size={20} strokeWidth={1.5} />
        </button>

        <Image 
          src={product.images[0]?.url || '/placeholder.png'}
          alt={product.images[0]?.altText || product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={clsx(styles.image, isHovered && styles.imageZoomed)}
        />

        <div className={clsx(styles.quickAddContainer, isHovered && styles.quickAddVisible)}>
          <Button 
            fullWidth 
            variant="primary" 
            size="sm"
            onClick={handleQuickAdd}
          >
            Quick Add
          </Button>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.rating}>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                size={14} 
                fill={5 >= star ? 'var(--color-accent)' : 'transparent'} 
                color={5 >= star ? 'var(--color-accent)' : 'var(--color-border)'}
              />
            ))}
          </div>
          <span className={styles.reviewCount}>(124)</span>
        </div>
        
        <h3 className={styles.title}>{product.title}</h3>
        
        <div className={styles.priceContainer}>
          <span className={styles.price}>{formatMoney(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}</span>
          {product.variants[0]?.compareAtPrice && (
            <span className={styles.comparePrice}>{formatMoney(product.variants[0].compareAtPrice.amount, product.variants[0].compareAtPrice.currencyCode)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
