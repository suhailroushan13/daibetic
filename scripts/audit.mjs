import {readFile,writeFile,readdir,stat} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import {load} from 'cheerio';
const root=resolve('dist');const errors=[];const warnings=[];const pages=new Map();const titles=new Map();const inbound=new Map();
async function walk(dir){const files=await readdir(dir,{withFileTypes:true});return (await Promise.all(files.map(f=>f.isDirectory()?walk(join(dir,f.name)):[join(dir,f.name)]))).flat();}
const files=await walk(root);
for(const file of files.filter(f=>f.endsWith('.html')&&!f.includes('/pagefind/'))){const $=load(await readFile(file,'utf8'));const route='/'+file.slice(root.length+1).replace(/index\.html$/,'').replace(/\.html$/,'').replace(/\/$/,'');pages.set(route||'/',{$,file});}
function fail(route,message){errors.push(`${route}: ${message}`);}
for(const [route,{$}] of pages){
 const title=$('title').text();if(!title)fail(route,'Missing title');else if(titles.has(title))fail(route,`Duplicate title: ${title}`);titles.set(title,route);
 if(!$('meta[name="description"]').attr('content'))fail(route,'Missing meta description');
 if($('h1').length!==1)fail(route,'Expected exactly one H1');
 const canonical=$('link[rel="canonical"]').attr('href');try{const u=new URL(canonical);if(!['http:','https:'].includes(u.protocol)||u.search||u.hash)fail(route,'Invalid canonical URL');if(process.env.SITE_URL&&u.origin!==new URL(process.env.SITE_URL).origin)fail(route,'Wrong canonical origin');}catch{fail(route,'Invalid or missing canonical URL');}
 $('img').each((_,img)=>{if($(img).attr('alt')===undefined)fail(route,'Image missing alt attribute');});
 for(const node of $('a[href],img[src],script[src],link[rel="stylesheet"],meta[property="og:image"]').toArray()){
   const raw=$(node).attr('href')||$(node).attr('src')||$(node).attr('content');if(!raw||raw.startsWith('mailto:')||raw.startsWith('data:'))continue;
   const origin=new URL(canonical).origin;const u=new URL(raw,`${origin}${route==='/'?'/':route}`);if(u.origin!==origin)continue;
   const target=u.pathname.replace(/\/$/,'')||'/';const page=pages.get(target);
   if(page){if(route!==target){if(!inbound.has(target))inbound.set(target,new Set());inbound.get(target).add(route);}if(u.hash&&!page.$(`[id="${decodeURIComponent(u.hash.slice(1)).replace(/"/g,'\\"')}"]`).length)fail(route,`Broken anchor: ${raw}`);}
   else {try{await stat(join(root,decodeURIComponent(u.pathname)));}catch{fail(route,`Missing internal resource: ${raw}`);}}
 }
 $('script[type="application/ld+json"]').each((_,el)=>{try{JSON.parse($(el).text());}catch{fail(route,'Invalid JSON-LD');}});
 const refs=new Set($('[id^="source-"]').toArray().map(el=>$(el).attr('id')?.slice(7)));
 $('[data-citation]').each((_,el)=>{const id=$(el).attr('data-citation');if(!refs.has(id))fail(route,`Citation missing from bibliography: ${id}`);});
}
const metadata=JSON.parse(await readFile(join(root,'content-audit.json'),'utf8'));const slugs=new Set();const now=new Date(process.env.AUDIT_DATE||new Date().toISOString());
for(const a of metadata.articles){const route='/'+a.slug;if(slugs.has(a.slug))fail(route,'Duplicate article slug');slugs.add(a.slug);if(!a.sources.length)fail(route,'No sources');const $=pages.get(route)?.$;if(!$)fail(route,'Missing rendered article');else if(!$('[data-citation]').length)fail(route,'No inline claim citations');if(!inbound.has(route))fail(route,'Orphan article');if(new Date(a.reviewedDate)>now)fail(route,'Future review date');if((now-new Date(a.reviewedDate))/86400000>365)warnings.push(`${route}: source check older than one year`);for(const related of a.relatedTopics){if(!pages.has('/'+related))fail(route,`Unknown related topic: ${related}`);}}
for(const s of metadata.sources){if(!s.limitations||!s.url)errors.push(`Source ${s.id}: missing limitations or URL`);if(now.getUTCFullYear()-s.year>5)warnings.push(`${s.id} (${s.year}): older source; check whether newer evidence changes the claim. Foundational studies may remain appropriate.`);}
const report={checkedAt:now.toISOString(),pages:pages.size,articles:metadata.articles.length,sources:metadata.sources.length,errors,warnings,limits:'Automated checks do not verify medical truth, source-link availability, or completeness. Independent clinical review remains required.'};
await writeFile('02-research/content-quality-report.json',JSON.stringify(report,null,2));
console.log(`Audited ${report.pages} HTML pages, ${report.articles} articles and ${report.sources} sources.`);console.log(`${errors.length} errors; ${warnings.length} editorial freshness flags.`);
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
