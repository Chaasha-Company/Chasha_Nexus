import type { PaginationQueryRequestDTO } from '@/shared/v1/interfaces/config/api/query';
import type { ZodOptional, ZodString } from 'zod';

export type GetAllPlatformAdminRoleRequestQueryDTO = PaginationQueryRequestDTO & {
  platformAdminRoleSearch?: string | ZodOptional<ZodString>;
  platformAdminRoleIsActive?: string | ZodOptional<ZodString>;
};
