import { toISODateString } from '@/lib/date';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = toISODateString(new Date());
  return [
    {
      url: `${process.env.BASE_URL}/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${process.env.BASE_URL}/products`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];
}
