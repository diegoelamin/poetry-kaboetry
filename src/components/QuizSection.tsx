import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, ArrowRight } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { RadioOption } from './ui/RadioOption';
import { QuizProgress } from './ui/QuizProgress';
import { Glossary } from './Glossary';
import { Tooltip } from './ui/Tooltip';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { useGlossary } from '../hooks/useGlossary';
import type { Question, Level } from '../types';

interface QuizSectionProps {
  questions: Question[];
  userAnswers: Record<string, string>;
  onAnswerSubmit: (questionId: string, answer: string) => void;
  onShowScore: () => void;
  showScore: boolean;
  score: number;
  isComplete: boolean;
  currentLevel: Level;
  onNextLevel: () => void;
  onTryAgain: () => void;
  currentQuestionIndex: number;
  onQuestionChange: (index: number) => void;
}

export function QuizSection({
  questions,
  userAnswers,
  onAnswerSubmit,
  onShowScore,
  showScore,
  score,
  isComplete,
  currentLevel,
  onNextLevel,
  onTryAgain,
  currentQuestionIndex,
  onQuestionChange
}: QuizSectionProps) {
  const [showGlossary, setShowGlossary] = useState(false);
  const { getTermsForQuestion } = useGlossary();
  const currentQuestion = questions[currentQuestionIndex];
  const hasNextQuestion = currentQuestionIndex < questions.length - 1;
  const terms = currentQuestion ? getTermsForQuestion(currentQuestion.id) : [];

  const handleNextQuestion = () => {
    if (hasNextQuestion && userAnswers[currentQuestion.id]) {
      onQuestionChange(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      onQuestionChange(currentQuestionIndex - 1);
    }
  };

  useKeyboardNavigation({
    onNext: handleNextQuestion,
    onPrevious: handlePreviousQuestion,
    onSubmit: !hasNextQuestion ? onShowScore : undefined,
    isEnabled: !showScore && !showGlossary
  });

  if (showScore) {
    return (
      <GlassCard>
        <div className="text-center">
          <h3 className="text-2xl font-light text-gray-800 dark:text-gray-100 mb-6">
            Your Score: {score}%
          </h3>
          {score >= 80 ? (
            <>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Congratulations! You've mastered this level.
              </p>
              <button
                onClick={onNextLevel}
                className="inline-flex items-center px-6 py-3 bg-coral dark:bg-sand text-white dark:text-ink rounded-full hover:bg-coral/90 dark:hover:bg-sand/90 transition-colors"
              >
                Next Level
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </>
          ) : (
            <>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Keep practicing! You need 80% to advance.
              </p>
              <button
                onClick={onTryAgain}
                className="inline-flex items-center px-6 py-3 bg-coral dark:bg-sand text-white dark:text-ink rounded-full hover:bg-coral/90 dark:hover:bg-sand/90 transition-colors"
              >
                Try Again
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </>
          )}
        </div>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-light text-gray-800 dark:text-gray-100 text-center">
        Test Your Understanding
      </h3>

      <QuizProgress
        currentQuestion={currentQuestionIndex}
        totalQuestions={questions.length}
        answeredQuestions={Object.keys(userAnswers)}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <GlassCard>
            <div className="flex justify-between items-start mb-6">
              <h4 className="text-lg text-gray-800 dark:text-gray-100">
                {currentQuestion.text}
              </h4>
              {terms.length > 0 && (
                <Tooltip content="View key terms">
                  <button
                    onClick={() => setShowGlossary(true)}
                    className="p-2 text-gray-400 hover:text-coral dark:hover:text-sand transition-colors"
                    aria-label="Show glossary"
                  >
                    <Book className="w-5 h-5" />
                  </button>
                </Tooltip>
              )}
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <RadioOption
                  key={option}
                  name={currentQuestion.id}
                  value={option}
                  checked={userAnswers[currentQuestion.id] === option}
                  onChange={() => onAnswerSubmit(currentQuestion.id, option)}
                  label={option}
                />
              ))}
            </div>

            <div className="mt-8 flex justify-between items-center">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 disabled:opacity-50"
              >
                Previous
              </button>

              {hasNextQuestion ? (
                <button
                  onClick={handleNextQuestion}
                  disabled={!userAnswers[currentQuestion.id]}
                  className="px-6 py-3 bg-coral dark:bg-sand text-white dark:text-ink rounded-full hover:bg-coral/90 dark:hover:bg-sand/90 transition-colors disabled:opacity-50"
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={onShowScore}
                  disabled={!userAnswers[currentQuestion.id]}
                  className="px-6 py-3 bg-coral dark:bg-sand text-white dark:text-ink rounded-full hover:bg-coral/90 dark:hover:bg-sand/90 transition-colors disabled:opacity-50"
                >
                  Show My Score
                </button>
              )}
            </div>
          </GlassCard>
        </motion.div>
      </AnimatePresence>

      {showGlossary && terms.length > 0 && (
        <Glossary terms={terms} onClose={() => setShowGlossary(false)} />
      )}
    </div>
  );
}