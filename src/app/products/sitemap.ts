import { getProducts } from '@/lib/productsService';
import { GOOGLE_SITEMAP_LIMIT } from '@/lib/sitemaps';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getProducts();
  return products.slice(0, GOOGLE_SITEMAP_LIMIT).map((product) => ({
    url: `${process.env.BASE_URL}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));
}

// FIXME: This should generate a sitemap for each batch of 50000 products, but it is not working as expected.

// export async function generateSitemaps() {
//   const numProducts = getProducts().length;
//   const numSitemaps = calcNumSitemaps(numProducts)
//   return Array.from({ length: numSitemaps }, (_, index) => ({ id: index }));
// }

// export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
//   const products = getProducts().slice(id, id + GOOGLE_SITEMAP_LIMIT);
//   return products.map((product) => ({
//     url: `${process.env.BASE_URL}/product/${product.id}`,
//     lastModified: new Date(),
//     changeFrequency: 'monthly',
//     priority: 0.6,
//   }));
// }
