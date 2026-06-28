import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://smartcart.sbs';

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/products', '/categories'],
      disallow: ['/cart', '/account', '/login', '/register', '/wishlist'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
