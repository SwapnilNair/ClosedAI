'use client';

import { useTheme } from '../context/ThemeContext';

interface SuggestedQuestionsProps {
  questions: string[];
  onQuestionClick: (question: string) => void;
}

export default function SuggestedQuestions({
  questions,
  onQuestionClick
}: SuggestedQuestionsProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {questions.map((question, index) => (
        <button
          key={index}
          onClick={() => onQuestionClick(question)}
          className={`px-3 py-1.5 rounded-full border text-sm transition-colors ${
            isDark
              ? 'border-white/20 text-white/80 hover:bg-white/10'
              : 'border-gray-300 text-gray-700 hover:bg-gray-100'
          }`}
        >
          {question}
        </button>
      ))}
    </div>
  );
}
