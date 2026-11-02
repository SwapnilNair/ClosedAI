import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
  console.error('Usage: npm run new:post -- "Article title"');
  process.exit(1);
}

const slug = title.toLowerCase().normalize('NFKD').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-');
if (!slug) {
  console.error('The title must contain at least one letter or number.');
  process.exit(1);
}

const directory = resolve('src/content/blog');
const target = resolve(directory, `${slug}.mdx`);
if (existsSync(target)) {
  console.error(`Post already exists: ${target}`);
  process.exit(1);
}

mkdirSync(directory, { recursive: true });
const today = new Date().toISOString().slice(0, 10);
const body = `---
title: "${title.replaceAll('"', '\\"')}"
description: "Add a concise description for feeds and social previews."
publishedAt: ${today}
topics: ["Systems"]
featured: false
draft: true
---

Open with the claim or observation that makes this worth reading.

## Context

What changed, and why does it matter?

## The hard part

Describe the constraint, failure mode, or tradeoff.

## What I now think

State the conclusion and the evidence behind it.
`;

writeFileSync(target, body, 'utf8');
console.log(`Created ${target}`);
