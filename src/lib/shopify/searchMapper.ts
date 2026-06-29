import { PredictiveSearchResult } from '../types/search';

// ---------------------------------------------------------
// Raw Shopify predictive search response types
// ---------------------------------------------------------

interface RawImage {
  id: string;
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

interface RawProduct {
  id: string;
  handle: string;
  title: string;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  featuredImage: RawImage | null;
}

interface RawCollection {
  id: string;
  handle: string;
  title: string;
}

interface RawPage {
  id: string;
  handle: string;
  title: string;
}

interface RawArticle {
  id: string;
  handle: string;
  title: string;
}

interface RawPredictiveSearch {
  products: RawProduct[];
  collections: RawCollection[];
  pages: RawPage[];
  articles: RawArticle[];
}

interface RawSearchResponse {
  predictiveSearch: RawPredictiveSearch;
}

export function mapPredictiveSearch(rawResponse: RawSearchResponse): PredictiveSearchResult {
  const result = rawResponse.predictiveSearch;

  return {
    products: (result.products || []).map((p) => ({
      id: p.id,
      handle: p.handle,
      title: p.title,
      price: p.priceRange.minVariantPrice,
      image: p.featuredImage ? {
        id: p.featuredImage.id,
        url: p.featuredImage.url,
        altText: p.featuredImage.altText ?? p.title,
        width: p.featuredImage.width,
        height: p.featuredImage.height
      } : undefined
    })),
    collections: (result.collections || []).map((c) => ({
      id: c.id,
      handle: c.handle,
      title: c.title
    })),
    pages: (result.pages || []).map((p) => ({
      id: p.id,
      handle: p.handle,
      title: p.title
    })),
    articles: (result.articles || []).map((a) => ({
      id: a.id,
      handle: a.handle,
      title: a.title
    }))
  };
}
