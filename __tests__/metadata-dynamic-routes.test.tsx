// Original file: https://github.com/vercel/next.js/blob/canary/test/e2e/app-dir/metadata-dynamic-routes/index.test.ts

import { describe, expect, test } from 'vitest';
import { toISODateString } from '@/lib/date';

const BASE_URL = 'http://localhost:3000';
const BUILD_URL = 'https://divotion-assessment-alpha.vercel.app';

const CACHE_HEADERS = {
  NONE: 'no-cache, no-store',
  LONG: 'public, immutable, no-transform, max-age=31536000',
  REVALIDATE: 'public, max-age=0, must-revalidate',
};

describe('app dir - metadata dynamic routes', () => {
  describe('robots.txt', () => {
    test('should handle robots.[ext] dynamic routes', async () => {
      console.log(`${BASE_URL}/robots.txt`);
      const res = await fetch(`${BASE_URL}/robots.txt`);
      const text = await res.text();

      expect(res.headers.get('content-type')).toBe('text/plain');
      expect(res.headers.get('cache-control')).toBe(CACHE_HEADERS.REVALIDATE);

      expect(text).toMatchInlineSnapshot(`
        "User-Agent: *
        Allow: /
        Crawl-delay: 2

        Host: ${BUILD_URL}
        Sitemap: ${BUILD_URL}/sitemap.xml
        Sitemap: ${BUILD_URL}/sitemap_index.xml
        "
      `);
    });
  });

  describe('sitemap', () => {
    test('should handle sitemap.[ext] dynamic routes', async () => {
      const res = await fetch(`${BASE_URL}/sitemap.xml`);
      const text = await res.text();

      expect(res.headers.get('content-type')).toBe('application/xml');
      expect(res.headers.get('cache-control')).toBe(CACHE_HEADERS.REVALIDATE);

      const lastModified = toISODateString(new Date());

      expect(text).toMatchInlineSnapshot(`
        "<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
        <loc>${BUILD_URL}/</loc>
        <lastmod>${lastModified}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1</priority>
        </url>
        <url>
        <loc>${BUILD_URL}/products</loc>
        <lastmod>${lastModified}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
        </url>
        </urlset>
        "
      `);
    });

    test.skip('should support generate multi sitemaps with generateSitemaps', async () => {
      const ids = [0];
      function fetchSitemap(id: string | number, withExtension: boolean) {
        return fetch(`${BASE_URL}/products/sitemap/${id}${withExtension ? `.xml` : ''}`);
      }

      // Required to have .xml extension for dynamic sitemap
      for (const id of ids) {
        const text = await fetchSitemap(id, true).then((res) => res.text());
        expect(text).toContain(`<loc>${BUILD_URL}}/product/${id}</loc>`);
      }

      // Should 404 when missing .xml extension
      for (const id of ids) {
        const { status } = await fetchSitemap(id, false);
        expect(status).toBe(404);
      }
    });

    test.skip('should support alternate.languages in sitemap', async () => {
      const xml = await (await fetch('/lang/sitemap.xml')).text();

      expect(xml).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml');
      expect(xml).toContain(`<xhtml:link rel="alternate" hreflang="es" href="https://example.com/es/about" />`);
      expect(xml).toContain(`<xhtml:link rel="alternate" hreflang="de" href="https://example.com/de/about" />`);
    });

    test('should support images in sitemap', async () => {
      const xml = await (await fetch(`${BASE_URL}/products/sitemap.xml`)).text();

      expect(xml).toContain(
        `<image:image>\n<image:loc>https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg</image:loc>\n</image:image>`
      );
      expect(xml).toContain(
        `<image:image>\n<image:loc>https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg</image:loc>\n</image:image>`
      );
    });

    test.skip('should support videos in sitemap', async () => {
      const xml = await (await fetch('/sitemap-video/sitemap.xml')).text();
      expect(xml).toMatchInlineSnapshot(`
        "<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
        <url>
        <loc>https://example.com/about</loc>
        <video:video>
        <video:title>example</video:title>
        <video:thumbnail_loc>https://example.com/image.jpg</video:thumbnail_loc>
        <video:description>this is the description</video:description>
        <video:content_loc>http://streamserver.example.com/video123.mp4</video:content_loc>
        <video:player_loc>https://www.example.com/videoplayer.php?video=123</video:player_loc>
        <video:duration>2</video:duration>
        <video:view_count>50</video:view_count>
        <video:tag>summer</video:tag>
        <video:rating>4</video:rating>
        <video:expiration_date>2025-09-16</video:expiration_date>
        <video:publication_date>2024-09-16</video:publication_date>
        <video:family_friendly>yes</video:family_friendly>
        <video:requires_subscription>no</video:requires_subscription>
        <video:live>no</video:live>
        <video:restriction relationship="allow">IE GB US CA</video:restriction>
        <video:platform relationship="allow">web</video:platform>
        <video:uploader info="https://www.example.com/users/grillymcgrillerson">GrillyMcGrillerson</video:uploader>
        </video:video>
        </url>
        </urlset>
        "
      `);
    });
  });
});
