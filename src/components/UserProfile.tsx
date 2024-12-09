import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Award, BarChart2, Calendar } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import type { UserStats, Level } from '../types';

interface UserProfileProps {
  stats: UserStats;
  onClose: () => void;
}

export function UserProfile({ stats, onClose }: UserProfileProps) {
  const totalHours = Math.floor(stats.totalTimeSpent / 3600);
  const averageScore = Object.values(stats.levelStats).reduce(
    (acc, curr) => acc + curr.bestScore,
    0
  ) / Object.keys(stats.levelStats).length;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const levelOrder: Level[] = ['basic', 'intermediate', 'advanced', 'mastery'];

  return (
    <div className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl"
      >
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-serif text-gray-800 dark:text-gray-100">
            Learning Profile
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-coral dark:hover:text-sand"
          >
            Close
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <GlassCard>
              <div className="flex items-center space-x-4">
                <Clock className="w-8 h-8 text-coral dark:text-sand" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Total Time</p>
                  <p className="text-xl font-medium text-gray-800 dark:text-gray-100">
                    {totalHours} hours
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center space-x-4">
                <Award className="w-8 h-8 text-coral dark:text-sand" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Achievements</p>
                  <p className="text-xl font-medium text-gray-800 dark:text-gray-100">
                    {stats.achievements.length}
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center space-x-4">
                <BarChart2 className="w-8 h-8 text-coral dark:text-sand" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Avg. Score</p>
                  <p className="text-xl font-medium text-gray-800 dark:text-gray-100">
                    {Math.round(averageScore)}%
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center space-x-4">
                <Calendar className="w-8 h-8 text-coral dark:text-sand" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Last Active</p>
                  <p className="text-xl font-medium text-gray-800 dark:text-gray-100">
                    {new Date(stats.lastActive).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-light text-gray-800 dark:text-gray-100 mb-4">
              Level Progress
            </h3>
            <div className="space-y-4">
              {levelOrder.map((level) => {
                const levelStats = stats.levelStats[level];
                if (!levelStats) return null;

                return (
                  <div
                    key={level}
                    className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-sand/30 dark:border-gray-700/30"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-800 dark:text-gray-100">
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </h4>
                      <span className="text-sm text-coral dark:text-sand">
                        {formatTime(levelStats.timeSpent)}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 dark:text-gray-300">Attempts</p>
                        <p className="font-medium text-gray-800 dark:text-gray-100">
                          {levelStats.attemptsCount}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-300">Best Score</p>
                        <p className="font-medium text-gray-800 dark:text-gray-100">
                          {levelStats.bestScore}%
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-300">Completed</p>
                        <p className="font-medium text-gray-800 dark:text-gray-100">
                          {levelStats.completedAt
                            ? new Date(levelStats.completedAt).toLocaleDateString()
                            : 'In Progress'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-light text-gray-800 dark:text-gray-100 mb-4">
              Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-sand/30 dark:border-gray-700/30"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{achievement.icon}</span>
                    <h4 className="font-medium text-gray-800 dark:text-gray-100">
                      {achievement.title}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {achievement.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}