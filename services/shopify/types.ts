// ─────────────────────────────────────────────────────────────────────────────
// App-level domain types — used by all UI components.
// Normalized from Shopify's raw API shape by the service layer.
// ─────────────────────────────────────────────────────────────────────────────

export interface ProductVariant {
  id: string;
  title: string;
  price: string;        // formatted, e.g. "29.99"
  compareAtPrice: string | null;
  availableForSale: boolean;
  sku: string;
  quantityAvailable: number;
  selectedOptions: Array<{ name: string; value: string }>;
  image?: string | null;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  featuredImage: string;
  featuredImageAlt: string;
  images: Array<{ url: string; altText: string }>;
  variants: ProductVariant[];
  priceRange: {
    minVariantPrice: string;
    maxVariantPrice: string;
    currencyCode: string;
  };
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image?: string | null;
  imageAlt?: string | null;
  products?: Product[];
}

export interface CartLineItem {
  id: string;           // cart line ID (not variant or product ID)
  quantity: number;
  lineTotalPrice: string;
  variant: {
    id: string;
    title: string;
    price: string;
    compareAtPrice: string | null;
    image?: string | null;
    selectedOptions: Array<{ name: string; value: string }>;
    sku: string;
  };
  product: {
    id: string;
    handle: string;
    title: string;
    vendor: string;
    featuredImage: string | null;
    featuredImageAlt: string | null;
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: CartLineItem[];
  cost: {
    subtotal: string;
    total: string;
    totalTax: string | null;
    currencyCode: string;
  };
}
