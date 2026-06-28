import React from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';
import { ImageModel } from '@/commerce/models';
import styles from './ThumbnailStrip.module.css';

interface ThumbnailStripProps {
  images: ImageModel[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function ThumbnailStrip({ images, activeIndex, onSelect }: ThumbnailStripProps) {
  if (images.length <= 1) return null;

  return (
    <div className={styles.strip}>
      {images.map((image, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={image.id}
            className={clsx(styles.thumbnailBtn, isActive && styles.active)}
            onClick={() => onSelect(index)}
            aria-label={`View image ${index + 1}`}
            aria-current={isActive ? 'true' : 'false'}
          >
            <Image
              src={image.url}
              alt={image.altText || `Thumbnail ${index + 1}`}
              fill
              sizes="80px"
              className={styles.image}
            />
          </button>
        );
      })}
    </div>
  );
}
