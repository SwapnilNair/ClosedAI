import { getCollection } from 'astro:content';
import { publishedPosts } from '../utils/content';

const escapeXml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

export async function GET({ site }: { site: URL }) {
  const posts = publishedPosts(await getCollection('blog'));
  const items = posts.map((post) => `
    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${new URL(`/blog/${post.id}`, site).href}</link>
      <guid>${new URL(`/blog/${post.id}`, site).href}</guid>
      <pubDate>${post.data.publishedAt.toUTCString()}</pubDate>
      <description>${escapeXml(post.data.description)}</description>
      ${post.data.topics.map((topic) => `<category>${escapeXml(topic)}</category>`).join('')}
    </item>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Swapnil Nair — Writing</title>
      <link>${site.href}</link>
      <description>Field notes on AI security, systems engineering, and product.</description>
      <language>en</language>${items}
    </channel>
  </rss>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
