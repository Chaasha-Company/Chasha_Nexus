import type { PaginationMeta } from './pagination-meta-response.interface';

export interface PaginationResponse<T> {
  paginationItems: T[];
  paginationMeta: PaginationMeta;
}
