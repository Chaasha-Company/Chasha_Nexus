import type { RateLimitKeyGenerator } from './rate-limit-key-generator.type';

export type RateLimitOptions = {
  windowMs: number;
  max: number;
  keyGenerator: RateLimitKeyGenerator;
};
