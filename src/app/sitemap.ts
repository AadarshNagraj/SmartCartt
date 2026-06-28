import { MetadataRoute } from 'next';
import { productRepository } from '@/commerce/repositories/implementations/ShopifyProductRepository';
import { collectionRepository } from '@/commerce/repositories/implementations/ShopifyCollectionRepository';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://smartcart.sbs';

  // Fetch all products (limit 100 for now to prevent massive payloads, scale with pagination later)
  const products = await productRepository.getProducts(100);
  
  // Fetch collections
  const collections = await collectionRepository.getCollections(50);

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/products/${product.handle}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const collectionUrls = collections.map((collection) => ({
    url: `${baseUrl}/categories/${collection.handle}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...collectionUrls,
    ...productUrls,
  ];
}
