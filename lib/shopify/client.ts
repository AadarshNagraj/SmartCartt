import { ShopifyGraphQLResponse } from "./types";

const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const storefrontToken = process.env.SHOPIFY_STOREFRONT_TOKEN!;

if (!domain || !storefrontToken) {
  throw new Error(
    "Missing Shopify environment variables: SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_TOKEN are required."
  );
}

const endpoint = `https://${domain}/api/2024-10/graphql.json`;

/**
 * Core Shopify Storefront GraphQL client.
 * Always runs server-side — never called from the browser.
 */
export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  tags?: string[]
): Promise<T> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
    next: {
      // Revalidate every 60 seconds for product/collection data
      revalidate: 60,
      tags: tags ?? [],
    },
  });

  if (!res.ok) {
    throw new Error(
      `Shopify API request failed: ${res.status} ${res.statusText}`
    );
  }

  const json: ShopifyGraphQLResponse<T> = await res.json();

  if (json.errors && json.errors.length > 0) {
    const messages = json.errors.map((e) => e.message).join(", ");
    throw new Error(`Shopify GraphQL errors: ${messages}`);
  }

  if (!json.data) {
    throw new Error("Shopify API returned no data");
  }

  return json.data;
}

/**
 * No-cache fetch — used for real-time data like cart operations.
 */
export async function shopifyFetchNoCache<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(
      `Shopify API request failed: ${res.status} ${res.statusText}`
    );
  }

  const json: ShopifyGraphQLResponse<T> = await res.json();

  if (json.errors && json.errors.length > 0) {
    const messages = json.errors.map((e) => e.message).join(", ");
    throw new Error(`Shopify GraphQL errors: ${messages}`);
  }

  if (!json.data) {
    throw new Error("Shopify API returned no data");
  }

  return json.data;
}
