'use client';

import { useTheme } from '../context/ThemeContext';

export default function TypingIndicator() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="flex gap-2 items-start">
      <div className="w-8 h-8 rounded-sm bg-black flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
        S
      </div>
      <div className={`rounded-2xl px-4 py-3 mt-1 ${isDark ? 'bg-[#2f2f2f]' : 'bg-gray-200'}`}>
        <div className="flex gap-1">
          <div className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-white/60' : 'bg-gray-600'}`} style={{ animationDelay: '0ms' }}></div>
          <div className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-white/60' : 'bg-gray-600'}`} style={{ animationDelay: '150ms' }}></div>
          <div className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-white/60' : 'bg-gray-600'}`} style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
