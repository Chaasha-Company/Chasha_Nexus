import type { ZodString } from 'zod';

export interface DeleteBusinessRoleRequestDTO {
  businessRoleId: string | ZodString;
}
