'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../context/ThemeContext';
import { conversations } from '../data/chatData';
import { BlogPosts } from '../components/posts';

interface BlogPost {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary?: string;
  };
}

interface BlogPageContentProps {
  posts: BlogPost[];
}

export default function BlogPageContent({ posts }: BlogPageContentProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleConversationSelect = (id: string) => {
    // Navigate to home with the conversation
    window.location.href = `/`;
  };

  const handleNewChat = () => {
    window.location.href = `/`;
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onConversationSelect={handleConversationSelect}
        onNewChat={handleNewChat}
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebarCollapse}
      />

      <div className={`flex-1 flex flex-col overflow-hidden ${isDark ? 'bg-[#212121]' : 'bg-white'}`}>
        {/* Mobile Menu Button */}
        <div className={`lg:hidden border-b px-4 py-3 ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
          <button
            onClick={toggleSidebar}
            className={isDark ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Blog Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 py-12">
            <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              The Blog
            </h1>
            <p className={`text-lg mb-12 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
              Some of my thoughts, ideas, and stories.
              In a world of AI generated content, I want this to be my space to express myself without filters and processing.
            </p>

            <div className="space-y-6">
              <BlogPosts posts={posts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
