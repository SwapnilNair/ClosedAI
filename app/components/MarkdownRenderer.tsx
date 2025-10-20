'use client';

import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface MarkdownRendererProps {
  content: string;
  isUser?: boolean;
}

export default function MarkdownRenderer({ content, isUser }: MarkdownRendererProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const renderContent = (text: string) => {
    // Split by lines to handle line breaks properly
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];

    lines.forEach((line, lineIndex) => {
      // Check if it's a bullet point line
      const isBulletPoint = line.trim().startsWith('•') || line.trim().startsWith('-');

      if (isBulletPoint) {
        // Parse inline markdown within the bullet point
        const bulletContent = line.replace(/^[•\-]\s*/, '');
        elements.push(
          <div key={lineIndex} className="flex gap-2 mb-1">
            <span className="flex-shrink-0">•</span>
            <span>{parseInlineMarkdown(bulletContent)}</span>
          </div>
        );
      } else if (line.trim() === '') {
        // Empty line - add spacing
        elements.push(<div key={lineIndex} className="h-2"></div>);
      } else {
        // Regular line
        elements.push(
          <div key={lineIndex} className="mb-1">
            {parseInlineMarkdown(line)}
          </div>
        );
      }
    });

    return elements;
  };

  const parseInlineMarkdown = (text: string) => {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    // Regex to match **bold** text and links [text](url)
    const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      const matchedText = match[0];

      // Check if it's bold
      if (matchedText.startsWith('**') && matchedText.endsWith('**')) {
        const boldText = matchedText.slice(2, -2);
        parts.push(
          <strong key={match.index} className="font-semibold">
            {boldText}
          </strong>
        );
      }
      // Check if it's a link
      else if (matchedText.startsWith('[')) {
        const linkMatch = matchedText.match(/\[(.*?)\]\((.*?)\)/);
        if (linkMatch) {
          const [, linkText, url] = linkMatch;
          parts.push(
            <a
              key={match.index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`underline ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
            >
              {linkText}
            </a>
          );
        }
      }

      lastIndex = match.index + matchedText.length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div className="text-[15px] leading-relaxed">
      {renderContent(content)}
    </div>
  );
}
