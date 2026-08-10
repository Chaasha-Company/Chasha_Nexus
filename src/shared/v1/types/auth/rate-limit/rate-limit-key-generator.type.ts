import type { Request } from 'express';

export type RateLimitKeyGenerator = (request: Request) => string;
