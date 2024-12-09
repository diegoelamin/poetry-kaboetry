import React from 'react';
import { Keyboard } from 'lucide-react';
import { GlassCard } from './GlassCard';

export function KeyboardShortcuts() {
  const shortcuts = [
    { key: '→', description: 'Next question' },
    { key: '←', description: 'Previous question' },
    { key: 'Enter', description: 'Submit answer' },
    { key: 'Space', description: 'Play/pause poem reading' }
  ];

  return (
    <div className="fixed bottom-4 right-4">
      <button
        className="p-2 rounded-full bg-coral/10 dark:bg-sand/10 text-coral dark:text-sand hover:bg-coral/20 dark:hover:bg-sand/20 transition-colors"
        aria-label="Show keyboard shortcuts"
      >
        <Keyboard className="w-5 h-5" />
      </button>
      
      <div className="absolute bottom-full right-0 mb-2 w-64">
        <GlassCard>
          <h4 className="text-sm font-medium text-gray-800 dark:text-gray-100 mb-3">
            Keyboard Shortcuts
          </h4>
          <div className="space-y-2">
            {shortcuts.map(({ key, description }) => (
              <div key={key} className="flex items-center justify-between">
                <kbd className="px-2 py-1 text-xs font-semibold bg-sand/20 dark:bg-gray-700 rounded">
                  {key}
                </kbd>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {description}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}