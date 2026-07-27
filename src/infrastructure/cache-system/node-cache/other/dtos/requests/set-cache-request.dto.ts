export interface SetCacheRequestDTO<T> {
  cacheName: string;
  cacheData: T;
  cacheTTL: number;
}
