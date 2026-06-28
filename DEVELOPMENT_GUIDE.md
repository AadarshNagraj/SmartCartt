# SmartCart Development Guide

Welcome to the SmartCart development team! This guide provides all the necessary conventions, rules, and commands to contribute effectively to the repository.

## Requirements

- **Node.js**: v18.17.0+ (LTS recommended)
- **NPM**: v9.0+ 
- A valid Shopify Storefront API token.

## Installation

```bash
git clone <repository_url>
cd smartcart
npm install
```

## Environment Setup

Create a `.env.local` file in the root directory using `.env.example` as a template:

```env
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_PUBLIC_TOKEN=your_public_token
NEXT_PUBLIC_SHOPIFY_STOREFRONT_PUBLIC_TOKEN=your_public_token
SHOPIFY_API_VERSION=2024-01
```

## Running the Application

**Development Server:**
```bash
npm run dev
```

**Production Build:**
```bash
npm run build
npm run start
```

**Linting:**
```bash
npm run lint
```

## Folder Conventions

- **`src/app`**: Route definitions only. No complex logic.
- **`src/components`**: Reusable UI. Grouped by feature domain (e.g., `/cart`, `/product`, `/ui`).
- **`src/commerce`**: Strict boundary. The UI MUST NOT bypass this layer to talk to Shopify.
- **`src/store`**: Global Zustand stores. Persisted data should be lightweight (e.g., IDs/Handles only).

## Coding Standards

- **TypeScript Strict Mode**: No `any` types are permitted in new code. Define proper interfaces inside `src/commerce/models`.
- **CSS Modules**: Do not use global CSS classes for components. Scope styles tightly to `<Component>.module.css`.
- **"use client" Directives**: Push client components as far down the React tree as possible to maximize Server Component rendering.

## Repository Pattern Rules

The Commerce Layer implements a strict Repository Pattern to guarantee separation of concerns.

1. **Interfaces First**: Never implement a new repository class without first defining its contract in `src/commerce/repositories/index.ts`.
2. **Models**: The UI exclusively speaks in `Models` (e.g. `ProductModel`). Raw Shopify JSON objects MUST NEVER reach a React Component.
3. **Mappers**: A repository must pass raw GraphQL output through a Mapper function (`src/commerce/mappers`) before returning it to the UI.

## How to Add a New Repository

1. **Define the Interface**: Open `src/commerce/repositories/index.ts` and add the method signature.
2. **Write the GraphQL Query**: Add your query string to `src/commerce/graphql/queries`.
3. **Implement the Logic**: Open `src/commerce/repositories/implementations/Shopify<Feature>Repository.ts`. Execute the query using `shopifyClient`.
4. **Map the Output**: Use or create a mapper to convert the raw nodes into a `Model`.
5. **Export the Singleton**: Export an instantiated version of the repository at the bottom of the file.

## How to Add a New Page

1. Create a folder in `src/app` matching the desired route (e.g. `src/app/about`).
2. Add a `page.tsx` file inside the folder.
3. Keep the file as a Server Component by default. 
4. Fetch data via a repository (e.g. `const pageData = await pageRepository.getPage('about');`).
5. Pass the data to a modular UI component inside `src/components`.

## How to Deploy

SmartCart is optimized for Vercel.

1. Push your changes to the `main` branch.
2. Ensure Vercel is connected to your repository.
3. Configure the exact same Environment Variables (`SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_PUBLIC_TOKEN`, etc.) in the Vercel Project Settings.
4. Deployments are fully automated upon push.
