import type { Poem } from '../types';

export const poems: Record<string, Poem> = {
  basic: {
    title: "Basic: The Language of Machines",
    content: "A computer's heart is its CPU,\nThe brain that thinks and works for you.\nIt processes tasks, both small and grand,\nFollowing commands it can understand.\n\nThe memory stores what the brain might need,\nRAM for now, and disks for speed.\nData flows like a rushing stream,\nPowering programs, fueling the dream.\n\nThe screen's the face, the keys, its voice,\nTogether they offer the user's choice.\nWith clicks and taps, the system obeys,\nTurning ideas into dazzling displays.\n\nBut don't forget, it's just a tool,\nGuided by logic, bound by rule.\nTreat it well, keep it secure,\nAnd its endless wonders will endure.",
    explanations: [
      "These lines introduce the CPU as the heart of the computer, comparing it to a human brain to help understand its central role in processing.",
      "This pair explains how the computer executes tasks by following programmed instructions, highlighting its ability to handle both simple and complex operations.",
      "These lines describe the computer's memory system, introducing RAM as temporary storage for immediate needs.",
      "This pair illustrates how data moves through the system like water, powering the programs that make computers useful.",
      "These lines personify the computer's interface, with the screen as its face and keyboard as its voice.",
      "This pair shows how user interactions are transformed into visual responses on the display.",
      "These lines emphasize that despite its complexity, a computer follows logical rules and principles.",
      "The final pair stresses the importance of maintaining and protecting our computers for lasting reliability."
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
  },
  intermediate: {
    title: "Intermediate: The Digital Symphony",
    content: "Behold the motherboard, a labyrinth fine,\nA circuit orchestra where pathways entwine.\nThe CPU's maestro, conducting each beat,\nWhile RAM holds notes for tasks on repeat.\n\nStorage divides—there's volatile and deep,\nThe former is fleeting, the latter does keep.\nSolid-state whispers in lightning-quick flows,\nHard drives hum slower, yet memory grows.\n\nThe binary pulse, a dance of ones and naughts,\nForms the foundation of computing thoughts.\nAlgorithms spin like intricate lace,\nUnraveling puzzles at dizzying pace.\n\nNetworks converge, a vast spider's weave,\nPackets of data, their web interleaves.\nThrough fiber and air, they bridge the divide,\nUniting the world with a keystroke's stride.",
    explanations: [
      "These lines paint the motherboard as an intricate maze of circuits, comparing it to an orchestra's complex arrangement.",
      "This pair casts the CPU as a conductor and RAM as sheet music, working together to coordinate computer operations.",
      "These lines distinguish between volatile (temporary) and non-volatile (permanent) storage types.",
      "This pair contrasts the speed differences between SSDs and traditional hard drives, highlighting storage evolution.",
      "These lines introduce binary code as the fundamental language of computing, describing it as a rhythmic dance.",
      "This pair explains how algorithms process data, comparing their complexity to intricate lacework.",
      "These lines use a spider's web metaphor to describe how computer networks interconnect.",
      "The final pair illustrates how network technologies bridge physical distances through digital communication."
    ],
    questions: [
      {
        id: "q1",
        text: "What is the motherboard compared to in the poem?",
        options: ["A labyrinth", "A computer", "A symphony", "A network"],
        correctAnswer: "A labyrinth"
      },
      {
        id: "q2",
        text: "What role does the CPU play in the 'digital symphony'?",
        options: ["Maestro", "Musician", "Composer", "Audience"],
        correctAnswer: "Maestro"
      },
      {
        id: "q3",
        text: "How is RAM described in relation to tasks?",
        options: ["Holds notes", "Writes music", "Plays songs", "Creates rhythm"],
        correctAnswer: "Holds notes"
      },
      {
        id: "q4",
        text: "What characteristic is attributed to solid-state storage?",
        options: ["Lightning-quick flows", "Deep memory", "Slow processing", "Loud operation"],
        correctAnswer: "Lightning-quick flows"
      },
      {
        id: "q5",
        text: "How is binary code described in the poem?",
        options: ["A dance", "A song", "A painting", "A story"],
        correctAnswer: "A dance"
      },
      {
        id: "q6",
        text: "What are algorithms compared to?",
        options: ["Intricate lace", "Dancing steps", "Musical notes", "Flowing water"],
        correctAnswer: "Intricate lace"
      },
      {
        id: "q7",
        text: "How are networks described in the poem?",
        options: ["Spider's weave", "Digital symphony", "Flowing river", "Dancing pattern"],
        correctAnswer: "Spider's weave"
      },
      {
        id: "q8",
        text: "What connects through 'fiber and air'?",
        options: ["Networks", "Algorithms", "Storage", "Memory"],
        correctAnswer: "Networks"
      },
      {
        id: "q9",
        text: "What type of storage is described as 'fleeting'?",
        options: ["Volatile", "Deep", "Solid-state", "Hard drive"],
        correctAnswer: "Volatile"
      },
      {
        id: "q10",
        text: "What unites the world according to the poem?",
        options: ["A keystroke", "A network", "Binary code", "Algorithms"],
        correctAnswer: "A keystroke"
      }
    ],
    difficulty: "intermediate"
  },
  advanced: {
    title: "Advanced: The Quantum Realm of Code",
    content: "Beyond the silicon lies a quantum vein,\nWhere qubits entangle in probabilistic reign.\nNo longer ones or zeroes they stay,\nSuperposed states forge a curious way.\n\nThe algorithms now, they burgeon and bloom,\nHeuristics and neural nets herald the boom.\nArtificial minds, a promethean spark,\nIlluminate realms once cloaked in the dark.\n\nThe blockchain hums—a ledger divine,\nImmutable truth, in hashes confined.\nDecentralized dreams of trust and accord,\nBuilt on the cryptographic sword.\n\nYet tread with care, for shadows extend,\nViruses lurk where defenses bend.\nFirewalls shield, encryption locks tight,\nIn the endless battle of cybernight.",
    explanations: [
      "These lines introduce quantum computing, describing how qubits operate in a probabilistic rather than deterministic way.",
      "This pair explains how quantum states transcend traditional binary limitations through superposition.",
      "These lines describe the evolution of advanced algorithms and machine learning approaches.",
      "This pair illustrates how artificial intelligence illuminates previously unsolvable computational challenges.",
      "These lines introduce blockchain technology as a divine ledger of unchangeable records.",
      "This pair explains how cryptography enables secure, decentralized systems in blockchain.",
      "These lines warn about the persistent threats in cybersecurity.",
      "The final pair describes the ongoing defensive measures needed in digital security."
    ],
    questions: [
      {
        id: "q1",
        text: "What lies beyond silicon according to the poem?",
        options: ["Quantum vein", "Neural network", "Blockchain", "Firewall"],
        correctAnswer: "Quantum vein"
      },
      {
        id: "q2",
        text: "How are qubits described in the poem?",
        options: ["Entangled", "Binary", "Digital", "Encrypted"],
        correctAnswer: "Entangled"
      },
      {
        id: "q3",
        text: "What type of states are mentioned in quantum computing?",
        options: ["Superposed", "Binary", "Fixed", "Encrypted"],
        correctAnswer: "Superposed"
      },
      {
        id: "q4",
        text: "What is described as a 'promethean spark'?",
        options: ["Artificial minds", "Quantum computing", "Blockchain", "Encryption"],
        correctAnswer: "Artificial minds"
      },
      {
        id: "q5",
        text: "How is blockchain described in the poem?",
        options: ["A ledger divine", "A quantum vein", "A neural net", "A firewall"],
        correctAnswer: "A ledger divine"
      },
      {
        id: "q6",
        text: "What contains 'immutable truth' according to the poem?",
        options: ["Hashes", "Qubits", "Algorithms", "Firewalls"],
        correctAnswer: "Hashes"
      },
      {
        id: "q7",
        text: "What type of sword is mentioned in the blockchain stanza?",
        options: ["Cryptographic", "Digital", "Quantum", "Neural"],
        correctAnswer: "Cryptographic"
      },
      {
        id: "q8",
        text: "What lurks where defenses bend?",
        options: ["Viruses", "Hackers", "Algorithms", "Qubits"],
        correctAnswer: "Viruses"
      },
      {
        id: "q9",
        text: "What provides protection in the 'endless battle'?",
        options: ["Firewalls and encryption", "Qubits and algorithms", "Neural nets and heuristics", "Blockchain and hashes"],
        correctAnswer: "Firewalls and encryption"
      },
      {
        id: "q10",
        text: "What term describes the security challenges in the final stanza?",
        options: ["Cybernight", "Quantum realm", "Digital age", "Neural network"],
        correctAnswer: "Cybernight"
      }
    ],
    difficulty: "advanced"
  }
};