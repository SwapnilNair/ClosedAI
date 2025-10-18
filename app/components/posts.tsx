'use client';

import Link from 'next/link'
import { useTheme } from '../context/ThemeContext'

interface BlogPost {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary?: string;
  };
}

interface BlogPostsProps {
  posts: BlogPost[];
}

export function BlogPosts({ posts }: BlogPostsProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className={`block p-6 rounded-xl transition-all duration-200 border ${
            isDark
              ? 'bg-[#2f2f2f] hover:bg-[#3a3a3a] border-white/10'
              : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <h3 className={`text-lg font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {post.metadata.title}
            </h3>
            <time className={`text-sm tabular-nums flex-shrink-0 ${
              isDark ? 'text-white/60' : 'text-gray-600'
            }`}>
              {new Date(post.metadata.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </time>
          </div>
          {post.metadata.summary && (
            <p className={`mt-2 text-sm ${
              isDark ? 'text-white/70' : 'text-gray-700'
            }`}>
              {post.metadata.summary}
            </p>
          )}
        </Link>
      ))}
    </div>
  )
}
