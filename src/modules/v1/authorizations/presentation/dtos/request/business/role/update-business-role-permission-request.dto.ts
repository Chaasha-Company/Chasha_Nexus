import type { ZodString, ZodBoolean } from 'zod';

export interface UpdateBusinessRolePermissionRequestDTO {
  businessRoleId: string | ZodString;
  businessPermissionId: string | ZodString;
  enabled: boolean | ZodBoolean;
}
