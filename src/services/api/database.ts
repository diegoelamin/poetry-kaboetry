import { supabase } from '../../lib/supabase';
import type { Database } from '../../types/supabase';

type Tables = Database['public']['Tables'];

export async function createUserProfile(userId: string, email: string) {
  const { error } = await supabase
    .from('users')
    .insert([{ id: userId, email }]);
  
  if (error) throw error;
}

export async function updateLearningProgress(
  userId: string,
  subject: string,
  level: string,
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

export async function storePoem(
  subject: string,
  level: string,
  content: string,
  explanations: string[]
) {
  const { data, error } = await supabase
    .from('stored_poems')
    .insert([{
      subject,
      level,
      content,
      explanations,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }])
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