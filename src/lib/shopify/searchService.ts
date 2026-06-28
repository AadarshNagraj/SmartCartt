import { PredictiveSearchResult } from '../types/search';
import { productRepository } from '@/commerce/repositories/implementations/ShopifyProductRepository';

export async function fetchPredictiveSearch(query: string): Promise<PredictiveSearchResult> {
  const lowerQuery = query.toLowerCase();

  // If query is empty, return empty results (idle state handles suggestions)
  if (!lowerQuery) {
    return { products: [], collections: [], pages: [], articles: [] };
  }

  // Fetch all best sellers (or a large batch of products) and filter them to simulate search
  // In a real production app with Shopify Plus, we'd use the actual Predictive Search API endpoint.
  const products = await productRepository.getBestSellers(20);

  const matchedProducts = products.filter(p => 
    p.title.toLowerCase().includes(lowerQuery) || 
    p.description?.toLowerCase().includes(lowerQuery)
  );

  return {
    products: matchedProducts.map(p => ({
      id: p.id,
      handle: p.handle,
      title: p.title,
      price: p.priceRange.minVariantPrice,
      image: p.images[0] ? {
        id: p.images[0].id,
        url: p.images[0].url,
        altText: p.images[0].altText || p.title,
        width: p.images[0].width || 500,
        height: p.images[0].height || 500
      } : undefined
    })),
    collections: [], // Simplified for this phase as per routing requirement
    pages: [],
    articles: []
  };
}
