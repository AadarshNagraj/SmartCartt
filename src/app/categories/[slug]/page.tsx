import React from 'react';
import { JsonLd } from '@/components/seo/JsonLd';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { collectionRepository } from '@/commerce/repositories/implementations/ShopifyCollectionRepository';
import { CollectionClientView } from '@/components/collection/CollectionClientView';

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const collection = await collectionRepository.getCollection(slug);
    
    return {
      title: collection.seo?.title || `${collection.title} | SmartCart`,
      description: collection.seo?.description || collection.description,
      alternates: {
        canonical: `/categories/${collection.handle}`
      },
      openGraph: {
        title: collection.seo?.title || collection.title,
        description: collection.seo?.description || collection.description,
        images: collection.image?.url ? [{ url: collection.image.url }] : [],
      }
    };
  } catch (error) {
    return {
      title: 'Collection Not Found | SmartCart'
    };
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const collection = await collectionRepository.getCollection(slug);
    const initialProducts = await collectionRepository.getCollectionProducts(slug, 24);

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://smartcart.sbs';
    
    const collectionSchema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": collection.title,
      "description": collection.seo?.description || collection.description,
      "url": `${baseUrl}/categories/${collection.handle}`,
      "image": collection.image?.url
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": baseUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": collection.title,
          "item": `${baseUrl}/categories/${collection.handle}`
        }
      ]
    };

    return (
      <>
        <JsonLd data={collectionSchema} />
        <JsonLd data={breadcrumbSchema} />
        <CollectionClientView 
          collection={collection}
          initialProducts={initialProducts}
        />
      </>
    );
  } catch (error) {
    // If the collection doesn't exist, show 404
    notFound();
  }
}
