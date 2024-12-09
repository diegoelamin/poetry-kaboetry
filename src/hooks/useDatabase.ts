import { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import * as db from '../services/api/database/queries';
import type { Level } from '../types';

export function useDatabase() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getUserProgress = useCallback(async () => {
    if (!user) return null;
    setLoading(true);
    try {
      const progress = await db.getUserProgress(user.id);
      return progress;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch progress'));
      return null;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const updateProgress = useCallback(async (
    subject: string,
    level: Level,
    score: number,
    completed: boolean
  ) => {
    if (!user) return;
    setLoading(true);
    try {
      await db.updateUserProgress(user.id, subject, level, score, completed);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update progress'));
    } finally {
      setLoading(false);
    }
  }, [user]);

  const saveQuizResults = useCallback(async (
    poemId: string,
    score: number,
    answers: Record<string, string>
  ) => {
    if (!user) return;
    setLoading(true);
    try {
      await db.saveQuizResult(user.id, poemId, score, answers);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to save quiz results'));
    } finally {
      setLoading(false);
    }
  }, [user]);

  return {
    getUserProgress,
    updateProgress,
    saveQuizResults,
    loading,
    error
  };
}