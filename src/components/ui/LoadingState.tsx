import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from './GlassCard';

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Generating your learning experience...' }: LoadingStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <GlassCard>
        <div className="flex flex-col items-center justify-center py-8">
          <div className="relative w-16 h-16 mb-4">
            <motion.div
              className="absolute inset-0 border-4 border-coral/20 dark:border-sand/20 rounded-full"
              style={{ borderTopColor: 'var(--coral)' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            {message}
          </p>
        </div>
      </GlassCard>
    </motion.div>
  );
}