import React from 'react';
import { motion } from 'framer-motion';
import { X, Twitter, Facebook } from 'lucide-react';
import { icons } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

const LinkedInIcon = icons.Linkedin;

interface ShareModalProps {
  subject: string;
  onClose: () => void;
}

export function ShareModal({ subject, onClose }: ShareModalProps) {
  const shareMessage = `🎉 Just mastered ${subject} through poetry on Kaboetry - Where Poetry Explodes into Learning! 📚✨ Join me in this unique learning journey that makes complex topics fun and memorable! #Kaboetry #LearningRevolution`;
  
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareMessage)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent('Learning Achievement on Kaboetry')}&summary=${encodeURIComponent(shareMessage)}`
  };

  return (
    <div className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <GlassCard>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif text-gray-800 dark:text-gray-100">
              Share Your Achievement
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-coral dark:hover:text-sand transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex justify-center space-x-4">
              <a
                href={shareUrls.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-coral dark:bg-sand text-white dark:text-ink hover:bg-coral/90 dark:hover:bg-sand/90 transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href={shareUrls.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-coral dark:bg-sand text-white dark:text-ink hover:bg-coral/90 dark:hover:bg-sand/90 transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href={shareUrls.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-coral dark:bg-sand text-white dark:text-ink hover:bg-coral/90 dark:hover:bg-sand/90 transition-colors"
              >
                <LinkedInIcon className="w-6 h-6" />
              </a>
            </div>
            
            <div className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-sand/30 dark:border-gray-700/30">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {shareMessage}
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}