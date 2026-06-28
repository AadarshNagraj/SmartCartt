import React, { Suspense } from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { productRepository } from '@/commerce/repositories/implementations/ShopifyProductRepository';
import { collectionRepository } from '@/commerce/repositories/implementations/ShopifyCollectionRepository';
import { Hero } from '@/components/home/Hero/Hero';
import { TrustStrip } from '@/components/home/TrustStrip/TrustStrip';
import { FeaturedCategories } from '@/components/home/FeaturedCategories/FeaturedCategories';
import { FeaturedProducts } from '@/components/home/FeaturedProducts/FeaturedProducts';
import { WhySmartCart } from '@/components/home/WhySmartCart/WhySmartCart';

// Lazy load below-the-fold components for better initial load performance
const PromoBanner = dynamic(() => import('@/components/home/PromoBanner/PromoBanner').then(m => m.PromoBanner), { ssr: true });
const BestSellers = dynamic(() => import('@/components/home/BestSellers/BestSellers').then(m => m.BestSellers), { ssr: true });
const Testimonials = dynamic(() => import('@/components/home/Testimonials/Testimonials').then(m => m.Testimonials), { ssr: true });
const Newsletter = dynamic(() => import('@/components/home/Newsletter/Newsletter').then(m => m.Newsletter), { ssr: true });

export const revalidate = 300; // 5 minutes cache revalidation for homepage

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "SmartCart - Shop Smart. Live Better.",
    description: "Premium modern headless Shopify ecommerce store.",
    alternates: {
      canonical: "/",
    },
  };
}

export default async function Home() {
  const [featuredProducts, bestSellerProducts, categories] = await Promise.all([
    productRepository.getFeaturedProducts(4),
    productRepository.getBestSellers(6),
    collectionRepository.getCollections(4)
  ]);

  return (
    <>
      <Hero />
      <TrustStrip />
      <FeaturedCategories categories={categories} />
      <FeaturedProducts products={featuredProducts} />
      <WhySmartCart />
      <PromoBanner />
      <BestSellers products={bestSellerProducts} />
      <Testimonials />
      <Newsletter />
    </>
  );
}
