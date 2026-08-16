export interface PaginationResponseRepository<T> {
  data: T[];
  count: number;
}
