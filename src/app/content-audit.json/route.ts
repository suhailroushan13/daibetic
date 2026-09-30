import { sourceList } from '@/data/sources';
import { getArticles } from '@/lib/content';

export const dynamic = 'force-static';

export function GET() {
  const articles = getArticles().map(({ body: _body, headings: _headings, simple, ...meta }) => ({ ...meta, simpleSteps: simple.steps.length }));
  return Response.json({ articles, sources: sourceList });
}
