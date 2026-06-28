import {
  getProducts as shopifyGetProducts,
  getFeaturedProducts as shopifyGetFeaturedProducts,
  getProductByHandle,
  searchProducts as shopifySearch,
  getProductRecommendations as shopifyGetRecommendations,
  getCollections as shopifyGetCollections,
  getCollectionByHandle,
  getCart as shopifyGetCart,
  createCart as shopifyCreateCart,
  addToCart as shopifyAddToCart,
  updateCartLine as shopifyUpdateCartLine,
  removeCartLine as shopifyRemoveCartLine,
} from "@/lib/shopify";

import {
  ShopifyProduct,
  ShopifyCollection,
  ShopifyCart,
  ShopifyCartLine,
} from "@/lib/shopify/types";

import { Product, ProductVariant, Collection, Cart, CartLineItem } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// Transformers — convert raw Shopify types to clean app types
// ─────────────────────────────────────────────────────────────────────────────

function transformVariant(v: ShopifyCartLine["merchandise"]): CartLineItem["variant"] {
  return {
    id: v.id,
    title: v.title,
    price: v.price.amount,
    compareAtPrice: v.compareAtPrice?.amount ?? null,
    image: v.image?.url ?? null,
    selectedOptions: v.selectedOptions,
    sku: v.sku ?? "",
  };
}

function transformProductVariant(v: ReturnType<typeof extractVariant>): ProductVariant {
  return {
    id: v.id,
    title: v.title,
    price: v.price.amount,
    compareAtPrice: v.compareAtPrice?.amount ?? null,
    availableForSale: v.availableForSale,
    sku: v.sku ?? "",
    quantityAvailable: v.quantityAvailable ?? 0,
    selectedOptions: v.selectedOptions,
    image: v.image?.url ?? null,
  };
}

function extractVariant(node: ShopifyProduct["variants"]["edges"][0]["node"]) {
  return node;
}

export function transformProduct(p: ShopifyProduct): Product {
  const images = p.images.edges.map((e) => ({
    url: e.node.url,
    altText: e.node.altText ?? p.title,
  }));

  const variants = p.variants.edges.map((e) =>
    transformProductVariant(extractVariant(e.node))
  );

  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    description: p.description,
    descriptionHtml: p.descriptionHtml,
    vendor: p.vendor,
    productType: p.productType,
    tags: p.tags,
    availableForSale: p.availableForSale,
    featuredImage: p.featuredImage?.url ?? (images[0]?.url ?? ""),
    featuredImageAlt: p.featuredImage?.altText ?? p.title,
    images,
    variants,
    priceRange: {
      minVariantPrice: p.priceRange.minVariantPrice.amount,
      maxVariantPrice: p.priceRange.maxVariantPrice.amount,
      currencyCode: p.priceRange.minVariantPrice.currencyCode,
    },
  };
}

export function transformCollection(c: ShopifyCollection): Collection {
  const products = c.products?.edges.map((e) => transformProduct(e.node));
  return {
    id: c.id,
    handle: c.handle,
    title: c.title,
    description: c.description,
    image: c.image?.url ?? null,
    imageAlt: c.image?.altText ?? c.title,
    products,
  };
}

export function transformCart(c: ShopifyCart): Cart {
  const lines: CartLineItem[] = c.lines.edges.map(({ node }) => ({
    id: node.id,
    quantity: node.quantity,
    lineTotalPrice: node.cost.totalAmount.amount,
    variant: transformVariant(node.merchandise),
    product: {
      id: node.merchandise.product.id,
      handle: node.merchandise.product.handle,
      title: node.merchandise.product.title,
      vendor: node.merchandise.product.vendor,
      featuredImage: node.merchandise.product.featuredImage?.url ?? null,
      featuredImageAlt: node.merchandise.product.featuredImage?.altText ?? null,
    },
  }));

  return {
    id: c.id,
    checkoutUrl: c.checkoutUrl,
    totalQuantity: c.totalQuantity,
    lines,
    cost: {
      subtotal: c.cost.subtotalAmount.amount,
      total: c.cost.totalAmount.amount,
      totalTax: c.cost.totalTaxAmount?.amount ?? null,
      currencyCode: c.cost.subtotalAmount.currencyCode,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Public Service Functions (used by pages)
// ─────────────────────────────────────────────────────────────────────────────

export async function getProducts(first = 20): Promise<Product[]> {
  const raw = await shopifyGetProducts(first);
  return raw.map(transformProduct);
}

export async function getFeaturedProducts(first = 8): Promise<Product[]> {
  const raw = await shopifyGetFeaturedProducts(first);
  return raw.map(transformProduct);
}

export async function getProduct(handle: string): Promise<Product | null> {
  const raw = await getProductByHandle(handle);
  if (!raw) return null;
  return transformProduct(raw);
}

export async function searchProducts(query: string, first = 20): Promise<Product[]> {
  const raw = await shopifySearch(query, first);
  return raw.map(transformProduct);
}

export async function getRelatedProducts(productId: string): Promise<Product[]> {
  const raw = await shopifyGetRecommendations(productId);
  return raw.map(transformProduct);
}

export async function getCollections(first = 10): Promise<Collection[]> {
  const raw = await shopifyGetCollections(first);
  return raw.map(transformCollection);
}

export async function getCollection(handle: string, productsFirst = 24): Promise<Collection | null> {
  const raw = await getCollectionByHandle(handle, productsFirst);
  if (!raw) return null;
  return transformCollection(raw);
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const raw = await shopifyGetCart(cartId);
  if (!raw) return null;
  return transformCart(raw);
}

export async function createCart(): Promise<Cart> {
  const raw = await shopifyCreateCart();
  return transformCart(raw);
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity = 1
): Promise<Cart> {
  const raw = await shopifyAddToCart(cartId, [
    { merchandiseId: variantId, quantity },
  ]);
  return transformCart(raw);
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<Cart> {
  const raw = await shopifyUpdateCartLine(cartId, lineId, quantity);
  return transformCart(raw);
}

export async function removeFromCart(cartId: string, lineId: string): Promise<Cart> {
  const raw = await shopifyRemoveCartLine(cartId, lineId);
  return transformCart(raw);
}
