// ---------------------------------------------------------
// DOMAIN MODELS
// These represent our clean internal application state.
// They are entirely decoupled from Shopify's GraphQL Schema.
// ---------------------------------------------------------

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface ImageModel {
  id: string;
  url: string;
  altText?: string;
  width?: number;
  height?: number;
}

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
  price: Money;
  compareAtPrice?: Money;
  image?: ImageModel;
}

export interface ProductModel {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  vendor: string;
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  options: ProductOption[];
  images: ImageModel[];
  variants: ProductVariant[];
  seo?: {
    title?: string;
    description?: string;
  };
  tags: string[];
}

export interface CollectionModel {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  image?: ImageModel;
  seo?: {
    title?: string;
    description?: string;
  };
}

export interface CartModel {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: CartLineModel[];
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount?: Money;
  };
}

export interface CartLineModel {
  id: string;
  quantity: number;
  merchandise: ProductVariant & { product: { handle: string; title: string } };
  cost: {
    totalAmount: Money;
  };
}

export interface CustomerModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  // Further fields to be mapped from Customer Account API
}

export interface SearchResultModel {
  products: ProductModel[];
  collections: CollectionModel[];
  pages: any[]; // Expand when needed
}
