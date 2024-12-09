import type { Poem } from '../types';

export const mockPoem: Poem = {
  content: "A computer's heart is its CPU,\nThe brain that thinks and works for you.\nIt processes tasks, both small and grand,\nFollowing commands it can understand.\n\nThe memory stores what the brain might need,\nRAM for now, and disks for speed.\nData flows like a rushing stream,\nPowering programs, fueling the dream.\n\nThe screen's the face, the keys, its voice,\nTogether they offer the user's choice.\nWith clicks and taps, the system obeys,\nTurning ideas into dazzling displays.\n\nBut don't forget, it's just a tool,\nGuided by logic, bound by rule.\nTreat it well, keep it secure,\nAnd its endless wonders will endure.",
  explanations: [
    "These lines introduce the CPU (Central Processing Unit) as the core component of a computer, comparing it to a human heart and brain to help understand its vital role in processing instructions.",
    "This stanza explains how the computer executes tasks by following programmed instructions, highlighting its ability to handle both simple and complex operations.",
    "Here we learn about computer memory, distinguishing between RAM (Random Access Memory) for temporary storage and disk drives for long-term data storage, comparing data flow to a stream.",
    "This section describes the input/output devices (monitor and keyboard) as the computer's interface with users, emphasizing how they enable human-computer interaction.",
    "The final stanza reminds us that computers are sophisticated tools that operate on logical principles, emphasizing the importance of proper maintenance and security.",
  ],
  questions: [
    {
      id: "q1",
      text: "What component is described as the computer's heart?",
      options: ["CPU", "RAM", "Hard Drive", "Monitor"],
      correctAnswer: "CPU"
    },
    {
      id: "q2",
      text: "How is data storage described in the poem?",
      options: ["Like a rushing stream", "Like a beating heart", "Like a thinking brain", "Like a secure vault"],
      correctAnswer: "Like a rushing stream"
    },
    {
      id: "q3",
      text: "What two types of memory are mentioned in the poem?",
      options: ["RAM and disks", "CPU and RAM", "Cache and ROM", "Flash and SSD"],
      correctAnswer: "RAM and disks"
    },
    {
      id: "q4",
      text: "What is described as the computer's 'face'?",
      options: ["The screen", "The CPU", "The keyboard", "The mouse"],
      correctAnswer: "The screen"
    },
    {
      id: "q5",
      text: "What is described as the computer's 'voice'?",
      options: ["The keys", "The speaker", "The monitor", "The processor"],
      correctAnswer: "The keys"
    },
    {
      id: "q6",
      text: "How does the poem describe the computer's response to user input?",
      options: ["The system obeys", "The system thinks", "The system creates", "The system learns"],
      correctAnswer: "The system obeys"
    },
    {
      id: "q7",
      text: "What guides the computer according to the last stanza?",
      options: ["Logic", "Emotion", "Intuition", "Creativity"],
      correctAnswer: "Logic"
    },
    {
      id: "q8",
      text: "What does the poem suggest about maintaining a computer?",
      options: ["Treat it well", "Upgrade often", "Use it carefully", "Clean it regularly"],
      correctAnswer: "Treat it well"
    },
    {
      id: "q9",
      text: "What transforms into 'dazzling displays' according to the poem?",
      options: ["Ideas", "Programs", "Data", "Commands"],
      correctAnswer: "Ideas"
    },
    {
      id: "q10",
      text: "What will endure if we treat the computer well?",
      options: ["Endless wonders", "Processing power", "Memory capacity", "System speed"],
      correctAnswer: "Endless wonders"
    }
  ],
  difficulty: "basic"
};