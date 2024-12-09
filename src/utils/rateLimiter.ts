import { sleep } from './sleep';

export class RateLimiter {
  private queue: Array<() => Promise<any>> = [];
  private isProcessing = false;
  private lastRequestTime = 0;
  private readonly minDelay = 500; // Minimum delay between requests in ms

  async enqueue<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await this.executeWithBackoff(fn);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      
      if (!this.isProcessing) {
        this.processQueue();
      }
    });
  }

  private async executeWithBackoff<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const timeSinceLastRequest = Date.now() - this.lastRequestTime;
        if (timeSinceLastRequest < this.minDelay) {
          await sleep(this.minDelay - timeSinceLastRequest);
        }

        this.lastRequestTime = Date.now();
        return await fn();
      } catch (error: any) {
        if (error?.code === 'rate_limit_exceeded') {
          const retryAfter = parseInt(error?.error?.message?.match(/try again in (\d+)ms/)?.[1] || '1000');
          await sleep(retryAfter);
          continue;
        }
        throw error;
      }
    }
    throw new Error('Max retries exceeded');
  }

  private async processQueue() {
    if (this.isProcessing || this.queue.length === 0) return;
    
    this.isProcessing = true;
    
    while (this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) {
        await task();
      }
    }
    
    this.isProcessing = false;
  }
}