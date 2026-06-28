"use client";

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductModel } from '@/commerce/models';
import { ProductCard } from '@/components/product/ProductCard/ProductCard';
import styles from './Recommendations.module.css';

interface RecommendationsProps {
  title: string;
  products: ProductModel[];
}

export function Recommendations({ title, products }: RecommendationsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    skipSnaps: false,
    dragFree: true
  });
  
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

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

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          
          <div className={styles.controls}>
            <button
              className={styles.navBtn}
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
              aria-label={`Previous ${title}`}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className={styles.navBtn}
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
              aria-label={`Next ${title}`}
            >
              <ChevronRight size={20} />
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
      </div>
    </section>
  );
}
