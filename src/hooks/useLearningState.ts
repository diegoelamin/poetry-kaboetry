import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useDatabase } from './useDatabase';
import { storeGeneratedPoem } from '../services/api/database/queries';
import type { LearningState, Level } from '../types';
import { generatePoem } from '../services/api/poem';

interface LearningStateError {
  message: string;
  code: string;
}

export function useLearningState() {
  const { user } = useAuth();
  const { getUserProgress, updateProgress, saveQuizResults } = useDatabase();
  const [state, setState] = useState<LearningState>({
    currentTopic: '',
    currentPoem: null,
    userAnswers: {},
    progress: 0,
    isComplete: false,
    showScore: false,
    score: 0,
    currentLevel: 'basic',
    completedLevels: [],
    inProgressLevels: [],
    showCompletion: false,
    masteryUnlocked: false,
    currentQuestionIndex: 0,
    isLoading: false,
    error: null
  });

  const setError = useCallback((error: LearningStateError | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  const setLoading = useCallback((isLoading: boolean) => {
    setState(prev => ({ ...prev, isLoading }));
  }, []);

  const handleTopicSubmit = useCallback(async (topic: string) => {
    try {
      setLoading(true);
      setError(null);
      
      let poem;
      
      if (user) {
        const progress = await getUserProgress();
        const existingProgress = progress?.find(p => p.subject === topic);
        if (existingProgress) {
          setState(prev => ({
            ...prev,
            currentLevel: existingProgress.level as Level,
            completedLevels: progress
              .filter(p => p.completed && p.subject === topic)
              .map(p => p.level as Level)
          }));
        }
        
        // Try to get existing poem from database
        try {
          const storedPoem = await getStoredPoem(topic, state.currentLevel);
          if (storedPoem) {
            poem = storedPoem;
          }
        } catch (err) {
          console.error('Error fetching stored poem:', err);
        }
      }
      
      // Generate new poem if none exists
      if (!poem) {
        poem = await generatePoem(topic, state.currentLevel);
        
        // Store the generated poem if user is logged in
        if (user) {
          try {
            await storeGeneratedPoem(poem, topic);
          } catch (err) {
            console.error('Error storing poem:', err);
          }
        }
      }
      
      // Store the generated poem
      if (user) {
        await storeGeneratedPoem(poem, topic);
      }

      setState(prev => ({
        ...prev,
        currentTopic: topic,
        currentPoem: poem,
        currentQuestionIndex: 0,
        userAnswers: {},
        showScore: false,
        score: 0,
        inProgressLevels: prev.inProgressLevels.includes(prev.currentLevel) 
          ? prev.inProgressLevels 
          : [...prev.inProgressLevels, prev.currentLevel],
        isLoading: false,
        error: null
      }));
    } catch (err) {
      setError({
        message: 'Failed to generate learning content. Please try again.',
        code: 'GENERATION_FAILED'
      });
    } finally {
      setLoading(false);
    }
  }, [state.currentLevel, setLoading, setError]);

  const handleAnswerSubmit = useCallback((questionId: string, answer: string) => {
    setState(prev => ({
      ...prev,
      userAnswers: {
        ...prev.userAnswers,
        [questionId]: answer
      }
    }));
  }, []);

  const handleQuestionChange = useCallback((index: number) => {
    setState(prev => ({
      ...prev,
      currentQuestionIndex: index
    }));
  }, []);

  const calculateScore = useCallback(() => {
    if (!state.currentPoem) return 0;
    
    const totalQuestions = state.currentPoem.questions.length;
    if (totalQuestions === 0) return 0;

    const correctCount = state.currentPoem.questions.reduce((count, question) => {
      const userAnswer = state.userAnswers[question.id];
      return userAnswer === question.correctAnswer ? count + 1 : count;
    }, 0);

    return Math.round((correctCount / totalQuestions) * 100);
  }, [state.currentPoem, state.userAnswers]);

  const handleShowScore = useCallback(() => {
    const score = calculateScore();
    const isComplete = score >= 80;
    
    // Update progress in database
    if (user) {
      updateProgress(
        state.currentTopic,
        state.currentLevel,
        score,
        isComplete
      );
      
      if (state.currentPoem) {
        saveQuizResults(
          state.currentPoem.id,
          score,
          state.userAnswers
        );
      }
    }

    setState(prev => ({
      ...prev,
      showScore: true,
      score,
      isComplete,
      completedLevels: isComplete && !prev.completedLevels.includes(prev.currentLevel)
        ? [...prev.completedLevels, prev.currentLevel]
        : prev.completedLevels
    }));
  }, [calculateScore]);

  const handleNextLevel = useCallback(async () => {
    const levelOrder: Level[] = ['basic', 'intermediate', 'advanced', 'mastery'];
    const currentIndex = levelOrder.indexOf(state.currentLevel);
    const nextLevel = levelOrder[currentIndex + 1];

    if (nextLevel) {
      setLoading(true);
      try {
        const poem = await generatePoem(state.currentTopic, nextLevel);
        
        setState(prev => {
          const newInProgressLevels = prev.inProgressLevels.includes(nextLevel)
            ? prev.inProgressLevels
            : [...prev.inProgressLevels, nextLevel];

          const isMasteryLevel = nextLevel === 'mastery';

          return {
            ...prev,
            currentLevel: nextLevel,
            currentPoem: poem,
            userAnswers: {},
            showScore: false,
            score: 0,
            currentQuestionIndex: 0,
            masteryUnlocked: isMasteryLevel,
            showCompletion: isMasteryLevel,
            inProgressLevels: newInProgressLevels,
            isLoading: false,
            error: null
          };
        });
      } catch (err) {
        setError({
          message: 'Failed to load next level. Please try again.',
          code: 'LEVEL_LOAD_FAILED'
        });
      } finally {
        setLoading(false);
      }
    }
  }, [state.currentLevel, state.currentTopic, setLoading, setError]);

  const handleTryAgain = useCallback(() => {
    setState(prev => ({
      ...prev,
      userAnswers: {},
      showScore: false,
      score: 0,
      currentQuestionIndex: 0
    }));
  }, []);

  const handleLevelSelect = useCallback(async (level: Level) => {
    if (state.currentTopic) {
      setLoading(true);
      try {
        const poem = await generatePoem(state.currentTopic, level);
        
        setState(prev => ({
          ...prev,
          currentLevel: level,
          currentPoem: poem,
          userAnswers: {},
          showScore: false,
          score: 0,
          currentQuestionIndex: 0,
          showCompletion: level === 'mastery' && prev.masteryUnlocked,
          isLoading: false,
          error: null
        }));
      } catch (err) {
        setError({
          message: 'Failed to load level. Please try again.',
          code: 'LEVEL_LOAD_FAILED'
        });
      } finally {
        setLoading(false);
      }
    }
  }, [state.currentTopic, setLoading, setError]);

  const handleReviewJourney = useCallback(() => {
    setState(prev => ({
      ...prev,
      showCompletion: false
    }));
  }, []);

  return {
    state,
    handleTopicSubmit,
    handleAnswerSubmit,
    handleShowScore,
    handleNextLevel,
    handleTryAgain,
    handleLevelSelect,
    handleReviewJourney,
    handleQuestionChange,
    setError
  };
}