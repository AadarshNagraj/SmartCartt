"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { Loader2 } from 'lucide-react';
import styles from './LoadMoreButton.module.css';

interface LoadMoreButtonProps {
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export function LoadMoreButton({ onLoadMore, hasMore = true }: LoadMoreButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      if (onLoadMore) onLoadMore();
    }, 800);
  };

  if (!hasMore) return null;

  return (
    <div className={styles.container}>
      <Button 
        variant="secondary" 
        size="lg" 
        onClick={handleClick} 
        disabled={isLoading}
        className={styles.button}
      >
        {isLoading ? (
          <>
            <Loader2 className={styles.spinner} size={18} />
            Loading...
          </>
        ) : (
          'Load More Products'
        )}
      </Button>
    </div>
  );
}
