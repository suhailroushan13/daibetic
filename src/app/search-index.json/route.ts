import { glossary } from '@/data/glossary';
import { categories } from '@/data/navigation';
import { getArticles } from '@/lib/content';
import type { SearchItem } from '@/lib/search';

export const dynamic = 'force-static';

export function GET() {
  const articles: SearchItem[] = getArticles().map((a) => ({
    url: a.route,
    title: a.title,
    description: a.simple.tldr,
    category: categories.find((c) => c.key === a.category)!.label,
    kind: 'Article',
    text: [a.description, a.tags.join(' '), ...a.simple.steps.flatMap((s) => [s.title, s.text, s.example]), a.simple.remember].join(' '),
  }));
  const words: SearchItem[] = glossary.map((g) => ({
    url: `/glossary#${g.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    title: g.term,
    description: g.simple,
    category: 'Glossary',
    kind: 'Glossary',
    text: `${g.definition} ${g.example}`,
  }));
  return Response.json([...articles, ...words]);
}
