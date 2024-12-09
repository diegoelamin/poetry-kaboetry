import type { Level } from '../types';

export const LEVEL_ORDER: Level[] = ['basic', 'intermediate', 'advanced', 'mastery'];

export const PASSING_SCORE = 80;

export const LEVEL_TITLES = {
  basic: 'Basic: The Language of Machines',
  intermediate: 'Intermediate: The Digital Symphony',
  advanced: 'Advanced: The Quantum Realm of Code',
  mastery: 'Mastery Achievement'
} as const;

export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.2 }
  }
};