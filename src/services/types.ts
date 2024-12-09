export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}

export interface GeneratePoemRequest {
  topic: string;
  level: string;
  format: 'poem';
}

export interface ValidateAnswerRequest {
  questionId: string;
  answer: string;
}