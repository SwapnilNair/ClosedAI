'use client';

import { useState, useRef, useEffect } from 'react';
import { Message } from '../data/chatData';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import SuggestedQuestions from './SuggestedQuestions';
import ContactHeader from './ContactHeader';
import { useTheme } from '../context/ThemeContext';

interface ChatAreaProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  isTyping: boolean;
  suggestedQuestions: string[];
  onToggleSidebar: () => void;
}

export default function ChatArea({
  messages,
  onSendMessage,
  isTyping,
  suggestedQuestions,
  onToggleSidebar
}: ChatAreaProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isTyping) {
      onSendMessage(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
  };

  const handleSuggestedQuestion = (question: string) => {
    if (!isTyping) {
      onSendMessage(question);
    }
  };

  return (
    <div className={`flex-1 flex flex-col overflow-hidden ${isDark ? 'bg-[#212121]' : 'bg-white'}`}>
      {/* Contact Header */}
      <ContactHeader />

      {/* Mobile Menu Button */}
      <div className={`lg:hidden border-b px-4 py-3 ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
        <button
          onClick={onToggleSidebar}
          className={isDark ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
              {/* <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-bold text-2xl mb-6">
                S
              </div> */}
              <h1 className={`text-3xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Hi! I'm Swapnil Nair.
              </h1>
              <div className={`text-lg mb-8 max-w-md ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                Engineer, Quizzer and evidently a Comedian <div></div>Try one of these questions:
              </div>
              <SuggestedQuestions
                questions={suggestedQuestions}
                onQuestionClick={handleSuggestedQuestion}
              />
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div>
        <div className="max-w-3xl mx-auto px-4 py-4">
          {messages.length > 0 && !isTyping && (
            <div className="mb-3">
              <SuggestedQuestions
                questions={suggestedQuestions.slice(0, 3)}
                onQuestionClick={handleSuggestedQuestion}
              />
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className={`relative rounded-2xl transition-colors ${isDark
              ? 'bg-[#303030]'
              : 'bg-gray-50'
              }`}>
              {/* Plus button on the left */}
              <button
                type="button"
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'
                  }`}
                title="Add attachment"
              >
                <svg className={`w-5 h-5 ${isDark ? 'text-white' : 'text-black'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>

              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything ... "
                rows={1}
                disabled={isTyping}
                className={`w-full bg-transparent pl-12 pr-12 py-4 resize-none outline-none focus:outline-none border-none max-h-[200px] overflow-y-auto ${isDark ? 'text-white placeholder-white/40' : 'text-gray-900 placeholder-gray-400'
                  }`}
                style={{ minHeight: '48px' }}
              />

              {/* Send button on the right with light green */}
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className={`absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-colors
                  ${input.trim() && !isTyping
                    ? 'bg-green-400 text-black hover:bg-green-500'
                    : isDark
                      ? 'bg-white/10 text-white/40 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>
          </form>
          <div className={`text-center text-xs mt-3 ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
            Dear Sam Altman, please don't sue me.
          </div>
        </div>
      </div>
    </div>
  );
}
