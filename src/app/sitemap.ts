import type { MetadataRoute } from 'next';
import { categories } from '@/data/navigation';
import { getArticles, SITE_URL } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/learn', '/research', '/glossary', '/sources', '/about', '/report'].map((p) => ({ url: `${SITE_URL}${p}` }));
  const cats = categories.map((c) => ({ url: `${SITE_URL}/${c.key}` }));
  const articles = getArticles().map((a) => ({ url: `${SITE_URL}${a.route}`, lastModified: new Date(a.dateModified) }));
  return [...pages, ...cats, ...articles];
}
