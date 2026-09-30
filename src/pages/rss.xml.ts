import rss from '@astrojs/rss';
import type {APIContext} from 'astro';
import {getArticles} from '../lib/content';
export async function GET(context:APIContext){return rss({title:'Glucose Atlas — research updates',description:'Sourced diabetes biology and research.',site:context.site!,items:(await getArticles()).map(a=>({title:a.data.title,description:a.data.description,pubDate:a.data.dateModified,link:`/${a.data.slug}`}))});}
