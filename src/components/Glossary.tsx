import React from 'react';
import { X } from 'lucide-react';
import { GlossaryTerm } from '../types';

interface GlossaryProps {
  terms: GlossaryTerm[];
  onClose: () => void;
}

export function Glossary({ terms, onClose }: GlossaryProps) {
  return (
    <div className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full max-w-lg mx-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-light text-gray-800 dark:text-gray-100">
              Key Terms
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-coral dark:hover:text-sand transition-colors"
              aria-label="Close glossary"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <div className="space-y-6">
              {terms.map((term) => (
                <div key={term.id}>
                  <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-2">
                    {term.term}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {term.definition}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}