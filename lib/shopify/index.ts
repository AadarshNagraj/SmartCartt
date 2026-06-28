import { shopifyFetch, shopifyFetchNoCache } from "./client";
import {
  GET_PRODUCTS_QUERY,
  GET_PRODUCT_BY_HANDLE_QUERY,
  SEARCH_PRODUCTS_QUERY,
  GET_PRODUCT_RECOMMENDATIONS_QUERY,
  GET_COLLECTIONS_QUERY,
  GET_COLLECTION_BY_HANDLE_QUERY,
  GET_CART_QUERY,
} from "./queries";
import {
  CREATE_CART_MUTATION,
  ADD_TO_CART_MUTATION,
  UPDATE_CART_MUTATION,
  REMOVE_FROM_CART_MUTATION,
} from "./mutations";
import {
  ShopifyProduct,
  ShopifyCollection,
  ShopifyCart,
} from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// Products
// ─────────────────────────────────────────────────────────────────────────────

export async function getProducts(first = 20): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{
    products: { edges: Array<{ node: ShopifyProduct }> };
  }>(GET_PRODUCTS_QUERY, { first, sortKey: "BEST_SELLING" });
  return data.products.edges.map((e) => e.node);
}

export async function getFeaturedProducts(first = 8): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{
    products: { edges: Array<{ node: ShopifyProduct }> };
  }>(GET_PRODUCTS_QUERY, { first, sortKey: "BEST_SELLING", reverse: false }, ["featured-products"]);
  return data.products.edges.map((e) => e.node);
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{ product: ShopifyProduct | null }>(
    GET_PRODUCT_BY_HANDLE_QUERY,
    { handle },
    [`product-${handle}`]
  );
  return data.product;
}

export async function searchProducts(query: string, first = 20): Promise<ShopifyProduct[]> {
  const data = await shopifyFetchNoCache<{
    products: { edges: Array<{ node: ShopifyProduct }> };
  }>(SEARCH_PRODUCTS_QUERY, { query, first });
  return data.products.edges.map((e) => e.node);
}

export async function getProductRecommendations(productId: string): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{ productRecommendations: ShopifyProduct[] }>(
    GET_PRODUCT_RECOMMENDATIONS_QUERY,
    { productId }
  );
  return data.productRecommendations ?? [];
}

// ─────────────────────────────────────────────────────────────────────────────
// Collections
// ─────────────────────────────────────────────────────────────────────────────

export async function getCollections(first = 10): Promise<ShopifyCollection[]> {
  const data = await shopifyFetch<{
    collections: { edges: Array<{ node: ShopifyCollection }> };
  }>(GET_COLLECTIONS_QUERY, { first }, ["collections"]);
  return data.collections.edges.map((e) => e.node);
}

export async function getCollectionByHandle(
  handle: string,
  productsFirst = 24
): Promise<ShopifyCollection | null> {
  const data = await shopifyFetch<{ collection: ShopifyCollection | null }>(
    GET_COLLECTION_BY_HANDLE_QUERY,
    { handle, productsFirst },
    [`collection-${handle}`]
  );
  return data.collection;
}

// ─────────────────────────────────────────────────────────────────────────────
// Cart
// ─────────────────────────────────────────────────────────────────────────────

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await shopifyFetchNoCache<{ cart: ShopifyCart | null }>(
    GET_CART_QUERY,
    { cartId }
  );
  return data.cart;
}

export async function createCart(): Promise<ShopifyCart> {
  const data = await shopifyFetchNoCache<{
    cartCreate: { cart: ShopifyCart; userErrors: Array<{ field: string[]; message: string }> };
  }>(CREATE_CART_MUTATION, { input: {} });

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors.map((e) => e.message).join(", "));
  }

  return data.cartCreate.cart;
}

export async function addToCart(
  cartId: string,
  lines: Array<{ merchandiseId: string; quantity: number }>
): Promise<ShopifyCart> {
  const data = await shopifyFetchNoCache<{
    cartLinesAdd: { cart: ShopifyCart; userErrors: Array<{ field: string[]; message: string }> };
  }>(ADD_TO_CART_MUTATION, { cartId, lines });

  if (data.cartLinesAdd.userErrors.length > 0) {
    throw new Error(data.cartLinesAdd.userErrors.map((e) => e.message).join(", "));
  }

  return data.cartLinesAdd.cart;
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<ShopifyCart> {
  const data = await shopifyFetchNoCache<{
    cartLinesUpdate: { cart: ShopifyCart; userErrors: Array<{ field: string[]; message: string }> };
  }>(UPDATE_CART_MUTATION, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });

  if (data.cartLinesUpdate.userErrors.length > 0) {
    throw new Error(data.cartLinesUpdate.userErrors.map((e) => e.message).join(", "));
  }

  return data.cartLinesUpdate.cart;
}

export async function removeCartLine(
  cartId: string,
  lineId: string
): Promise<ShopifyCart> {
  const data = await shopifyFetchNoCache<{
    cartLinesRemove: { cart: ShopifyCart; userErrors: Array<{ field: string[]; message: string }> };
  }>(REMOVE_FROM_CART_MUTATION, {
    cartId,
    lineIds: [lineId],
  });

  if (data.cartLinesRemove.userErrors.length > 0) {
    throw new Error(data.cartLinesRemove.userErrors.map((e) => e.message).join(", "));
  }

  return data.cartLinesRemove.cart;
}
