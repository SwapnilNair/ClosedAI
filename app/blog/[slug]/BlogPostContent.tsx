'use client';

import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { useTheme } from '../../context/ThemeContext';
import { conversations } from '../../data/chatData';
import Link from 'next/link';

interface BlogPostContentProps {
  children: React.ReactNode;
  title: string;
  date: string;
}

export default function BlogPostContent({ children, title, date }: BlogPostContentProps) {
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

      <div className={`flex-1 flex flex-col min-h-0 ${isDark ? 'bg-[#212121]' : 'bg-white'}`}>
        {/* Mobile Menu Button */}
        <div className={`lg:hidden border-b px-4 py-3 flex-shrink-0 ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
          <button
            onClick={toggleSidebar}
            className={isDark ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Blog Post Content */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="max-w-3xl mx-auto px-4 py-12">
            {/* Back to Blog Link */}
            <Link
              href="/blog"
              className={`inline-flex items-center gap-2 mb-8 text-sm transition-colors ${isDark ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>

            {/* Post Title */}
            <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {title}
            </h1>

            {/* Post Date */}
            <p className={`text-sm mb-8 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {date}
            </p>

            {/* Post Content */}
            <article className={`prose max-w-none ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>
              {children}
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
