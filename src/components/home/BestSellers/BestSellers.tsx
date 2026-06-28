"use client";

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductModel } from '@/commerce/models';
import { ProductCard } from '@/components/product/ProductCard/ProductCard';
import styles from './BestSellers.module.css';

interface BestSellersProps {
  products: ProductModel[];
}

export function BestSellers({ products }: BestSellersProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    skipSnaps: false,
    dragFree: true
  });
  
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
    
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('scroll', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Best Sellers</h2>
          
          <div className={styles.controls}>
            <button
              className={styles.navBtn}
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
              aria-label="Previous items"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className={styles.navBtn}
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
              aria-label="Next items"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        
        <div className={styles.embla} ref={emblaRef}>
          <div className={styles.emblaContainer}>
            {products.map((product) => (
              <div key={product.id} className={styles.emblaSlide}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.progressBar}>
          <div 
            className={styles.progressIndicator} 
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>
    </section>
  );
}
