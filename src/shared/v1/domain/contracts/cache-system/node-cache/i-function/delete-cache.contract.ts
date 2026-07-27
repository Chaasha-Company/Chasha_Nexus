import type { DeleteCacheRequestDTO } from '@/infrastructure/cache-system';

export type DeleteCacheFunctionContract = (deleteCacheData: DeleteCacheRequestDTO) => boolean;
