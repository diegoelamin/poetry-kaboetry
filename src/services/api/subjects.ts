import type { RelatedSubject } from '../../types/models';

interface SubjectRelation {
  subject: string;
  relatedSubjects: RelatedSubject[];
}

const subjectRelations: Record<string, SubjectRelation> = {
  'computer architecture': {
    subject: 'computer architecture',
    relatedSubjects: [
      {
        name: 'Operating Systems',
        description: 'Explore how software manages hardware resources and executes programs efficiently',
        difficulty: 'intermediate',
        estimatedTime: '4-6 hours'
      },
      {
        name: 'Digital Logic Design',
        description: 'Learn about the fundamental building blocks of computer hardware',
        difficulty: 'intermediate',
        estimatedTime: '3-5 hours'
      },
      {
        name: 'Computer Networks',
        description: 'Understand how computers communicate and share data across networks',
        difficulty: 'advanced',
        estimatedTime: '5-7 hours'
      }
    ]
  },
  'operating systems': {
    subject: 'operating systems',
    relatedSubjects: [
      {
        name: 'Process Management',
        description: 'Learn how operating systems handle multiple processes and scheduling',
        difficulty: 'intermediate',
        estimatedTime: '3-4 hours'
      },
      {
        name: 'Memory Management',
        description: 'Understand virtual memory, paging, and memory allocation strategies',
        difficulty: 'advanced',
        estimatedTime: '4-6 hours'
      },
      {
        name: 'File Systems',
        description: 'Explore how operating systems organize and manage data storage',
        difficulty: 'intermediate',
        estimatedTime: '3-5 hours'
      }
    ]
  },
  'computer networks': {
    subject: 'computer networks',
    relatedSubjects: [
      {
        name: 'Network Security',
        description: 'Learn about encryption, authentication, and network protection',
        difficulty: 'advanced',
        estimatedTime: '5-7 hours'
      },
      {
        name: 'Internet Protocols',
        description: 'Understand TCP/IP, HTTP, and other core networking protocols',
        difficulty: 'intermediate',
        estimatedTime: '4-6 hours'
      },
      {
        name: 'Network Architecture',
        description: 'Study different network topologies and design principles',
        difficulty: 'intermediate',
        estimatedTime: '3-5 hours'
      }
    ]
  }
  // Add more subject relations as needed
};

export function getRelatedSubjects(subject: string): RelatedSubject[] {
  const normalizedSubject = subject.toLowerCase();
  return subjectRelations[normalizedSubject]?.relatedSubjects || [];
}