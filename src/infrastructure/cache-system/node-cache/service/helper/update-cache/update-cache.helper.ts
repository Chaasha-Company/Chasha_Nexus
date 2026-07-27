import { nodeCacheConfig, type UpdateCacheRequestDTO } from '@/infrastructure/cache-system';
import type { UpdateCacheFunctionContract } from '@/shared/v1/domain/contracts/cache-system';

export const updateCacheHelper =
  (): UpdateCacheFunctionContract =>
  <T>(newCacheData: UpdateCacheRequestDTO<T>): void => {
    nodeCacheConfig.set<T>(newCacheData.cacheName, newCacheData.newCacheData, newCacheData.newCacheTTL);
  };
