import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import GithubSlugger from 'github-slugger';
import { categories } from '@/data/navigation';
import { evidenceLevels, type EvidenceLevel } from '@/data/evidence';
import { sources } from '@/data/sources';
import { simpleBySlug, type Simple } from '@/data/simple';
import { difficultyLabel, type ArticleSummary } from '@/lib/article-types';

export { difficultyLabel };
export type { ArticleSummary };

const ROOT = path.join(process.cwd(), 'content', 'research');

export interface Heading { depth: 2 | 3; text: string; id: string }

export interface Article {
  slug: string;
  route: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  datePublished: string;
  dateModified: string;
  reviewedDate: string;
  author: string;
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readingTime: number;
  evidenceLevel: EvidenceLevel;
  featured: boolean;
  relatedTopics: string[];
  sources: string[];
  order: number;
  clinicalReview: string;
  body: string;
  headings: Heading[];
  simple: Simple;
}

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : e.name.endsWith('.mdx') ? [path.join(dir, e.name)] : [],
  );
}

function fail(file: string, message: string): never {
  throw new Error(`Invalid article ${path.relative(process.cwd(), file)}: ${message}`);
}

function extractHeadings(body: string): Heading[] {
  const slugger = new GithubSlugger();
  const out: Heading[] = [];
  let inCode = false;
  for (const line of body.split('\n')) {
    if (line.startsWith('```')) inCode = !inCode;
    if (inCode) continue;
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const text = m[2].replace(/<[^>]+>/g, '').replace(/[*_`]/g, '');
    out.push({ depth: m[1].length as 2 | 3, text, id: slugger.slug(text) });
  }
  return out;
}

function load(): Article[] {
  const slugs = new Set<string>();
  const articles = walk(ROOT).map((file): Article => {
    const { data: d, content } = matter(fs.readFileSync(file, 'utf8'));
    for (const key of ['title', 'description', 'category', 'slug', 'datePublished', 'dateModified', 'reviewedDate', 'author'] as const) {
      if (!d[key]) fail(file, `missing "${key}"`);
    }
    if (!categories.some((c) => c.key === d.category)) fail(file, `unknown category "${d.category}"`);
    if (!evidenceLevels.includes(d.evidenceLevel)) fail(file, `unknown evidence level "${d.evidenceLevel}"`);
    if (!/^[a-z0-9-]+\/[a-z0-9-]+$/.test(d.slug)) fail(file, `bad slug "${d.slug}"`);
    if (slugs.has(d.slug)) fail(file, `duplicate slug "${d.slug}"`);
    slugs.add(d.slug);
    for (const id of d.sources ?? []) if (!sources[id]) fail(file, `unknown source "${id}"`);
    if (!d.sources?.length) fail(file, 'needs at least one source');
    const simple = simpleBySlug[d.slug];
    if (!simple) fail(file, 'missing plain-language explainer in src/data/simple');

    const words = content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    const simpleWords = [simple.tldr, simple.remember, ...simple.steps.flatMap((s) => [s.title, s.text, s.example])].join(' ').split(/\s+/).length;
    return {
      slug: d.slug,
      route: `/${d.slug}`,
      title: d.title,
      description: d.description,
      category: d.category,
      subcategory: d.subcategory ?? '',
      datePublished: String(d.datePublished),
      dateModified: String(d.dateModified),
      reviewedDate: String(d.reviewedDate),
      author: d.author,
      tags: d.tags ?? [],
      difficulty: d.difficulty ?? 'Beginner',
      readingTime: Math.max(2, Math.ceil((words + simpleWords) / 210)),
      evidenceLevel: d.evidenceLevel,
      featured: Boolean(d.featured),
      relatedTopics: d.relatedTopics ?? [],
      sources: d.sources,
      order: typeof d.order === 'number' ? d.order : 100,
      clinicalReview: d.clinicalReview ?? '',
      body: content,
      headings: extractHeadings(content),
      simple,
    };
  });
  for (const a of articles) {
    for (const r of a.relatedTopics) if (!slugs.has(r)) fail(path.join(ROOT, `${a.slug}.mdx`), `unknown related topic "${r}"`);
  }
  return articles.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

let cache: Article[] | undefined;

/** Every article, in reading order. Validated once per process. */
export function getArticles(): Article[] {
  return (cache ??= load());
}

export function getArticle(slug: string) {
  return getArticles().find((a) => a.slug === slug);
}

export function getArticlesByCategory(key: string) {
  return getArticles().filter((a) => a.category === key);
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso));
}

export const SITE_URL = (process.env.SITE_URL || 'https://diabetes.suhailroushan.com').replace(/\/$/, '');

/** Serialize JSON for a <script> tag without allowing "</script>" breakouts. */
export const safeJson = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');

export function toSummary(a: Article): ArticleSummary {
  return {
    slug: a.slug,
    route: a.route,
    title: a.title,
    description: a.description,
    tldr: a.simple.tldr,
    category: a.category,
    difficulty: a.difficulty,
    evidenceLevel: a.evidenceLevel,
    readingTime: a.readingTime,
    featured: a.featured,
    tags: a.tags,
  };
}
