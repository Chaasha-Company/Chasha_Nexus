import type { PaginationQueryRequestDTO } from '@/shared/v1/interfaces/config/api/query';
import type { ZodOptional, ZodString } from 'zod';

export type GetAllAdminFaqTypeQueryRequestDTO = PaginationQueryRequestDTO & {
  faqTypeSearch?: string | ZodOptional<ZodString>;
};
