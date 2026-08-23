import type { ZodOptional, ZodString } from 'zod';

export interface UpdatePlatformAdminRoleRequestDTO {
  platformAdminRoleId: string | ZodString;
  platformAdminRoleNameFa?: string | ZodOptional<ZodString>;
  platformAdminRoleNameEn?: string | ZodOptional<ZodString>;
  platformAdminRoleDescriptionFa?: string | ZodOptional<ZodString>;
  platformAdminRoleDescriptionEn?: string | ZodOptional<ZodString>;
}
