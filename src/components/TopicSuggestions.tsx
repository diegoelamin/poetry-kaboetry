import React from 'react';
import { Lightbulb } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import type { Level } from '../types';

interface TopicSuggestion {
  topic: string;
  explanation: string;
}

const LEVEL_SUGGESTIONS: Record<Level, TopicSuggestion[]> = {
  basic: [
    {
      topic: "Computer Architecture",
      explanation: "Explore how different computer components work together as a system"
    },
    {
      topic: "Operating Systems",
      explanation: "Learn how software manages hardware resources and runs programs"
    },
    {
      topic: "Data Storage",
      explanation: "Discover different ways computers store and organize information"
    }
  ],
  intermediate: [
    {
      topic: "Computer Networks",
      explanation: "Understand how computers communicate and share data globally"
    },
    {
      topic: "Database Systems",
      explanation: "Learn how data is structured, stored, and retrieved efficiently"
    },
    {
      topic: "Software Engineering",
      explanation: "Explore principles of building reliable and scalable software"
    }
  ],
  advanced: [
    {
      topic: "Artificial Intelligence",
      explanation: "Dive deeper into machine learning and neural networks"
    },
    {
      topic: "Cryptography",
      explanation: "Study advanced encryption and security protocols"
    },
    {
      topic: "Distributed Systems",
      explanation: "Learn about cloud computing and system scaling"
    }
  ],
  mastery: [
    {
      topic: "Emerging Technologies",
      explanation: "Explore cutting-edge developments in quantum computing and beyond"
    },
    {
      topic: "Ethics in Computing",
      explanation: "Consider the societal impact of advanced computing technologies"
    },
    {
      topic: "Research Frontiers",
      explanation: "Discover the latest breakthroughs in computer science"
    }
  ]
};

interface TopicSuggestionsProps {
  level: Level;
  onTopicSelect: (topic: string) => void;
}

export function TopicSuggestions({ level, onTopicSelect }: TopicSuggestionsProps) {
  const suggestions = LEVEL_SUGGESTIONS[level];

  return (
    <div className="mt-8">
      <GlassCard>
        <div className="text-center mb-6">
          <Lightbulb className="w-8 h-8 text-coral dark:text-sand mx-auto mb-2" />
          <h3 className="text-xl font-light text-gray-800 dark:text-gray-100">
            Continue Your Learning Journey
          </h3>
        </div>

        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onTopicSelect(suggestion.topic)}
              className="w-full text-left p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 hover:bg-coral/5 dark:hover:bg-sand/5 transition-colors border border-sand/30 dark:border-gray-700/30"
            >
              <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-1">
                {suggestion.topic}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {suggestion.explanation}
              </p>
            </button>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}