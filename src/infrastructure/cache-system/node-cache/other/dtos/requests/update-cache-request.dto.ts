export interface UpdateCacheRequestDTO<T> {
  cacheName: string;
  newCacheData: T;
  newCacheTTL: number;
}
