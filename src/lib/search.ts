export interface SearchItem {
  url: string;
  title: string;
  description: string;
  category: string;
  kind: 'Article' | 'Glossary';
  /** Extra searchable words (plain-language summary, tags, examples). */
  text: string;
  meta?: string;
}

const norm = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '');

export function searchItems(items: SearchItem[], query: string, category?: string, limit = 30): SearchItem[] {
  const tokens = norm(query).split(/[^a-z0-9]+/).filter(Boolean);
  if (!tokens.length) return [];
  const scored: { item: SearchItem; score: number }[] = [];
  for (const item of items) {
    if (category && item.category !== category) continue;
    const title = norm(item.title);
    const desc = norm(item.description);
    const text = norm(item.text);
    let score = 0;
    let ok = true;
    for (const t of tokens) {
      let s = 0;
      if (title.startsWith(t)) s += 14;
      else if (title.includes(t)) s += 10;
      if (desc.includes(t)) s += 4;
      if (text.includes(t)) s += 1.5;
      if (!s) { ok = false; break; }
      score += s;
    }
    if (ok) scored.push({ item, score: score + (item.kind === 'Article' ? 0.5 : 0) });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, limit).map((s) => s.item);
}

/** Split text into plain and highlighted pieces for safe rendering (no innerHTML). */
export function highlight(text: string, query: string): { text: string; hit: boolean }[] {
  const tokens = [...new Set(query.toLowerCase().split(/[^a-z0-9]+/).filter((t) => t.length > 1))];
  if (!tokens.length) return [{ text, hit: false }];
  const re = new RegExp(`(${tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  // With one capture group, split() puts every match at an odd index.
  return text.split(re).map((part, i) => ({ text: part, hit: i % 2 === 1 })).filter((p) => p.text);
}

let cache: Promise<SearchItem[]> | undefined;
export function loadSearchIndex(): Promise<SearchItem[]> {
  return (cache ??= fetch('/search-index.json')
    .then((r) => { if (!r.ok) throw new Error('index'); return r.json() as Promise<SearchItem[]>; })
    .catch((e) => { cache = undefined; throw e; }));
}
