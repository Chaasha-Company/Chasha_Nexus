import type { CacheInvalidationPort } from '@/shared/v1/domain/contracts/cache-invalidation.contract';
import { AppDataSource } from '@/shared/v1/database/core';

export const createTypeOrmCacheInvalidation = (): CacheInvalidationPort => {
  return async (cacheKeys: string[]): Promise<void> => {
    await AppDataSource.queryResultCache?.remove(cacheKeys);
  };
};
