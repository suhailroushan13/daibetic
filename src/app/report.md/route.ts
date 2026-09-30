import { getArticle } from '@/lib/content';
import { reportParts } from '@/data/report';
import { sources } from '@/data/sources';
import { pathways } from '@/data/pathways';
import { datasets } from '@/data/datasets';

export const dynamic = 'force-static';

function toMarkdown(body: string) {
  return body
    .replace(/^import .*$/gm, '')
    .replace(/<Citation id="([^"]+)"\s*\/>/g, (_, id: string) => `[${sources[id].organization}, ${sources[id].year}](${sources[id].url})`)
    .replace(/<InteractiveDiagram kind="([^"]+)"\s*\/>/g, (_, kind: string) => {
      const p = pathways[kind];
      return p ? `\n**Conceptual diagram:** ${p.nodes.map((n) => n.title).join(' → ')}\n\n${p.note}\n\n${p.nodes.map((n) => `- **${n.title}:** ${n.detail}`).join('\n')}\n` : '';
    })
    .replace(/<Chart dataset="([^"]+)"\s*\/>/g, (_, key: string) => {
      const d = datasets[key];
      return d ? `\n**${d.title}**\n\n${d.points.map((p) => `- ${p.label}: ${p.value}${d.unit}`).join('\n')}\n\n${d.limitations}\nSource: ${sources[d.sourceId].url}\n` : '';
    })
    .replace(/<AnatomyDiagram\s*\/>/g, '\n**Conceptual system:** Food → digestion → intestinal glucose absorption → blood → pancreatic insulin → liver / muscle / fat responses → glucose regulation.\n')
    .replace(/<Timeline[\s\S]*?\/>/g, '\nSee the historical timeline in the web edition.\n')
    .replace(/<Quiz question="([^"]+)" answer="([^"]+)"\s*\/>/g, '\n**Check your understanding:** $1\n\n$2\n')
    .replace(/<RiskExplorer[^>]*\/>/g, '\nThe web edition provides an educational signal explorer. It does not calculate individual risk.\n')
    .replace(/<Callout[^>]*title="([^"]+)"[^>]*>/g, '\n**$1**\n')
    .replace(/<Warning[^>]*>/g, '\n**Clinical safety context:** ')
    .replace(/<Definition term="([^"]+)">/g, '**$1** — ')
    .replace(/<[^>]+>/g, '');
}

export function GET() {
  let out = '# The Diabetes Guide: the full research report\n\nSource-checked 30 September 2026. AI-assisted educational research; not independently medically reviewed. Not individual medical advice. This is a curated narrative library, not a systematic review.\n\n';
  reportParts.forEach((part, i) => {
    out += `\n# PART ${i + 1} — ${part.title}\n\n`;
    for (const slug of part.slugs) {
      const a = getArticle(slug);
      if (!a) continue;
      const simple = `**In simple words:** ${a.simple.tldr}\n\n${a.simple.steps.map((s, n) => `${n + 1}. **${s.title}.** ${s.text} *For example: ${s.example}*`).join('\n')}\n\n**Remember:** ${a.simple.remember}`;
      out += `\n## ${a.title}\n\n${a.description}\n\n${simple}\n\n${toMarkdown(a.body)}\n\n`;
    }
  });
  out += '\n# Bibliography\n\n' + Object.values(sources).map((s) => `- [${s.title}](${s.url}). ${s.organization}, ${s.year}. ${s.type}; evidence: ${s.evidence}. ${s.sampleSize || ''} ${s.population || ''} Limitations: ${s.limitations}`).join('\n');
  out += "\n\n**What we know, what we strongly suspect, what we don't know yet, and what scientists are trying to solve next.**\n";
  return new Response(out, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
