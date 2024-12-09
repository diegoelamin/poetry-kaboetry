import React from 'react';

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  answeredQuestions: string[];
}

export function QuizProgress({ currentQuestion, totalQuestions, answeredQuestions }: QuizProgressProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          Question {currentQuestion + 1} of {totalQuestions}
        </span>
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {Math.round((answeredQuestions.length / totalQuestions) * 100)}% Complete
        </span>
      </div>
      <div className="h-2 bg-sand/20 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-coral dark:bg-sand transition-all duration-300 ease-out rounded-full"
          style={{ 
            width: `${(answeredQuestions.length / totalQuestions) * 100}%`
          }}
        />
      </div>
    </div>
  );
}