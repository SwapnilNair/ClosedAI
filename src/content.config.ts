import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    topics: z.array(z.string()).min(1),
    series: z.string().optional(),
    seriesOrder: z.number().int().positive().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    image: z.string().optional(),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    status: z.string(),
    summary: z.string(),
    year: z.string(),
    role: z.string(),
    domains: z.array(z.string()).min(1),
    evidence: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().int().default(99),
    externalUrl: z.url().optional(),
  }),
});

export const collections = { blog, work };
