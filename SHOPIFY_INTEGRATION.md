# Shopify Integration Guide

This document outlines how SmartCart integrates with the Shopify Storefront API.

## Environment Variables

SmartCart requires the following environment variables to securely connect to the Storefront API. These are validated on boot inside `src/commerce/utils/env.ts`.

- `SHOPIFY_STORE_DOMAIN`: Your `*.myshopify.com` domain.
- `SHOPIFY_STOREFRONT_PUBLIC_TOKEN`: The public access token generated via the Shopify Headless App channel.
- `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`: Exposed to the client bundle for hydration.
- `NEXT_PUBLIC_SHOPIFY_STOREFRONT_PUBLIC_TOKEN`: Exposed to the client bundle for live component hydration.
- `SHOPIFY_API_VERSION`: Explicitly set (e.g., `2025-07`).

## Storefront API Usage

All communication with the Storefront API goes through a centralized client wrapper (`src/commerce/client/shopifyClient.ts`). 

**Features of the Client:**
- Single POST endpoint pointing to `/api/{version}/graphql.json`.
- Injects the `X-Shopify-Storefront-Access-Token` securely.
- Manages `fetch` timeouts.
- Manages Exponential Backoff for 429 Too Many Requests errors.
- Automatically maps Shopify GraphQL constraint errors to domain models.

## Repository Implementations

Repositories abstract GraphQL away from the rest of the application. The primary implementation is `ShopifyProductRepository`. 

**Example Flow:**
```typescript
const data = await shopifyClient.request('getProductByHandle', GetProductByHandleQuery, { handle });
return mapProduct(data.product);
```

## GraphQL Queries & Fragments

GraphQL strings are kept in `src/commerce/graphql/queries/` and `src/commerce/graphql/fragments/`. 

We rely on fragments heavily to ensure the `Mapper` always receives consistent data shapes:
- `ProductFragment`: Essential fields for `ProductCard` (ID, Handle, Price, First Image).
- `ProductFullFragment`: Exhaustive fields for PDPs (Variants, Options, SEO).
- `CollectionFragment`: Image, handle, title.

## Caching Strategy

Since Shopify API rate limits are aggressive, Next.js cache capabilities are heavily utilized via the native `fetch` object configuration (`{ next: { revalidate: X } }`).

- **Static Pages (Homepage/Categories)**: 300 seconds (5 minutes).
- **Product Details Pages**: 600 seconds (10 minutes).
- **Client Fetches**: Handled via component lifecycles or SWR (future implementation).

## Image Handling

Images returned from Shopify's CDN (`cdn.shopify.com`) are natively optimized by the Next.js `<Image />` component. We have configured the `remotePatterns` inside `next.config.ts` to allow automatic AVIF/WebP generation, sizing, and lazy loading.

## Error Handling

If Shopify returns an empty node (e.g. invalid product handle), the repository throws a `ProductNotFoundError`. The Next.js router boundary intercepts this and automatically invokes `notFound()`, presenting a clean 404 page instead of a 500 server crash.

## Security Considerations

**Public vs Private Tokens:**
The Storefront API token (`SHOPIFY_STOREFRONT_PUBLIC_TOKEN`) is intentionally designed to be public. It only holds unauthenticated read permissions for Storefront scopes (Products, Collections). It is completely safe to expose to the client via `NEXT_PUBLIC_`.

The Admin API token (`SHOPIFY_ADMIN_API_TOKEN`) MUST NEVER be exposed to the client. It grants write permissions and is strictly used server-side (if required for advanced inventory syncing, though SmartCart avoids it where possible).

## Future Integrations

- **Future Cart API Integration**: The mock `useCartStore` will be replaced with Storefront API mutations (`cartCreate`, `cartLinesAdd`). This will map a Shopify Cart ID to a user session.
- **Future Customer API Integration**: Using `customerAccessTokenCreate`, users will authenticate against Shopify directly. This requires secure HttpOnly cookie management.
