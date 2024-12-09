import { z } from 'zod';
import type { Poem, Level } from '../../../types/models';

const questionSchema = z.object({
  id: z.string(),
  text: z.string(),
  options: z.array(z.string()),
  correctAnswer: z.string()
});

const poemSchema = z.object({
  title: z.string(),
  content: z.string(),
  explanations: z.array(z.string()),
  questions: z.array(questionSchema),
  difficulty: z.enum(['basic', 'intermediate', 'advanced', 'mastery'])
});

export function parseOpenAIResponse(responseContent: string, level: Level): Poem {
  try {
    const lines = responseContent.split('\n');
    let title = '';
    let content = '';
    let explanations: string[] = [];
    let questions: any[] = [];
    let currentQuestion: any = null;
    let currentSection: 'title' | 'content' | 'explanations' | 'questions' = 'title';

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (!trimmedLine) continue;

      if (trimmedLine.startsWith('Title:')) {
        currentSection = 'title';
        title = trimmedLine.replace('Title:', '').trim();
      } else if (trimmedLine === 'Explanations:') {
        currentSection = 'explanations';
      } else if (trimmedLine === 'Questions:') {
        currentSection = 'questions';
      } else {
        switch (currentSection) {
          case 'title':
            if (!trimmedLine.startsWith('Title:')) {
              currentSection = 'content';
              content += trimmedLine + '\n';
            }
            break;
          
          case 'content':
            content += trimmedLine + '\n';
            break;
          
          case 'explanations':
            if (trimmedLine.match(/^\d+\./)) {
              const explanation = trimmedLine.replace(/^\d+\.\s*/, '').trim();
              if (explanation) {
                explanations.push(explanation);
              }
            }
            break;
          
          case 'questions':
            if (trimmedLine.match(/^\d+\.\s*Question:/)) {
              if (currentQuestion) {
                questions.push(currentQuestion);
              }
              currentQuestion = {
                id: `q${questions.length + 1}`,
                text: trimmedLine.replace(/^\d+\.\s*Question:\s*/, '').trim().replace(/\([A-D]\)|\(\d+\)/g, ''),
                options: [],
                correctAnswer: ''
              };
            } else if (trimmedLine.startsWith('- ') && currentQuestion) {
              // Remove any prefixes like (A), (1), etc.
              const option = trimmedLine.replace(/^-\s*(\([A-D]\)|\(\d+\))?/, '').trim();
              currentQuestion.options.push(option);
            } else if (trimmedLine.startsWith('Correct Answer:') && currentQuestion) {
              currentQuestion.correctAnswer = trimmedLine.replace(/^Correct Answer:\s*(\([A-D]\)|\(\d+\))?\s*/, '').trim();
            }
            break;
        }
      }
    }

    if (currentQuestion && currentQuestion.options.length > 0) {
      questions.push(currentQuestion);
    }

    const poemData = {
      title,
      content: content.trim(),
      explanations,
      questions,
      difficulty: level
    };

    return poemSchema.parse(poemData);
  } catch (error) {
    console.error('Error parsing poem response:', error);
    throw error;
  }
}