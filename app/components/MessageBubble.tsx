'use client';

import { Message } from '../data/chatData';
import { useTheme } from '../context/ThemeContext';

interface MessageBubbleProps {
  message: Message;
  isStreaming?: boolean;
}

export default function MessageBubble({ message, isStreaming }: MessageBubbleProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-2 ${isUser ? 'justify-end' : 'items-start'} mb-8`}>
      {/* {!isUser && (
        <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          S
        </div>
      )} */}

      <div className={`max-w-[85%] md:max-w-[90%]`}>
        <div
          className={`
            rounded-2xl px-4 py-3
            ${isUser
              ? isDark ? 'bg-[#D8F4E4] text-black' : 'bg-[#D8F4E4] text-black'
              : isDark ? 'bg-transparent text-white/90' : 'bg-transparent text-gray-800'
            }
          `}
        >
          <div className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
            {isStreaming && (
              <span className={`inline-block w-1.5 h-4 ml-0.5 animate-pulse ${isDark ? 'bg-white/70' : 'bg-gray-700'}`}></span>
            )}
          </div>
        </div>
      </div>

      {/* {isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          U
        </div>
      )} */}
    </div>
  );
}
