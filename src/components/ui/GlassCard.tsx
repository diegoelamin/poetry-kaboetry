import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div className={`glass-input rounded-2xl p-8 dark:bg-gray-800/80 dark:border-gray-700/30 ${className}`}>
      {children}
    </div>
  );
}