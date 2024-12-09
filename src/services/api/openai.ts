import OpenAI from 'openai';
import { z } from 'zod';
import type { Poem, Level } from '../../types/models';
import { ApiError } from './error';
import { ERROR_CODES } from '../config';
import { generatePoemPrompt } from './prompts/poemPrompt';
import { parseOpenAIResponse } from './parsers/poemParser';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generatePoem(topic: string, level: Level): Promise<Poem> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert educational poet who creates engaging, accurate, and informative poems about any topic. Always follow the exact format specified in the prompt."
        },
        {
          role: "user",
          content: generatePoemPrompt(topic, level)
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new ApiError(
        ERROR_CODES.GENERATION_FAILED,
        'No content in OpenAI response'
      );
    }

    return parseOpenAIResponse(responseContent, level);
  } catch (error) {
    console.error('Error generating poem:', error);
    
    if (error instanceof z.ZodError) {
      throw new ApiError(
        ERROR_CODES.VALIDATION_FAILED,
        'Invalid response format from AI',
        { zodError: error.issues }
      );
    }
    
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(
      ERROR_CODES.GENERATION_FAILED,
      'Failed to generate poem',
      { originalError: error }
    );
  }
}