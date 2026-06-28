/**
 * Validates the presence of required environment variables for Shopify.
 * Throws a descriptive error during application startup if any are missing.
 */

export function validateEnv() {
  const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || process.env.SHOPIFY_STORE_DOMAIN;
  const storefrontToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_PUBLIC_TOKEN || process.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN;
  const apiVersion = process.env.SHOPIFY_API_VERSION || '2024-01';

  if (!storeDomain) {
    throw new Error(
      `[Shopify Setup Error]: Missing SHOPIFY_STORE_DOMAIN. Please add it to your environment variables.`
    );
  }

  if (!storefrontToken) {
    throw new Error(
      `[Shopify Setup Error]: Missing SHOPIFY_STOREFRONT_PUBLIC_TOKEN. Please add it to your environment variables.`
    );
  }

  // Format domain to ensure it doesn't have a trailing slash and includes https://
  const domain = storeDomain.includes('://') 
    ? storeDomain 
    : `https://${storeDomain}`;
    
  const cleanDomain = domain.replace(/\/$/, '');

  return {
    storeDomain: cleanDomain,
    storefrontToken,
    apiVersion
  };
}
