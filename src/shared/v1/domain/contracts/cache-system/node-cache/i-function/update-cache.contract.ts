import type { UpdateCacheRequestDTO } from '@/infrastructure/cache-system';

export type UpdateCacheFunctionContract = <T>(newCacheData: UpdateCacheRequestDTO<T>) => void;
