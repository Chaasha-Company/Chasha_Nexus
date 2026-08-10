import type { RateLimitCacheEntry, RateLimitOptions } from '@/shared/v1/types/auth/rate-limit';
import type { NextFunction, Request, Response } from 'express';

import { getCacheHelper, setCacheHelper, updateCacheHelper } from '@/infrastructure/cache-system/node-cache';
import { throwTooManyRequestException } from '@/shared/v1/exceptions';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';
import { ResponseMessage } from '@/shared/v1/enums';

export const rateLimitMiddleware =
  (rateLimitOptions: RateLimitOptions) =>
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const cacheKey = rateLimitOptions.keyGenerator(req);
    const currentTime = Date.now();

    const getCache = getCacheHelper();
    const setCache = setCacheHelper();
    const updateCache = updateCacheHelper();

    const rateLimitCacheEntry = getCache<RateLimitCacheEntry>({
      cacheName: cacheKey,
    });

    if (!rateLimitCacheEntry || currentTime >= rateLimitCacheEntry.resetAt) {
      const rateLimitCacheData: RateLimitCacheEntry = {
        count: 1,
        resetAt: currentTime + rateLimitOptions.windowMs,
      };

      setCache<RateLimitCacheEntry>({
        cacheName: cacheKey,
        cacheData: rateLimitCacheData,
        cacheTTL: Math.ceil(rateLimitOptions.windowMs / 1000),
      });

      next();

      return;
    }

    if (rateLimitCacheEntry.count >= rateLimitOptions.max) {
      throwTooManyRequestException({
        message: t(ResponseMessages, ResponseMessage.TOO_MANY_REQUESTS, req.lang),
        details: {
          limitResetAt: [new Date(rateLimitCacheEntry.resetAt).toISOString()],
          limitRoute: [req.baseUrl + req.path],
        },
      });

      return;
    }

    const updatedRateLimitCacheData: RateLimitCacheEntry = {
      count: rateLimitCacheEntry.count + 1,
      resetAt: rateLimitCacheEntry.resetAt,
    };

    const remainingCacheTTL = Math.max(Math.ceil((rateLimitCacheEntry.resetAt - currentTime) / 1000), 1);

    updateCache<RateLimitCacheEntry>({
      cacheName: cacheKey,
      newCacheData: updatedRateLimitCacheData,
      newCacheTTL: remainingCacheTTL,
    });

    next();
  };
