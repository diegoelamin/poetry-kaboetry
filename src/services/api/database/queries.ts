import { supabase } from '../../../lib/supabase';
import type { Database } from '../../../types/supabase';
import type { Poem, Level } from '../../../types/models';

type Tables = Database['public']['Tables'];

export async function getUserProgress(userId: string) {
  const { data, error } = await supabase
    .from('learning_progress')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getStoredPoem(subject: string, level: Level) {
  const { data, error } = await supabase
    .from('stored_poems')
    .select('*')
    .eq('subject', subject)
    .eq('level', level)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function storeGeneratedPoem(poem: Poem, subject: string) {
  // First, check if poem already exists
  const { data: existingPoem } = await supabase
    .from('stored_poems')
    .select('id')
    .eq('subject', subject)
    .eq('level', poem.difficulty)
    .single();

  if (existingPoem) {
    return existingPoem;
  }

  const { data, error } = await supabase
    .from('stored_poems')
    .insert({
      subject,
      level: poem.difficulty,
      content: poem.content,
      explanations: poem.explanations,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function saveQuizResult(
  userId: string,
  poemId: string,
  score: number,
  answers: Record<string, string>
) {
  const { error } = await supabase
    .from('quiz_results')
    .insert([{
      user_id: userId,
      poem_id: poemId,
      score,
      answers,
      created_at: new Date().toISOString()
    }]);

  if (error) throw error;
}

export async function updateUserProgress(
  userId: string,
  subject: string,
  level: Level,
  score: number,
  completed: boolean
) {
  const { error } = await supabase
    .from('learning_progress')
    .upsert({
      user_id: userId,
      subject,
      level,
      score,
      completed,
      updated_at: new Date().toISOString()
    });

  if (error) throw error;
}