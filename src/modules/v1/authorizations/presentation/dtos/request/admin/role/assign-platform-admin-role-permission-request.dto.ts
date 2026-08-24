import type { ZodString } from 'zod';

export interface AssignPlatformAdminRolePermissionRequestDTO {
  platformAdminRoleId: string | ZodString;
  platformAdminPermissionId: string | ZodString;
}
