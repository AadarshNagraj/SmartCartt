import { PredictiveSearchResult } from '../types/search';


export function mapPredictiveSearch(rawResponse: any): PredictiveSearchResult {
  const result = rawResponse.predictiveSearch;
  
  return {
    products: (result.products || []).map((p: any) => ({
      id: p.id,
      handle: p.handle,
      title: p.title,
      price: p.priceRange.minVariantPrice,
      image: p.featuredImage ? {
        id: p.featuredImage.id,
        url: p.featuredImage.url,
        altText: p.featuredImage.altText || p.title,
        width: p.featuredImage.width,
        height: p.featuredImage.height
      } : undefined
    })),
    collections: (result.collections || []).map((c: any) => ({
      id: c.id,
      handle: c.handle,
      title: c.title
    })),
    pages: (result.pages || []).map((p: any) => ({
      id: p.id,
      handle: p.handle,
      title: p.title
    })),
    articles: (result.articles || []).map((a: any) => ({
      id: a.id,
      handle: a.handle,
      title: a.title
    }))
  };
}
