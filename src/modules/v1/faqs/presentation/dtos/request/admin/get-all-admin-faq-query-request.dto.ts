import type { PaginationQueryRequestDTO } from '@/shared/v1/interfaces/config/api/query';
import type { ZodOptional, ZodString } from 'zod';

export type GetAllAdminFaqQueryRequestDTO = PaginationQueryRequestDTO & {
  faqSearch?: string | ZodOptional<ZodString>;
  faqTypeId?: string | ZodOptional<ZodString>;
};
