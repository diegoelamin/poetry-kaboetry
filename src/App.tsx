import React, { useState, useMemo } from 'react';
import { TopicInput } from './components/TopicInput';
import { PoemDisplay } from './components/PoemDisplay';
import { QuizSection } from './components/QuizSection';
import { ThemeToggle } from './components/ThemeToggle';
import { Sidebar } from './components/Sidebar';
import { CompletionCelebration } from './components/CompletionCelebration';
import { HelpModal } from './components/HelpModal';
import { LoadingState } from './components/ui/LoadingState';
import { useLearningState } from './hooks/useLearningState';
import { useUserStats } from './hooks/useUserStats';
import { Footer } from './components/Footer';
import { Menu, HelpCircle } from 'lucide-react';
import type { Level, Poem } from './types';

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const {
    state,
    handleTopicSubmit,
    handleAnswerSubmit,
    handleShowScore,
    handleNextLevel,
    handleTryAgain,
    handleLevelSelect,
    handleReviewJourney,
    handleQuestionChange
  } = useLearningState();

  const { stats } = useUserStats(state.currentLevel);

  // Create a map of levels to their poems
  const levelPoems = useMemo(() => {
    const poems: Record<Level, Poem | null> = {
      basic: null,
      intermediate: null,
      advanced: null,
      mastery: null
    };

    if (state.currentPoem) {
      poems[state.currentLevel] = state.currentPoem;
    }

    return poems;
  }, [state.currentPoem, state.currentLevel]);

  return (
    <div className="min-h-screen bg-cream dark:bg-ink transition-colors">
      <div className="lg:pl-64">
        <header className="pt-8 pb-4 relative px-4 lg:px-8">
          <div className="flex items-center justify-between mb-4 lg:mb-0">
            <button
              onClick={() => setShowSidebar(true)}
              className="p-2 rounded-full bg-sand dark:bg-ink text-coral dark:text-sand hover:bg-sand/80 dark:hover:bg-gray-800 transition-colors lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowHelpModal(true)}
                className="p-2 rounded-full bg-sand dark:bg-ink text-coral dark:text-sand hover:bg-sand/80 dark:hover:bg-gray-800 transition-colors"
                aria-label="How to use Kaboetry"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
              <ThemeToggle />
            </div>
          </div>
          <h1 className="text-center font-serif text-2xl md:text-3xl text-coral dark:text-sand">
            Kaboetry
          </h1>
        </header>

        <Sidebar
          currentLevel={state.currentLevel}
          completedLevels={state.completedLevels}
          inProgressLevels={state.inProgressLevels}
          masteryUnlocked={state.masteryUnlocked}
          poems={levelPoems}
          onLevelSelect={handleLevelSelect}
          isOpen={showSidebar}
          onClose={() => setShowSidebar(false)}
        />

        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {state.showCompletion ? (
            <CompletionCelebration 
              justCompletedSubject={state.currentTopic}
              onReviewJourney={handleReviewJourney}
              onTopicSelect={handleTopicSubmit}
            />
          ) : (
            <>
              <div className="text-center mb-8 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-serif font-light text-ink dark:text-cream mb-6 md:mb-8">
                  What would you like to learn today?
                </h2>
                <TopicInput onSubmit={handleTopicSubmit} />
              </div>
              
              {state.isLoading ? (
                <LoadingState />
              ) : state.error ? (
                <div className="text-center text-coral dark:text-sand">
                  {state.error.message}
                </div>
              ) : state.currentPoem && (
                <div className="space-y-8 md:space-y-12">
                  <PoemDisplay poem={state.currentPoem} />
                  <QuizSection
                    questions={state.currentPoem.questions}
                    userAnswers={state.userAnswers}
                    onAnswerSubmit={handleAnswerSubmit}
                    onShowScore={handleShowScore}
                    showScore={state.showScore}
                    score={state.score}
                    isComplete={state.isComplete}
                    currentLevel={state.currentLevel}
                    onNextLevel={handleNextLevel}
                    onTryAgain={handleTryAgain}
                    currentQuestionIndex={state.currentQuestionIndex}
                    onQuestionChange={handleQuestionChange}
                  />
                </div>
              )}
            </>
          )}
        </main>
        <Footer />
      </div>

      {showHelpModal && (
        <HelpModal onClose={() => setShowHelpModal(false)} />
      )}
    </div>
  );
}

export default App;