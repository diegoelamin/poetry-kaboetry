import React from 'react';
import { BookOpen, CheckCircle2, Lock, Clock, Trophy, X } from 'lucide-react';
import type { Level, Poem } from '../types';

interface SidebarProps {
  currentLevel: Level;
  completedLevels: Level[];
  inProgressLevels: Level[];
  masteryUnlocked: boolean;
  poems: Record<Level, Poem | null>;
  onLevelSelect: (level: Level) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ 
  currentLevel, 
  completedLevels, 
  inProgressLevels, 
  masteryUnlocked,
  poems,
  onLevelSelect,
  isOpen,
  onClose
}: SidebarProps) {
  const levels = Object.keys(poems) as Level[];
  const visibleLevels = masteryUnlocked ? levels : levels.filter(level => level !== 'mastery');

  const isLevelAccessible = (level: Level) => {
    return (
      level === currentLevel ||
      completedLevels.includes(level) ||
      level === 'basic' ||
      inProgressLevels.includes(level) ||
      (level === 'mastery' && masteryUnlocked)
    );
  };

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-40 w-64 bg-white/50 dark:bg-ink/50 backdrop-blur-sm
    border-r border-sand/30 dark:border-gray-700/30 p-6 transition-transform duration-300 ease-in-out
    lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
  `;

  return (
    <>
      <aside className={sidebarClasses}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-serif text-coral dark:text-sand">Progress</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-sand/10 dark:hover:bg-gray-800/50 lg:hidden"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-coral dark:text-sand" />
          </button>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-8">
          {completedLevels.length}/{masteryUnlocked ? '4' : '3'} levels completed
        </p>

        <nav className="space-y-4">
          {visibleLevels.map((level) => {
            const isCompleted = completedLevels.includes(level);
            const isInProgress = inProgressLevels.includes(level);
            const isAccessible = isLevelAccessible(level);
            const isCurrent = currentLevel === level;
            const poem = poems[level];
            const LevelIcon = level === 'mastery' ? Trophy : BookOpen;

            return (
              <button
                key={level}
                onClick={() => isAccessible && onLevelSelect(level)}
                disabled={!isAccessible}
                className={`w-full text-left p-4 rounded-xl transition-all ${
                  isCurrent
                    ? 'bg-coral/10 dark:bg-sand/10 border-2 border-coral dark:border-sand'
                    : !isAccessible
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-coral/5 dark:hover:bg-sand/5 cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-800 dark:text-gray-100">
                    {poem ? poem.title : `${level.charAt(0).toUpperCase() + level.slice(1)} Level`}
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : isInProgress ? (
                    <Clock className="w-5 h-5 text-coral dark:text-sand" />
                  ) : !isAccessible ? (
                    <Lock className="w-5 h-5 text-gray-400" />
                  ) : (
                    <LevelIcon className="w-5 h-5 text-coral dark:text-sand" />
                  )}
                </div>
                {poem && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 font-serif italic">
                    {poem.content.split('\n')[0]}...
                  </p>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
    </>
  );
}