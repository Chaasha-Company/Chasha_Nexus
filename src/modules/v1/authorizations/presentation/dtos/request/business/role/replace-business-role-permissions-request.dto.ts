import type { ZodArray, ZodString } from 'zod';

export interface ReplaceBusinessRolePermissionsRequestDTO {
  businessRoleId: string | ZodString;
  businessPermissionIds: string[] | ZodArray<ZodString>;
}
