import { nodeCacheConfig, type SetCacheRequestDTO } from '@/infrastructure/cache-system';
import type { SetCacheFunctionContract } from '@/shared/v1/domain/contracts/cache-system';

export const setCacheHelper =
  (): SetCacheFunctionContract =>
  <T>(setCacheData: SetCacheRequestDTO<T>): void => {
    nodeCacheConfig.set<T>(setCacheData.cacheName, setCacheData.cacheData, setCacheData.cacheTTL);
  };
