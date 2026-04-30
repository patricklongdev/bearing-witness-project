import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number(),
    author: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
    year: z.coerce.string().optional(),
    excerpt: z.string().optional(),
    thumbnail: z.string().optional(),
    pdf: z.string().optional(),
    projectLink: z.string().optional(),
  }),
});

export const collections = { projects };
