interface SearchData { url: string; excerpt: string; meta: Record<string,string>; }
interface Pagefind { search(query: string, options?: { filters?: Record<string,string> }): Promise<{results: {data(): Promise<SearchData>}[]}>; }
let engine: Promise<Pagefind> | undefined;
const pagefindPath = '/pagefind/pagefind.js';
const loadSearch = ():Promise<Pagefind> => engine ||= import(/* @vite-ignore */ pagefindPath).then(module=>module as Pagefind).catch(error=>{engine=undefined;throw error;});
export function initializeSearch(inputId:string, resultsId:string, statusId:string, filterId?:string) {
  const input=document.getElementById(inputId) as HTMLInputElement | null;
  const results=document.getElementById(resultsId);
  const status=document.getElementById(statusId);
  const filter=filterId ? document.getElementById(filterId) as HTMLSelectElement : null;
  if(!input || !results || !status)return;
  let request=0;
  let timer:ReturnType<typeof setTimeout>;
  async function search() {
    const current=++request;
    const query=input!.value.trim();
    if(!query){results!.replaceChildren();status!.textContent='Search concepts, biology, therapies, and sources.';return;}
    status!.textContent='Searching the library…';
    try{
      const pagefind=await loadSearch();
      const response=await pagefind.search(query,filter?.value ? {filters:{category:filter.value}} : undefined);
      const data=await Promise.all(response.results.slice(0,30).map(result=>result.data()));
      if(current!==request)return;
      results!.replaceChildren();
      status!.textContent=response.results.length ? `${response.results.length} results · ordered by relevance` : 'No matching topics. Try a broader term, such as “insulin” or “glucose”.';
      const groups=new Map<string,SearchData[]>();
      data.forEach(item=>{const cat=item.meta.category || 'Library';if(!groups.has(cat))groups.set(cat,[]);groups.get(cat)!.push(item);});
      groups.forEach((items,category)=>{
        const heading=document.createElement('h3');heading.textContent=category;results!.append(heading);
        items.forEach(item=>{
          const a=document.createElement('a');a.href=item.url;a.className='search-result';
          const title=document.createElement('strong');title.textContent=item.meta.title;
          const meta=document.createElement('small');meta.textContent=[item.meta.difficulty,item.meta.evidence].filter(Boolean).join(' · ');
          const excerpt=document.createElement('p');
          const parsed=new DOMParser().parseFromString(item.excerpt,'text/html');
          function appendSafe(node:Node,parent:Node){node.childNodes.forEach(child=>{if(child.nodeType===Node.TEXT_NODE)parent.appendChild(document.createTextNode(child.textContent||''));else if(child instanceof Element && child.tagName==='MARK'){const mark=document.createElement('mark');mark.textContent=child.textContent;parent.appendChild(mark);}else appendSafe(child,parent);});}
          appendSafe(parsed.body,excerpt);
          a.append(title,meta,excerpt);results!.append(a);
        });
      });
    }catch{if(current===request){status!.textContent='Search index is unavailable. Browse the topic library below, or build the site to generate the local index.';results!.replaceChildren();const link=document.createElement('a');link.href='/research';link.textContent='Browse all research topics →';results!.append(link);}}
  }
  input.addEventListener('input',()=>{request++;clearTimeout(timer);timer=setTimeout(search,130);});
  filter?.addEventListener('change',search);
  const form=input.closest('form');form?.addEventListener('submit',e=>{e.preventDefault();void search();});
  (input.closest('dialog') || input.closest('section'))?.addEventListener('keydown',((event:KeyboardEvent)=>{
    if(!['ArrowDown','ArrowUp'].includes(event.key))return;
    const links=Array.from(results.querySelectorAll<HTMLAnchorElement>('a.search-result'));
    if(!links.length)return;
    event.preventDefault();const index=links.indexOf(document.activeElement as HTMLAnchorElement);
    const next=event.key==='ArrowDown' ? (index+1)%links.length : (index<=0 ? links.length-1:index-1);links[next].focus();
  }) as EventListener);
  if(input.value)void search();
}
