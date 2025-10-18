'use client';

import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import { ThemeProvider } from './context/ThemeContext';
import {
  Message,
  conversations,
  qaPairs,
  suggestedQuestions,
  findBestMatch,
  fallbackResponse
} from './data/chatData';

function ChatApp() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);

  // Function to stream text character by character
  const streamText = async (text: string, messageId: string) => {
    setIsTyping(true);
    setStreamingMessageId(messageId);

    // Add empty assistant message
    const assistantMessage: Message = {
      id: messageId,
      role: 'assistant',
      content: '',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, assistantMessage]);

    // Stream character by character
    for (let i = 0; i <= text.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 20)); // Typing speed
      setMessages(prev => prev.map(msg =>
        msg.id === messageId
          ? { ...msg, content: text.slice(0, i) }
          : msg
      ));
    }

    setIsTyping(false);
    setStreamingMessageId(null);
  };

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Show typing indicator briefly
    await new Promise(resolve => setTimeout(resolve, 500));

    // Find matching response
    const match = findBestMatch(content);
    const response = match ? match.answer : fallbackResponse;

    // Stream the response
    await streamText(response, `assistant-${Date.now()}`);
  };

  const handleConversationSelect = (id: string) => {
    const conversation = conversations.find(c => c.id === id);
    if (conversation) {
      setActiveConversationId(id);
      setMessages(conversation.messages);
      setIsTyping(false);
      setStreamingMessageId(null);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setActiveConversationId(null);
    setIsTyping(false);
    setStreamingMessageId(null);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
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
      <ChatArea
        messages={messages}
        onSendMessage={handleSendMessage}
        isTyping={isTyping}
        suggestedQuestions={suggestedQuestions}
        onToggleSidebar={toggleSidebar}
      />
    </div>
  );
}

export default function Page() {
  return (
    <ThemeProvider>
      <ChatApp />
    </ThemeProvider>
  );
}
