import axios, { AxiosError } from 'axios';
import { API_CONFIG } from '../config';

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: API_CONFIG.baseUrl,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for common headers
apiClient.interceptors.request.use(
  (config) => {
    // Add any auth tokens or other headers here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling and retries
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const { response, config } = error;
    
    // Initialize retry count
    const retryCount = (config as any).retryCount || 0;
    
    // Implement retry logic for failed requests
    if (!response && retryCount < API_CONFIG.retryAttempts) {
      // Increment retry count
      (config as any).retryCount = retryCount + 1;
      
      // Implement exponential backoff
      const backoffTime = Math.min(1000 * (2 ** retryCount), 10000);
      await new Promise(resolve => setTimeout(resolve, backoffTime));
      
      return apiClient(config);
    }

    // Transform error response
    const errorResponse = {
      code: response?.status,
      message: response?.data?.message || 'An unexpected error occurred',
      details: response?.data
    };

    return Promise.reject(errorResponse);
  }
);