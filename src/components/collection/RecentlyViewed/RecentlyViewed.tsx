"use client";

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard/ProductCard';
import { ProductModel } from '@/commerce/models';
import { ProductSkeleton } from '@/components/ui/Skeletons/Skeletons';
import { productRepository } from '@/commerce/repositories/implementations/ShopifyProductRepository';
import { useRecentlyViewedStore } from '@/store/useRecentlyViewedStore';
import styles from './RecentlyViewed.module.css';

export function RecentlyViewed() {
  const { items: handleList } = useRecentlyViewedStore();
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    skipSnaps: false,
    dragFree: true
  });
  
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const fetchRecentlyViewed = async () => {
      if (!handleList || handleList.length === 0) {
        if (isMounted) {
          setProducts([]);
          setIsLoading(false);
        }
        return;
      }

      setIsLoading(true);
      try {
        const promises = handleList.map(handle => productRepository.getProductByHandle(handle).catch(() => null));
        const results = await Promise.all(promises);
        
        const validProducts = results.filter((p): p is ProductModel => p !== null);
        
        if (isMounted) {
          setProducts(validProducts);
        }
      } catch (error) {
        console.error("Failed to fetch recently viewed items:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchRecentlyViewed();
    
    return () => { isMounted = false; };
  }, [handleList]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  if (!isLoading && products.length === 0) {
    return null; // Don't render anything if no products
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Recently Viewed</h2>
          
          <div className={styles.controls}>
            <button
              className={styles.navBtn}
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
              aria-label="Previous items"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className={styles.navBtn}
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
              aria-label="Next items"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        <div className={styles.embla} ref={emblaRef}>
          <div className={styles.emblaContainer}>
            {isLoading
              ? Array.from({ length: Math.min(handleList.length || 4, 4) }).map((_, i) => (
                  <div key={i} className={styles.emblaSlide}>
                    <ProductSkeleton />
                  </div>
                ))
              : products.map((product) => (
                  <div key={product.id} className={styles.emblaSlide}>
                    <ProductCard product={product} />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
