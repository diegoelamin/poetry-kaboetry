export type Level = 'basic' | 'intermediate' | 'advanced' | 'mastery';

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
}

export interface Poem {
  id?: string;
  title: string;
  content: string;
  explanations: string[];
  questions: Question[];
  difficulty: Level;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  relatedQuestions: string[];
}

export interface Diagram {
  url: string;
  alt: string;
  caption?: string;
}

export interface RelatedSubject {
  name: string;
  description: string;
  difficulty: Exclude<Level, 'mastery'>;
  estimatedTime: string;
}