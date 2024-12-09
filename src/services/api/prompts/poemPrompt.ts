import type { Level } from '../../../types';

export function generatePoemPrompt(topic: string, level: Level): string {
  return `
Create an educational poem about ${topic} with the following requirements:

1. Difficulty level: ${level}
2. Structure:
   - 4 stanzas of 4 lines each
   - In the style of Rudyard Kipling's If
   - Simple rhyming scheme (ABAB)
   - Clear rhythm and meter
3. Content:
   - Focus on key concepts and fundamentals
   - Use metaphors and analogies for complex ideas
   - Progressive complexity based on level

Format your response exactly like this:

Title: [Level]: [Title]

[16-line poem with exactly 4 stanzas, separated by blank lines]

Explanations:
1. [Explanation for lines 1-2 of first stanza]
2. [Explanation for lines 3-4 of first stanza]
3. [Explanation for lines 1-2 of second stanza]
4. [Explanation for lines 3-4 of second stanza]
5. [Explanation for lines 1-2 of third stanza]
6. [Explanation for lines 3-4 of third stanza]
7. [Explanation for lines 1-2 of fourth stanza]
8. [Explanation for lines 3-4 of fourth stanza]

Questions:
1. Question: [Question text]
   - [Option 1]
   - [Option 2]
   - [Option 3]
   - [Option 4]
   Correct Answer: [Option X]

[Repeat for exactly 10 questions]`;
}