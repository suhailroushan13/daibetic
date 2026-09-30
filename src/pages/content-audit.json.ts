import type {APIRoute} from 'astro';
import {getArticles} from '../lib/content';
import {sourceList} from '../data/sources';
export const GET:APIRoute=async()=>new Response(JSON.stringify({articles:(await getArticles()).map(a=>a.data),sources:sourceList}),{headers:{'Content-Type':'application/json'}});
