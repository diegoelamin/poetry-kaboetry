import { useMemo } from 'react';
import { glossaryTerms } from '../data/glossary';

export function useGlossary() {
  const getTermsForQuestion = (questionId: string) => {
    return glossaryTerms.filter(term => 
      term.relatedQuestions.includes(questionId)
    );
  };

  return {
    getTermsForQuestion: useMemo(() => getTermsForQuestion, [])
  };
}