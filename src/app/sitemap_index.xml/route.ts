import { getProducts } from '@/lib/productsService';
import { calcNumSitemaps } from '@/lib/sitemaps';
import { NextResponse } from 'next/server';

const BASE_URL = process.env.BASE_URL;

export async function GET() {
  try {
    const dynamicSitemaps = await generateSitemaps();

    // Combine static and dynamic sitemaps
    const sitemaps = [
      `${BASE_URL}/sitemap.xml`,
      `${BASE_URL}/products/sitemap.xml`,
      ...dynamicSitemaps.map((sitemap) => sitemap.url),
    ];

    const sitemapIndexXML = buildSitemapIndex(sitemaps);

    return new NextResponse(sitemapIndexXML, {
      headers: {
        'Content-Type': 'application/xml',
        'Content-Length': Buffer.byteLength(sitemapIndexXML).toString(),
      },
    });
  } catch (error) {
    console.error('Error generating sitemap index:', error);
    return NextResponse.error();
  }
}

async function generateSitemaps() {
  const numProducts = getProducts().length;
  const numSitemaps = calcNumSitemaps(numProducts);
  const productsSitemapUrls = Array.from({ length: numSitemaps }, (_, index) => ({
    id: index,
    url: `${BASE_URL}/products/sitemap/${index}.xml`,
  }));

  return productsSitemapUrls;
}

function buildSitemapIndex(sitemapUrls: string[]) {
  const sitemapXML = sitemapUrls.reduce((prev, url) => {
    return prev + `<sitemap><loc>${url}</loc></sitemap>`;
  }, '');

  return `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapXML}
    </sitemapindex>`;
}
