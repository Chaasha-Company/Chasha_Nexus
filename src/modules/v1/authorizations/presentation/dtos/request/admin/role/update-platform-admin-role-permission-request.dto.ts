import type { ZodString, ZodBoolean } from 'zod';

export interface UpdatePlatformAdminRolePermissionRequestDTO {
  platformAdminRoleId: string | ZodString;
  platformAdminPermissionId: string | ZodString;
  enabled: boolean | ZodBoolean;
}
