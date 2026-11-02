import type { CollectionEntry } from 'astro:content';

export function formatDate(date: Date, compact = false) {
  return date.toLocaleDateString('en-GB', compact
    ? { day: '2-digit', month: 'short', year: 'numeric' }
    : { day: 'numeric', month: 'long', year: 'numeric' });
}

export function readingTime(body = '') {
  const plain = body.replace(/<[^>]+>|[#*_`>\[\](){}-]/g, ' ');
  const words = plain.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

export function publishedPosts(posts: CollectionEntry<'blog'>[]) {
  return posts
    .filter((post) => import.meta.env.DEV || !post.data.draft)
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
}
