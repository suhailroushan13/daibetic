import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { ArrowLeft, ArrowRight, CalendarCheck, ChevronRight, Clock, FileText, ShieldAlert } from 'lucide-react';
import { getArticle, getArticles, formatDate, difficultyLabel, safeJson, toSummary, SITE_URL } from '@/lib/content';
import { categories, toneClasses } from '@/data/navigation';
import { guidePosition } from '@/data/guide';
import { evidenceSimple } from '@/data/evidence';
import { createMdxComponents } from '@/components/mdx';
import { SourceCard } from '@/components/mdx/source-card';
import { SimpleExplainer } from '@/components/site/simple-explainer';
import { GuideBar } from '@/components/site/guide-bar';
import { ReadingProgress } from '@/components/site/reading-progress';
import { Toc } from '@/components/site/toc';
import { ArticleCard } from '@/components/site/article-card';
import { EvidenceBadge } from '@/components/site/evidence-badge';
import { Icon } from '@/components/site/icon';
import { Reveal } from '@/components/site/reveal';
import { cn } from '@/lib/utils';

type Params = { category: string; slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getArticles().map((a) => {
    const [category, slug] = a.slug.split('/');
    return { category, slug };
  });
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category, slug } = await params;
  const a = getArticle(`${category}/${slug}`);
  if (!a) return {};
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: a.route },
    openGraph: { type: 'article', title: a.title, description: a.description, url: a.route, publishedTime: a.datePublished, modifiedTime: a.dateModified },
  };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { category: categoryKey, slug } = await params;
  const article = getArticle(`${categoryKey}/${slug}`);
  if (!article) notFound();

  const all = getArticles();
  const index = all.findIndex((a) => a.slug === article.slug);
  const prev = all[index - 1];
  const next = all[index + 1];
  const category = categories.find((c) => c.key === article.category)!;
  const tone = toneClasses[category.tone];
  const guide = guidePosition(article.slug);
  const related = article.relatedTopics.map((s) => all.find((a) => a.slug === s)).filter((a) => a !== undefined);
  const evidence = evidenceSimple[article.evidenceLevel];
  const url = `${SITE_URL}${article.route}`;

  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Article', headline: article.title, description: article.description, url, datePublished: new Date(article.datePublished).toISOString(), dateModified: new Date(article.dateModified).toISOString(), author: { '@type': 'Organization', name: article.author }, publisher: { '@type': 'Organization', name: 'Glucose Atlas' }, mainEntityOfPage: url },
      { '@type': 'BreadcrumbList', itemListElement: [{ name: 'Home', item: SITE_URL }, { name: category.label, item: `${SITE_URL}/${category.key}` }, { name: article.title, item: url }].map((item, i) => ({ '@type': 'ListItem', position: i + 1, ...item })) },
    ],
  };

  const toc = [
    { text: 'In simple words', id: 'simple-heading', depth: 2 as const },
    { text: 'The full story', id: 'full-story', depth: 2 as const },
    ...article.headings,
    { text: 'Sources', id: 'references', depth: 2 as const },
  ];

  return (
    <>
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(jsonld) }} />

      <div className="container-page pt-8 pb-4">
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <Link href={`/${category.key}`} className="hover:text-foreground">{category.label}</Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <span aria-current="page" className="line-clamp-1 text-foreground">{article.title}</span>
        </nav>

        <header className="mx-auto max-w-3xl">
          <Reveal y={10}>
            <Link href={`/${category.key}`} className={cn('inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold', tone.chip)}>
              <Icon name={category.icon} className="size-3.5" /> {category.label}
            </Link>
            <h1 className="mt-4 font-serif text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl">{article.title}</h1>
            <p className="mt-4 text-xl leading-relaxed text-muted-foreground text-pretty">{article.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-y py-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Clock className="size-4" aria-hidden="true" />{article.readingTime} min read</span>
              <span>{difficultyLabel[article.difficulty]}</span>
              <span className="inline-flex items-center gap-1.5"><FileText className="size-4" aria-hidden="true" />{article.sources.length} sources</span>
              <span className="inline-flex items-center gap-1.5"><CalendarCheck className="size-4" aria-hidden="true" />Checked {formatDate(article.reviewedDate)}</span>
              <EvidenceBadge level={article.evidenceLevel} className="ml-auto" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">By {article.author} · Updated {formatDate(article.dateModified)}</p>
          </Reveal>
        </header>
      </div>

      <div className="container-page">
        <div className="mx-auto grid max-w-3xl gap-10 xl:max-w-[62rem] xl:grid-cols-[minmax(0,44rem)_15rem]">
          <article className="min-w-0">
            <details className="mb-6 rounded-xl border bg-card px-4 py-3 xl:hidden">
              <summary className="cursor-pointer text-sm font-medium">On this page</summary>
              <nav aria-label="Article contents" className="mt-2 flex flex-col gap-1 text-sm">
                {toc.filter((h) => h.depth === 2).map((h) => <a key={h.id} href={`#${h.id}`} className="py-1 text-muted-foreground hover:text-foreground">{h.text}</a>)}
              </nav>
            </details>

            {guide && (
              <GuideBar
                slug={article.slug}
                step={guide.step}
                total={guide.total}
                moduleTitle={guide.module.title}
                stepTitle={guide.current.title}
                prev={guide.prev && { slug: guide.prev.slug, title: guide.prev.title }}
                next={guide.next && { slug: guide.next.slug, title: guide.next.title }}
              />
            )}

            <SimpleExplainer simple={article.simple} />

            <div id="full-story" className="scroll-mt-24">
              <div className="mb-2 flex items-center gap-3">
                <span className="h-px flex-1 bg-border" />
                <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">The full story</p>
                <span className="h-px flex-1 bg-border" />
              </div>
              <p className="mb-6 text-center text-sm text-muted-foreground">Want more? Below is the detailed version with the real science words. It is fine to skip it.</p>
            </div>

            <div className="article-prose">
              <MDXRemote
                source={article.body}
                components={createMdxComponents(article.sources)}
                options={{ blockJS: false, mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
              />
            </div>

            <section id="references" aria-labelledby="references-heading" className="mt-16 scroll-mt-24 border-t pt-8">
              <p className="text-xs font-semibold tracking-wider text-brand-foreground uppercase">Trace the evidence</p>
              <h2 id="references-heading" className="mt-1 font-serif text-2xl font-semibold">Sources and further reading</h2>
              <div className="mt-5 grid gap-3">
                {article.sources.map((id, i) => <SourceCard key={id} id={id} number={i + 1} />)}
              </div>
              <div className="mt-6 flex gap-3 rounded-2xl border border-warning-border bg-warning-surface p-4 text-sm leading-relaxed text-warning-foreground">
                <ShieldAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                <p>Source checking is an editorial literature check, not independent medical review. This page is for learning. It cannot diagnose you or make a treatment plan. Evidence labels describe the cited claims, not the whole topic.</p>
              </div>
              <div className="mt-6 rounded-2xl bg-muted/60 p-4 text-sm">
                <p className="mb-1.5 font-medium">What does “{article.evidenceLevel}” mean?</p>
                <p className="text-muted-foreground">{evidence.words} <em>{evidence.example}</em></p>
              </div>
            </section>

            {related.length > 0 && (
              <section aria-labelledby="related-heading" className="mt-16">
                <h2 id="related-heading" className="font-serif text-2xl font-semibold">Keep reading</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {related.map((r) => <ArticleCard key={r.slug} article={toSummary(r)} showEvidence={false} />)}
                </div>
              </section>
            )}

            <nav aria-label="Previous and next articles" className="mt-12 grid gap-4 sm:grid-cols-2">
              {prev ? (
                <Link href={prev.route} className="group rounded-2xl border p-4 transition-colors hover:border-brand/50 hover:bg-accent">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" /> Previous</span>
                  <span className="mt-1 block font-medium">{prev.title}</span>
                </Link>
              ) : <span />}
              {next && (
                <Link href={next.route} className="group rounded-2xl border p-4 text-right transition-colors hover:border-brand/50 hover:bg-accent">
                  <span className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">Next <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" /></span>
                  <span className="mt-1 block font-medium">{next.title}</span>
                </Link>
              )}
            </nav>
          </article>

          <aside className="hidden xl:block" aria-label="Article tools">
            <div className="sticky top-24 space-y-6">
              <Toc headings={toc} />
              <div className="rounded-2xl border bg-card p-4 text-xs leading-relaxed text-muted-foreground">
                <EvidenceBadge level={article.evidenceLevel} />
                <p className="mt-2">{evidence.words}</p>
                <p className="mt-3 border-t pt-3">Educational only. Not medical advice.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
