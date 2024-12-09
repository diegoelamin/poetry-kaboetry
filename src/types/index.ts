import { LearningState } from './learning';
import { UserStats, LevelStats, Achievement } from './stats';
import { Poem, Question, GlossaryTerm, Level, Diagram } from './models';

// Update LearningState interface
interface LearningStateError {
  message: string;
  code: string;
}

interface LearningState {
  currentTopic: string;
  currentPoem: Poem | null;
  userAnswers: Record<string, string>;
  progress: number;
  isComplete: boolean;
  showScore: boolean;
  score: number;
  currentLevel: Level;
  completedLevels: Level[];
  inProgressLevels: Level[];
  showCompletion: boolean;
  masteryUnlocked: boolean;
  currentQuestionIndex: number;
  isLoading: boolean;
  error: LearningStateError | null;
}

export type {
  LearningState,
  LearningStateError,
  UserStats,
  LevelStats,
  Achievement,
  Poem,
  Question,
  GlossaryTerm,
  Level,
  Diagram
};