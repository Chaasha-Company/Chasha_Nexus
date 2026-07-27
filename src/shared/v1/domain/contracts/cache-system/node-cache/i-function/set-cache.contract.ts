import type { SetCacheRequestDTO } from '@/infrastructure/cache-system';

export type SetCacheFunctionContract = <T>(setCacheData: SetCacheRequestDTO<T>) => void;
