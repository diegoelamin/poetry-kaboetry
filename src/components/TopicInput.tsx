import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface TopicInputProps {
  onSubmit: (topic: string) => void;
}

export function TopicInput({ onSubmit }: TopicInputProps) {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onSubmit(topic.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Type any topic..."
          className="w-full px-6 py-4 rounded-full text-lg bg-white/80 dark:bg-ink/80 border border-sand dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-coral/20 dark:focus:ring-coral/40 transition-all duration-200 text-ink dark:text-cream placeholder-gray-400 dark:placeholder-gray-500"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-gray-400 hover:text-coral dark:hover:text-sand transition-colors"
          aria-label="Search topics"
        >
          <Search size={24} />
        </button>
      </form>
    </div>
  );
}