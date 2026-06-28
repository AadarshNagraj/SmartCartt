# SmartCart Roadmap

This document outlines the high-level phases of the SmartCart project, tracking what has been accomplished and what remains to be built before production launch.

## Completed Phases

- ✅ **UI Foundation**: Base components, responsive layout, Framer Motion animations, global design tokens, and CSS modules.
- ✅ **Homepage**: Hero banner, best sellers grid, featured collections, and promotional sections.
- ✅ **PDP (Product Detail Page)**: Dynamic image galleries, variant selection, price updating, rich text descriptions, and accordion details.
- ✅ **Collections**: Grid layouts, mobile filter drawer, desktop sidebar, and empty states.
- ✅ **Commerce Core**: Implementation of the Repository Pattern, Dependency Injection, GraphQL Client wrapper, generic Models, and robust Mappers.
- ✅ **Live Products**: PDPs seamlessly pull real Shopify product data, variants, and images.
- ✅ **Live Collections**: Category pages dynamically fetch and render collections from the Storefront API.
- ✅ **Product Routing**: Every product reference across the app uses live `ProductModel.handle` values. All legacy mocks have been purged. Persistent client hydration (Wishlist, Recently Viewed) fetches real Shopify products based on tracked handles.

---

## Remaining Phases

- ⬜ **Shopify Cart API**
  *Replace the local Zustand mock cart. Integrate `cartCreate`, `cartLinesAdd`, and `cartLinesUpdate` Storefront mutations. Sync the cart ID to a browser cookie.*
  
- ⬜ **Checkout**
  *Extract the Shopify `checkoutUrl` from the Cart API and build a secure redirect flow, allowing users to securely complete their purchases on Shopify's domain.*
  
- ⬜ **Predictive Search**
  *Update `searchService.ts` to query the Shopify Predictive Search GraphQL endpoint rather than filtering best-sellers client-side. Render products, collections, and articles natively.*

- ⬜ **Customer API**
  *Implement Shopify Customer authentication (`customerAccessTokenCreate`). Securely store HttpOnly tokens. Build the "My Account" page, fetching live order histories and address books.*

- ⬜ **Analytics**
  *Integrate telemetry for e-commerce tracking (e.g., Google Analytics 4, Meta Pixel) to track `view_item`, `add_to_cart`, and `purchase` events natively inside the components.*

- ⬜ **Performance Optimization**
  *Audit Next.js bundle sizes. Ensure all non-critical scripts load asynchronously. Maximize the usage of React Server Components by removing `"use client"` where unnecessary.*

- ⬜ **Vercel Production Deployment**
  *Configure Vercel CI/CD pipeline, attach a custom production domain, configure wildcard SSL certificates, and set up branch previews for staging environments.*
