import { nodeCacheConfig, type GetCacheRequestDTO } from '@/infrastructure/cache-system';
import type { GetCacheFunctionContract } from '@/shared/v1/domain/contracts/cache-system';

export const getCacheHelper =
  (): GetCacheFunctionContract =>
  <T>(getCacheData: GetCacheRequestDTO): T | undefined => {
    return nodeCacheConfig.get<T>(getCacheData.cacheName);
  };
