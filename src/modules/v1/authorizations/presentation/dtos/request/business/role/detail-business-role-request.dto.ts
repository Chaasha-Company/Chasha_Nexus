import type { ZodString } from 'zod';

export interface DetailBusinessRoleRequestDTO {
  businessRoleId: string | ZodString;
}
