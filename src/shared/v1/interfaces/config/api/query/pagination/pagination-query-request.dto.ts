import type { ZodString } from 'zod';

export interface PaginationQueryRequestDTO {
  paginationPage: string | ZodString;
  paginationLimit: string | ZodString;
}
