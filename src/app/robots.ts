import type { MetadataRoute } from 'next';

const BASE_URL = process.env.BASE_URL;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '',
      crawlDelay: 2,
    },
    host: BASE_URL,
    sitemap: [`${BASE_URL}/sitemap.xml`, `${BASE_URL}/sitemap_index.xml`],
  };
}
