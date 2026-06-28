"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageModel } from '@/commerce/models';
import { ThumbnailStrip } from './ThumbnailStrip';
import { FullscreenGallery } from './FullscreenGallery';
import styles from './ProductGallery.module.css';

interface ProductGalleryProps {
  images: ImageModel[];
  selectedVariantImageId?: string;
}

export function ProductGallery({ images, selectedVariantImageId }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  // When selected variant changes, update gallery index if it has a specific image
  React.useEffect(() => {
    if (selectedVariantImageId) {
      const index = images.findIndex(img => img.id === selectedVariantImageId);
      if (index !== -1) {
        setActiveIndex(index);
      }
    }
  }, [selectedVariantImageId, images]);

  if (!images || images.length === 0) {
    return <div className={styles.emptyGallery} />;
  }

  const activeImage = images[activeIndex];

  return (
    <div className={styles.container}>
      <div className={styles.mainImageContainer}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.imageWrapper}
            onClick={() => setIsFullscreenOpen(true)}
          >
            <Image
              src={activeImage.url}
              alt={activeImage.altText || 'Product image'}
              fill
              priority
              className={styles.image}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>

        <button 
          className={styles.expandBtn}
          onClick={() => setIsFullscreenOpen(true)}
          aria-label="Open fullscreen gallery"
        >
          <Maximize2 size={20} />
        </button>
      </div>

      <div className={styles.thumbnailWrapper}>
        <ThumbnailStrip 
          images={images} 
          activeIndex={activeIndex} 
          onSelect={setActiveIndex} 
        />
      </div>

      <FullscreenGallery 
        images={images}
        initialIndex={activeIndex}
        isOpen={isFullscreenOpen}
        onClose={() => setIsFullscreenOpen(false)}
      />
    </div>
  );
}
