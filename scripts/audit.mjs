// Content audit. Run against a running production server:  npm run build && npm start &  npm run audit:content
import { writeFile, mkdir } from 'node:fs/promises';

const base = process.env.AUDIT_BASE_URL || 'http://localhost:3000';
const errors = [];
const warnings = [];
const get = async (path) => {
  const r = await fetch(base + path);
  if (!r.ok) throw new Error(`${path} -> ${r.status}`);
  return r;
};

const meta = await (await get('/content-audit.json')).json();
const now = new Date(process.env.AUDIT_DATE || Date.now());
const routes = new Set(meta.articles.map((a) => a.route));
const titles = new Map();

for (const a of meta.articles) {
  const html = await (await get(a.route)).text();
  const fail = (m) => errors.push(`${a.route}: ${m}`);
  const title = /<title>([^<]*)<\/title>/.exec(html)?.[1];
  if (!title) fail('Missing title');
  else if (titles.has(title)) fail(`Duplicate title: ${title}`);
  titles.set(title, a.route);
  if (!/<meta name="description" content="[^"]+"/.test(html)) fail('Missing meta description');
  if ((html.match(/<h1[\s>]/g) || []).length !== 1) fail('Expected exactly one H1');
  if (!/rel="canonical"/.test(html)) fail('Missing canonical link');
  if (!/In simple words/.test(html)) fail('Missing plain-language explainer');
  if (!/For example:/.test(html)) fail('Missing example');
  if (!/data-citation=/.test(html)) fail('No inline citations');
  for (const id of new Set([...html.matchAll(/data-citation="([^"]+)"/g)].map((m) => m[1]))) {
    if (!html.includes(`id="source-${id}"`)) fail(`Citation missing from bibliography: ${id}`);
  }
  for (const r of a.relatedTopics) if (!routes.has('/' + r)) fail(`Unknown related topic: ${r}`);
  if (new Date(a.reviewedDate) > now) fail('Future review date');
  if ((now - new Date(a.reviewedDate)) / 86400000 > 365) warnings.push(`${a.route}: source check older than one year`);
}
for (const s of meta.sources) {
  if (!s.limitations || !s.url) errors.push(`Source ${s.id}: missing limitations or URL`);
  if (now.getUTCFullYear() - s.year > 5) warnings.push(`${s.id} (${s.year}): older source; check whether newer evidence changes the claim.`);
}

const report = {
  checkedAt: now.toISOString(),
  articles: meta.articles.length,
  sources: meta.sources.length,
  errors,
  warnings,
  limits: 'Automated checks do not verify medical truth, source-link availability, or completeness. Independent clinical review remains required.',
};
await mkdir('02-research', { recursive: true });
await writeFile('02-research/content-quality-report.json', JSON.stringify(report, null, 2));
console.log(`Audited ${report.articles} articles and ${report.sources} sources: ${errors.length} errors, ${warnings.length} freshness flags.`);
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
