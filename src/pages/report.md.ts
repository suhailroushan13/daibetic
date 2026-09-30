import type {APIRoute} from 'astro';
import {getArticles} from '../lib/content';
import {reportParts} from '../data/report';
import {sources} from '../data/sources';
import {pathways} from '../data/pathways';
import {datasets} from '../data/datasets';
export const GET:APIRoute=async()=>{
 const articles=await getArticles();let output='# Glucose Atlas: the diabetes research report\n\nSource-checked 30 September 2026. AI-assisted educational research; not independently medically reviewed. Not individual medical advice. This is a curated narrative library, not a systematic review.\n\n';
 for(const [i,part] of reportParts.entries()){
  output+=`\n# PART ${i+1} — ${part.title}\n\n`;
  for(const slug of part.slugs){const a=articles.find(x=>x.data.slug===slug);if(!a)continue;
   let body=a.body||'';
   body=body.replace(/^import .*$/gm,'').replace(/<Citation id="([^"]+)"\s*\/>/g,(_,id:string)=>`[${sources[id].organization}, ${sources[id].year}](${sources[id].url})`)
    .replace(/<InteractiveDiagram kind="([^"]+)"\s*\/>/g,(_,kind:string)=>{const p=pathways[kind];return p ? `\n**Conceptual diagram:** ${p.nodes.map(n=>n.title).join(' → ')}\n\n${p.note}\n\n${p.nodes.map(n=>`- **${n.title}:** ${n.detail}`).join('\n')}\n`:'';})
    .replace(/<Chart dataset="([^"]+)"\s*\/>/g,(_,key:string)=>{const d=datasets[key];return d ? `\n**${d.title}**\n\n${d.points.map(p=>`- ${p.label}: ${p.value}${d.unit}`).join('\n')}\n\n${d.limitations}\nSource: ${sources[d.sourceId].url}\n`:'';})
    .replace(/<AnatomyDiagram\s*\/>/g,'\n**Conceptual system:** Food → digestion → intestinal glucose absorption → blood → pancreatic insulin → liver / muscle / fat responses → glucose regulation.\n')
    .replace(/<Timeline[\s\S]*?\/>/g,'\nSee the linked historical timeline in the web edition.\n')
    .replace(/<Quiz question="([^"]+)" answer="([^"]+)"\s*\/>/g,'\n**Check your understanding:** $1\n\n$2\n')
    .replace(/<RiskExplorer[^>]*\/>/g,'\nThe web edition provides an educational signal explorer. It does not calculate individual risk.\n')
    .replace(/<Callout[^>]*title="([^"]+)"[^>]*>/g,'\n**$1**\n')
    .replace(/<Warning[^>]*>/g,'\n**Clinical safety context:** ')
    .replace(/<Definition term="([^"]+)">/g,'**$1** — ')
    .replace(/<[^>]+>/g,'');
   output+=`\n## ${a.data.title}\n\n${a.data.description}\n\n${body}\n\n`;
  }
 }
 output+='\n# Bibliography\n\n'+Object.values(sources).map(s=>`- [${s.title}](${s.url}). ${s.organization}, ${s.year}. ${s.type}; evidence: ${s.evidence}. ${s.sampleSize||''} ${s.population||''} Limitations: ${s.limitations}`).join('\n');
 output+='\n\n**What we know, what we strongly suspect, what we don\'t know yet, and what scientists are trying to solve next.**\n';
 return new Response(output,{headers:{'Content-Type':'text/markdown; charset=utf-8'}});
};
