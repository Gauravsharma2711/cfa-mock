export interface Question {
  id: number;
  category: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
  };
  correctAnswer: 'A' | 'B' | 'C';
  explanation: string;
}

export interface MockSession {
  id: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  questionsCount: number;
  timeAllowedMinutes: number;
  topics: string[];
  dataFile: string;
  iconName: string;
  badgeColor: string;
}

export type ExamMode = 'timed' | 'untimed';

export interface UserAnswers {
  [questionId: number]: 'A' | 'B' | 'C';
}

export interface FlaggedQuestions {
  [questionId: number]: boolean;
}

export interface ExamResult {
  id: string;
  sessionId: string;
  sessionTitle: string;
  date: string;
  timeSpentSeconds: number;
  mode: ExamMode;
  totalQuestions: number;
  score: number;
  percentage: number;
  passed: boolean;
  userAnswers: UserAnswers;
  flaggedQuestions: FlaggedQuestions;
}
