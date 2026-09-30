import { getArticles, SITE_URL } from '@/lib/content';

export const dynamic = 'force-static';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function GET() {
  const items = getArticles()
    .map((a) => `<item><title>${esc(a.title)}</title><link>${SITE_URL}${a.route}</link><guid>${SITE_URL}${a.route}</guid><pubDate>${new Date(a.dateModified).toUTCString()}</pubDate><description>${esc(a.simple.tldr)}</description></item>`)
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Glucose Atlas: updates</title><link>${SITE_URL}</link><description>Diabetes explained in simple words, with sources.</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
