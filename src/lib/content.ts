import { getCollection } from 'astro:content';
export const getArticles = async () => (await getCollection('research')).sort((a,b) => a.data.order-b.data.order || a.data.title.localeCompare(b.data.title));
export const formatDate = (date: Date) => new Intl.DateTimeFormat('en-GB', { day:'numeric', month:'short',year:'numeric', timeZone:'UTC' }).format(date);
export const safeJson = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');
