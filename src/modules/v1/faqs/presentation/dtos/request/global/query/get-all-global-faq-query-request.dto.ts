import type { PaginationQueryRequestDTO } from '@/shared/v1/interfaces/config/api/query';
import type { ZodEnum, ZodOptional, ZodString } from 'zod';

export type GetAllGlobalFaqQueryRequestDTO = PaginationQueryRequestDTO & {
  faqType: 'landing' | 'business' | ZodEnum<{ landing: 'landing'; business: 'business' }>;
  faqSearch?: string | ZodOptional<ZodString>;
};
