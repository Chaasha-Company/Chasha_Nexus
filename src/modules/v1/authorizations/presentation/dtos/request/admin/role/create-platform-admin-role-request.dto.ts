import type { ZodOptional, ZodString } from 'zod';

export interface CreatePlatformAdminRoleRequestDTO {
  platformAdminRoleKey: string | ZodString;
  platformAdminRoleNameFa: string | ZodString;
  platformAdminRoleNameEn: string | ZodString;
  platformAdminRoleDescriptionFa?: string | ZodOptional<ZodString>;
  platformAdminRoleDescriptionEn?: string | ZodOptional<ZodString>;
}
