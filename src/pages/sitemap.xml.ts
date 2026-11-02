import { getCollection } from 'astro:content';
import { publishedPosts } from '../utils/content';

export async function GET({ site }: { site: URL }) {
  const posts = publishedPosts(await getCollection('blog'));
  const work = await getCollection('work');
  const topics = [...new Set(posts.flatMap((post) => post.data.topics))];
  const paths = [
    '/', '/about', '/work', '/blog', '/resume', '/uses',
    ...posts.map((post) => `/blog/${post.id}`),
    ...work.map((item) => `/work/${item.data.slug}`),
    ...topics.map((topic) => `/blog/topics/${topic.toLowerCase().replaceAll(' ', '-')}`),
  ];
  const urls = paths.map((path) => `<url><loc>${new URL(path, site).href}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
