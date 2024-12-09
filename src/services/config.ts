export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.kaboetry.com/v1',
  timeout: 30000, // 30 seconds
  retryAttempts: 3,
  rateLimitDelay: 1000, // 1 second between retries
};

export const ERROR_CODES = {
  GENERATION_FAILED: 'GENERATION_FAILED',
  VALIDATION_FAILED: 'VALIDATION_FAILED',
  NETWORK_ERROR: 'NETWORK_ERROR',
  RATE_LIMIT: 'RATE_LIMIT',
  UNKNOWN: 'UNKNOWN',
} as const;

export type ErrorCode = keyof typeof ERROR_CODES;