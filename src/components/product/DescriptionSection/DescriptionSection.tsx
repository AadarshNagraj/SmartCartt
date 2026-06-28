import React from 'react';
import styles from './DescriptionSection.module.css';
import { ProductModel } from '@/commerce/models';

interface DescriptionSectionProps {
  product: ProductModel;
}

export function DescriptionSection({ product }: DescriptionSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div 
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
        />
      </div>
    </section>
  );
}
