import type { Poem, Level } from '../types';

interface GeneratePoemResponse {
  poem: Poem;
  error?: string;
}

const API_BASE_URL = 'https://api.kaboetry.com/v1';

export async function generatePoem(topic: string, level: Level): Promise<GeneratePoemResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic,
        level,
        format: 'poem',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate poem');
    }

    const data = await response.json();
    return { poem: data.poem };
  } catch (error) {
    return {
      poem: null,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}