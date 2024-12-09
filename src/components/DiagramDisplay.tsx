import React from 'react';
import { motion } from 'framer-motion';
import type { Diagram } from '../types';

interface DiagramDisplayProps {
  diagram: Diagram;
}

export function DiagramDisplay({ diagram }: DiagramDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="mt-4 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-sand/30 dark:border-gray-700/30"
    >
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={diagram.url}
          alt={diagram.alt}
          className="rounded-lg object-contain"
        />
      </div>
      {diagram.caption && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 text-center">
          {diagram.caption}
        </p>
      )}
    </motion.div>
  );
}