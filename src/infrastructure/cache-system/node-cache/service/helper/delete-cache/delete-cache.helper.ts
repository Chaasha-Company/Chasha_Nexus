import { nodeCacheConfig, type DeleteCacheRequestDTO } from '@/infrastructure/cache-system';
import type { DeleteCacheFunctionContract } from '@/shared/v1/domain/contracts/cache-system';

export const deleteCacheHelper =
  (): DeleteCacheFunctionContract =>
  (deleteCacheData: DeleteCacheRequestDTO): boolean => {
    return nodeCacheConfig.del(deleteCacheData.cacheName) > 1;
  };
