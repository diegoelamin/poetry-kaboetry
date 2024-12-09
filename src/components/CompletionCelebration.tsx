import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, BookOpen, Share2, Clock, ArrowRight, Gauge, Award } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { ShareModal } from './ShareModal';
import { getRelatedSubjects } from '../services/api/subjects';
import type { RelatedSubject } from '../types/models';

interface CompletionCelebrationProps {
  justCompletedSubject: string;
  onReviewJourney: () => void;
  onTopicSelect: (topic: string) => void;
}

export function CompletionCelebration({ 
  justCompletedSubject,
  onReviewJourney, 
  onTopicSelect 
}: CompletionCelebrationProps) {
  const relatedSubjects = getRelatedSubjects(justCompletedSubject);
  const [showShareModal, setShowShareModal] = useState(false);

  const getDifficultyColor = (difficulty: RelatedSubject['difficulty']) => {
    switch (difficulty) {
      case 'basic':
        return 'text-green-500';
      case 'intermediate':
        return 'text-yellow-500';
      case 'advanced':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <GlassCard>
        <div className="text-center space-y-6">
          <div className="relative">
            <Trophy className="w-20 h-20 mx-auto text-coral dark:text-sand" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute -top-2 -right-2"
            >
              <Award className="w-8 h-8 text-yellow-500" />
            </motion.div>
          </div>
          <h2 className="text-3xl font-serif text-gray-800 dark:text-gray-100 mb-4">
            Mastery Achieved!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Congratulations! You've completed all levels and mastered {justCompletedSubject} through poetry.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-sand/30 dark:border-gray-700/30">
              <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-2">Your Journey</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Mastered all levels of increasing complexity in {justCompletedSubject}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-sand/30 dark:border-gray-700/30">
              <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-2">Achievement</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Demonstrated mastery of {justCompletedSubject} through poetic learning
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-light text-gray-800 dark:text-gray-100 mb-4">Next Steps</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = 'https://kaboetry.com/'}
                className="inline-flex items-center justify-center px-6 py-3 bg-coral dark:bg-sand text-white dark:text-ink rounded-full hover:bg-coral/90 dark:hover:bg-sand/90 transition-colors"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Start New Topic
              </button>
              <button
                onClick={() => setShowShareModal(true)}
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-coral dark:border-sand text-coral dark:text-sand rounded-full hover:bg-coral/5 dark:hover:bg-sand/5 transition-colors"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Achievement
              </button>
            </div>
          </div>
        </div>
      </GlassCard>
      
      {showShareModal && (
        <ShareModal
          subject={justCompletedSubject}
          onClose={() => setShowShareModal(false)}
        />
      )}

      <div className="space-y-6">
        <h3 className="text-2xl font-serif text-center text-gray-800 dark:text-gray-100">
          Continue Your Learning Journey
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {relatedSubjects.map((subject, index) => (
            <motion.div
              key={subject.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="flex-1">
                    <h4 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-2">
                      {subject.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {subject.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center">
                        <Gauge className={`w-4 h-4 mr-1 ${getDifficultyColor(subject.difficulty)}`} />
                        <span className="text-gray-600 dark:text-gray-300">
                          {subject.difficulty.charAt(0).toUpperCase() + subject.difficulty.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-300">
                          {subject.estimatedTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onTopicSelect(subject.name)}
                    className="inline-flex items-center justify-center px-6 py-3 bg-coral dark:bg-sand text-white dark:text-ink rounded-full hover:bg-coral/90 dark:hover:bg-sand/90 transition-colors whitespace-nowrap"
                  >
                    Start Learning
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}