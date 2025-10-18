import { getBlogPosts } from './utils';
import BlogPageContent from './BlogPageContent';
import { ThemeProvider } from '../context/ThemeContext';

export default function BlogPage() {
  // Fetch posts at build time (static generation)
  const posts = getBlogPosts().sort((a, b) =>
    new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
  );

  return (
    <ThemeProvider>
      <BlogPageContent posts={posts} />
    </ThemeProvider>
  );
}
