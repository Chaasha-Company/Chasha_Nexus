import type { ZodOptional, ZodString } from 'zod';

export interface CreateBusinessRoleRequestDTO {
  businessRoleKey: string | ZodString;
  businessRoleNameFa: string | ZodString;
  businessRoleNameEn: string | ZodString;
  businessRoleDescriptionFa?: string | ZodOptional<ZodString>;
  businessRoleDescriptionEn?: string | ZodOptional<ZodString>;
}
