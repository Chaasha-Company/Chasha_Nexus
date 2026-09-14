import type { ZodString } from 'zod';

export interface AssignBusinessRolePermissionRequestDTO {
  businessRoleId: string | ZodString;
  businessPermissionId: string | ZodString;
}
