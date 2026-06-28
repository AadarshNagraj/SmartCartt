"use client";

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageModel } from '@/commerce/models';
import { ThumbnailStrip } from './ThumbnailStrip';
import styles from './FullscreenGallery.module.css';

interface FullscreenGalleryProps {
  images: ImageModel[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function FullscreenGallery({ images, initialIndex, isOpen, onClose }: FullscreenGalleryProps) {
  const [activeIndex, setActiveIndex] = React.useState(initialIndex);

  // Sync index if it changes while open
  useEffect(() => {
    setActiveIndex(initialIndex);
  }, [initialIndex]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={styles.overlay}
        role="dialog"
        aria-modal="true"
        aria-label="Image gallery"
      >
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close gallery">
          <X size={32} />
        </button>

        <div className={styles.counter}>
          {activeIndex + 1} / {images.length}
        </div>

        {images.length > 1 && (
          <>
            <button className={styles.navBtnPrev} onClick={handlePrev} aria-label="Previous image">
              <ChevronLeft size={32} />
            </button>
            <button className={styles.navBtnNext} onClick={handleNext} aria-label="Next image">
              <ChevronRight size={32} />
            </button>
          </>
        )}

        <div className={styles.mainContainer}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className={styles.imageWrapper}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe < -10000) handleNext();
                else if (swipe > 10000) handlePrev();
              }}
            >
              <Image
                src={images[activeIndex].url}
                alt={images[activeIndex].altText || 'Fullscreen product view'}
                fill
                className={styles.image}
                sizes="100vw"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.footer}>
          <ThumbnailStrip 
            images={images} 
            activeIndex={activeIndex} 
            onSelect={setActiveIndex} 
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
