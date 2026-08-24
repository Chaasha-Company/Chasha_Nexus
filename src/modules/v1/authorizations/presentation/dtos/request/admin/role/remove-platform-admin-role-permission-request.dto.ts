import type { ZodString } from 'zod';

export interface RemovePlatformAdminRolePermissionRequestDTO {
  platformAdminRoleId: string | ZodString;
  platformAdminPermissionId: string | ZodString;
}
