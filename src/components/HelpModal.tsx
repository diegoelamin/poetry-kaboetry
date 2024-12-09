import React from 'react';
import { motion } from 'framer-motion';
import { X, Copy, Heart } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

interface HelpModalProps {
  onClose: () => void;
}

export function HelpModal({ onClose }: HelpModalProps) {
  return (
    <div className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl"
      >
        <GlassCard>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif text-gray-800 dark:text-gray-100">
              How to Use Kaboetry
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-coral dark:hover:text-sand transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">
                Learning Through Poetry
              </h3>
              <p>
                Enter any topic you'd like to learn about, and we'll generate a custom educational poem
                to help you understand the concept through creative verse.
              </p>
              <p className="mt-2 text-sm">
                (Poems are generated if the styles of Rudyard Kipling's If. More styles are coming soon.)
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">
                Saving Your Poems
              </h3>
              <div className="flex items-center gap-2">
                <Copy className="w-5 h-5 text-gray-400" />
                <p>
                  Use the copy icon to save your poems and explanations. Poems are not saved between
                  sessions, so make sure to copy any content you want to keep!
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">
                Progressive Learning
              </h3>
              <p>
                Start with basic concepts and progress through intermediate and advanced levels.
                Each level builds upon previous knowledge with increasingly sophisticated content.
              </p>
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <a
                href="https://ko-fi.com/diegoelamin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-coral dark:bg-sand text-white dark:text-ink rounded-full hover:bg-coral/90 dark:hover:bg-sand/90 transition-colors"
              >
                <Heart className="w-5 h-5 mr-2" />
                Support This Project
              </a>
              <p className="mt-2 text-sm">
                Your support helps us continue developing educational tools that make learning fun and engaging.
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}