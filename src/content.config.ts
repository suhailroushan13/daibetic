import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { evidenceLevels } from './data/evidence';
import { sources } from './data/sources';
import { categories } from './data/navigation';

const research = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/research' }),
  schema: z.object({
    title: z.string().min(5), description: z.string().min(40).max(220),
    category: z.string().refine(v => categories.some(c => c.key === v), 'Unknown category'),
    subcategory: z.string().min(1), slug: z.string().regex(/^[a-z0-9-]+\/[a-z0-9-]+$/),
    datePublished: z.coerce.date(), dateModified: z.coerce.date(), reviewedDate: z.coerce.date(),
    author: z.string().min(1), tags: z.array(z.string()).min(1),
    difficulty: z.enum(['Beginner','Intermediate','Advanced']),
    readingTime: z.number().int().positive(), evidenceLevel: z.enum(evidenceLevels),
    featured: z.boolean().default(false), relatedTopics: z.array(z.string()).min(1),
    sources: z.array(z.string().refine(id => Boolean(sources[id]), 'Unknown source ID')).min(1),
    order: z.number().default(100),
    clinicalReview: z.literal('Not independently medically reviewed'),
  }).refine(d => d.dateModified >= d.datePublished, 'Modified date cannot precede publication'),
});
export const collections = { research };
