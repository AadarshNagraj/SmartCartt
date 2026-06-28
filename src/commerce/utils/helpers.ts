/**
 * Formats a raw number or string amount into a localized currency string.
 */
export function formatMoney(amount: string | number, currencyCode: string = 'USD', locale: string = 'en-US'): string {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numericAmount)) return '$0.00';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
  }).format(numericAmount);
}

/**
 * Formats an ISO date string into a localized readable date.
 */
export function formatDate(isoString: string, locale: string = 'en-US'): string {
  if (!isoString) return '';
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(isoString));
}

/**
 * Ensures an image URL is absolute, prepending the Shopify domain if necessary.
 * Primarily useful if Shopify returns a relative path (rare, but good for safety).
 */
export function ensureAbsoluteUrl(url: string, baseUrl?: string): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  if (url.startsWith('//')) return `https:${url}`;
  return baseUrl ? `${baseUrl}${url}` : url;
}

/**
 * Helper to safely extract nodes from a Shopify GraphQL connection (edges/nodes).
 */
export function extractNodes<T>(connection: { edges?: { node: T }[] } | null | undefined): T[] {
  if (!connection || !connection.edges) return [];
  return connection.edges.map(edge => edge.node);
}
