export const GOOGLE_SITEMAP_LIMIT = 50_000;

export const calcNumSitemaps = (numItems: number) => Math.ceil(numItems / GOOGLE_SITEMAP_LIMIT);
