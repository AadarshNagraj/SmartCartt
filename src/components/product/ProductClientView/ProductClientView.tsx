"use client";

import React, { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs/Breadcrumbs';
import { ProductGallery } from '@/components/product/ProductGallery/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo/ProductInfo';
import { VariantSelector } from '@/components/product/VariantSelector/VariantSelector';
import { QuantitySelector } from '@/components/product/QuantitySelector/QuantitySelector';
import { PurchaseActions } from '@/components/product/PurchaseActions/PurchaseActions';
import { ProductHighlights } from '@/components/product/ProductHighlights/ProductHighlights';
import { Specifications } from '@/components/product/Specifications/Specifications';
import { DeliveryCards } from '@/components/product/DeliveryCards/DeliveryCards';
import { DescriptionSection } from '@/components/product/DescriptionSection/DescriptionSection';
import { StickyPurchaseBar } from '@/components/product/StickyPurchaseBar/StickyPurchaseBar';
import { Recommendations } from '@/components/product/Recommendations/Recommendations';
import { ProductModel } from '@/commerce/models';
import { useCartStore } from '@/store/useCartStore';
import { useRecentlyViewedStore } from '@/store/useRecentlyViewedStore';
import { trackViewItem } from '@/lib/analytics';
import styles from '@/app/products/[slug]/page.module.css';

const Reviews = dynamic(() => import('@/components/product/Reviews/Reviews').then(m => m.Reviews), { ssr: false });

interface ProductClientViewProps {
  product: ProductModel;
  recommendedProducts: ProductModel[];
}

export function ProductClientView({ product, recommendedProducts }: ProductClientViewProps) {
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
  const [quantity, setQuantity] = useState(1);
  const { addLine } = useCartStore();
  const { addRecentlyViewed } = useRecentlyViewedStore();

  // Add to recently viewed on mount
  useEffect(() => {
    addRecentlyViewed(product.handle);
    trackViewItem(product);
  }, [product, addRecentlyViewed]);

  // Auto-select first available variant on mount
  useEffect(() => {
    if (product.variants.length > 0) {
      const defaultOptions: { [key: string]: string } = {};
      product.variants[0].selectedOptions.forEach(opt => {
        defaultOptions[opt.name] = opt.value;
      });
      setSelectedOptions(defaultOptions);
    }
  }, [product]);

  const activeVariant = useMemo(() => {
    return product.variants.find(variant => {
      return variant.selectedOptions.every(
        opt => selectedOptions[opt.name] === opt.value
      );
    });
  }, [product, selectedOptions]);

  const handleSelectOption = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: value
    }));
  };

  const handleAddToCart = async () => {
    const targetVariant = activeVariant || product.variants[0];
    if (!targetVariant) return;

    await addLine({
      ...targetVariant,
      product: {
        handle: product.handle,
        title: product.title
      }
    }, quantity);
  };

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/collections/all' },
    { label: product.title }
  ];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.breadcrumbWrapper}>
          <Breadcrumbs items={breadcrumbs} />
        </div>

        <div className={styles.heroLayout}>
          <div className={styles.galleryCol}>
            <ProductGallery 
              images={product.images} 
              selectedVariantImageId={activeVariant?.image?.id} 
            />
          </div>
          
          <div className={styles.infoCol}>
            <ProductInfo product={product} activeVariant={activeVariant} />
            
            <VariantSelector 
              options={product.options} 
              selectedOptions={selectedOptions} 
              onSelectOption={handleSelectOption} 
            />
            
            <div className={styles.purchaseControls}>
              <QuantitySelector 
                quantity={quantity} 
                onIncrease={() => setQuantity(q => q + 1)} 
                onDecrease={() => setQuantity(q => Math.max(1, q - 1))} 
              />
              <PurchaseActions 
                onAddToCart={handleAddToCart}
                onBuyNow={() => alert('Proceeding to checkout')}
                isAvailable={activeVariant ? activeVariant.availableForSale : product.availableForSale}
              />
            </div>

            <DeliveryCards />
          </div>
        </div>
      </div>

      <ProductHighlights />
      <DescriptionSection product={product} />
      <Specifications />
      <Reviews />
      
      <Recommendations title="You May Also Like" products={recommendedProducts} />

      <StickyPurchaseBar 
        product={product} 
        activeVariant={activeVariant} 
        onAddToCart={handleAddToCart} 
      />
    </div>
  );
}
