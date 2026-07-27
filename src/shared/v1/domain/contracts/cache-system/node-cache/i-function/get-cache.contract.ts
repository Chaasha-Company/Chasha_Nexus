import type { GetCacheRequestDTO } from '@/infrastructure/cache-system';

export type GetCacheFunctionContract = <T>(getCacheData: GetCacheRequestDTO) => T | undefined;
