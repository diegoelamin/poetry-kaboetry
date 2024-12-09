import { GlossaryTerm } from '../types';

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: 'cpu',
    term: 'CPU (Central Processing Unit)',
    definition: 'The main processor of a computer that performs calculations and executes instructions.',
    relatedQuestions: ['q1']
  },
  {
    id: 'ram',
    term: 'RAM (Random Access Memory)',
    definition: 'Temporary memory that stores data and programs currently in use by the computer.',
    relatedQuestions: ['q2', 'q3']
  },
  {
    id: 'storage',
    term: 'Storage Devices',
    definition: 'Hardware components that store data permanently, including hard drives and solid-state drives.',
    relatedQuestions: ['q3']
  },
  {
    id: 'binary',
    term: 'Binary Code',
    definition: 'The fundamental language of computers using only 1s and 0s to represent data.',
    relatedQuestions: ['q5']
  }
];