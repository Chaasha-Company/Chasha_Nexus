import type { PaginationQueryRequestDTO } from '@/shared/v1/interfaces/config/api/query';
import type { ZodOptional, ZodString } from 'zod';

export type GetAllBusinessRoleQueryDTO = PaginationQueryRequestDTO & {
  businessRoleSearch?: string | ZodOptional<ZodString>;
  businessRoleIsActive?: string | ZodOptional<ZodString>;
};
