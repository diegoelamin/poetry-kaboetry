import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import type { Poem } from '../types/models';
import { GlassCard } from './ui/GlassCard';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';

interface PoemDisplayProps {
  poem: Poem;
}

export function PoemDisplay({ poem }: PoemDisplayProps) {
  const { copyToClipboard, hasCopied } = useCopyToClipboard();
  const allLines = poem.content.split('\n');
  const stanzas = [
    allLines.slice(0, 4),   // First stanza
    allLines.slice(4, 8),   // Second stanza
    allLines.slice(8, 12),  // Third stanza
    allLines.slice(12, 16)  // Fourth stanza
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={`poem-${poem.title}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <GlassCard>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-light text-gray-800 dark:text-gray-100">
                {poem.title}
              </h2>
              <button
                onClick={() => copyToClipboard(poem.content, 'poem')}
                className="p-2 text-gray-400 hover:text-coral dark:hover:text-sand transition-colors"
                aria-label="Copy poem"
              >
                {hasCopied('poem') ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <pre className="whitespace-pre-wrap font-serif text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-200">
                {stanzas.map((stanza, index) => (
                  <React.Fragment key={index}>
                    {stanza.join('\n')}
                    {index < stanzas.length - 1 ? '\n\n' : ''}
                  </React.Fragment>
                ))}
              </pre>
            </div>
          </GlassCard>
        </motion.div>
      </AnimatePresence>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={`explanation-${poem.title}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <GlassCard>
            <h3 className="text-lg md:text-xl font-light mb-4 text-gray-800 dark:text-gray-100">
              Understanding the Poem
              <button
                onClick={() => copyToClipboard(poem.explanations.join('\n\n'), 'explanations')}
                className="ml-2 p-2 text-gray-400 hover:text-coral dark:hover:text-sand transition-colors inline-flex"
                aria-label="Copy explanations"
              >
                {hasCopied('explanations') ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </h3>
            <div className="space-y-6">
              {stanzas.map((stanza, stanzaIndex) => {
                const firstTwoLines = stanza.slice(0, 2).join('\n');
                const lastTwoLines = stanza.slice(2, 4).join('\n');
                const explanationIndex = stanzaIndex * 2;
                const firstExplanation = poem.explanations[explanationIndex];
                const secondExplanation = poem.explanations[explanationIndex + 1];

                return (
                  <div key={stanzaIndex} className="space-y-6">
                    <div className="space-y-3">
                      <blockquote className="border-l-4 border-coral/20 dark:border-sand/20 pl-4 py-1">
                        <p className="font-serif text-sm md:text-base text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-line">
                          <em>{firstTwoLines}</em>
                        </p>
                      </blockquote>
                      <div className="pl-4 border-l-4 border-transparent">
                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                          <br />
                          {firstExplanation}
                          <br />
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <blockquote className="border-l-4 border-coral/20 dark:border-sand/20 pl-4 py-1">
                        <p className="font-serif text-sm md:text-base text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-line">
                          <em>{lastTwoLines}</em>
                        </p>
                      </blockquote>
                      <div className="pl-4 border-l-4 border-transparent">
                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                          <br />
                          {secondExplanation}
                          <br />
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}