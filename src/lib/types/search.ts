import { ProductImage } from './product';

export interface PredictiveSearchProduct {
  id: string;
  handle: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  image?: ProductImage;
}

export interface PredictiveSearchCollection {
  id: string;
  handle: string;
  title: string;
}

export interface PredictiveSearchPage {
  id: string;
  handle: string;
  title: string;
}

export interface PredictiveSearchArticle {
  id: string;
  handle: string;
  title: string;
}

export interface PredictiveSearchResult {
  products: PredictiveSearchProduct[];
  collections: PredictiveSearchCollection[];
  pages: PredictiveSearchPage[];
  articles: PredictiveSearchArticle[];
}
