import type { ZodArray, ZodString } from 'zod';

export interface ReplacePlatformAdminRolePermissionsRequestDTO {
  platformAdminRoleId: string | ZodString;
  permissionIds: string[] | ZodArray<ZodString>;
}
