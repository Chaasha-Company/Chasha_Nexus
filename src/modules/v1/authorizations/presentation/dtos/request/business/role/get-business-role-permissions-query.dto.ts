import type { ZodString } from 'zod';

export interface GetBusinessRolePermissionsQueryDTO {
  businessRoleId: string | ZodString;
}
