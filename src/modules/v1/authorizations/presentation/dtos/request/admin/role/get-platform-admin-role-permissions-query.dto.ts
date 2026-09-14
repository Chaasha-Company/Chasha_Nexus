import type { ZodString } from 'zod';

export interface GetPlatformAdminRolePermissionsQueryDTO {
  platformAdminRoleId: string | ZodString;
}
