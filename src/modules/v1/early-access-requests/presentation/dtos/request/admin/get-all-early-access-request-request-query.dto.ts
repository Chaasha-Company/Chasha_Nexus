import type { PaginationQueryRequestDTO } from '@/shared/v1/interfaces/config/api/query';
import type { ZodOptional, ZodString } from 'zod';

export type GetAllEarlyAccessRequestRequestQueryDTO = PaginationQueryRequestDTO & {
  earlyAccessRequestSearch?: string | ZodOptional<ZodString>;
  earlyAccessRequestStatusId?: string | ZodOptional<ZodString>;
};
