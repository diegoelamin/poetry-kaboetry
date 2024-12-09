import { useEffect, useRef } from 'react';
import type { UserStats, Level, LevelStats, Achievement } from '../types';

const INITIAL_STATS: UserStats = {
  totalTimeSpent: 0,
  levelStats: {
    basic: {
      timeSpent: 0,
      attemptsCount: 0,
      bestScore: 0
    },
    intermediate: {
      timeSpent: 0,
      attemptsCount: 0,
      bestScore: 0
    },
    advanced: {
      timeSpent: 0,
      attemptsCount: 0,
      bestScore: 0
    },
    mastery: {
      timeSpent: 0,
      attemptsCount: 0,
      bestScore: 0
    }
  },
  achievements: [],
  lastActive: new Date()
};

export function useUserStats(currentLevel: Level) {
  const statsRef = useRef<UserStats>(INITIAL_STATS);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Start timer for current level
    timerRef.current = setInterval(() => {
      statsRef.current.totalTimeSpent += 1;
      statsRef.current.levelStats[currentLevel].timeSpent += 1;
      statsRef.current.lastActive = new Date();
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentLevel]);

  const updateLevelStats = (level: Level, stats: Partial<LevelStats>) => {
    statsRef.current.levelStats[level] = {
      ...statsRef.current.levelStats[level],
      ...stats
    };
  };

  const addAchievement = (achievement: Achievement) => {
    if (!statsRef.current.achievements.find(a => a.id === achievement.id)) {
      statsRef.current.achievements.push(achievement);
    }
  };

  return {
    stats: statsRef.current,
    updateLevelStats,
    addAchievement
  };
}