import type { ZodString } from 'zod';

export interface RemoveBusinessRolePermissionRequestDTO {
  businessRoleId: string | ZodString;
  businessPermissionId: string | ZodString;
}
