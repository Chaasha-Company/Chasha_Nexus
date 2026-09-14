import type { ZodOptional, ZodString } from 'zod';

export interface UpdateBusinessRoleRequestDTO {
  businessRoleId: string | ZodString;
  businessRoleNameFa?: string | ZodOptional<ZodString>;
  businessRoleNameEn?: string | ZodOptional<ZodString>;
  businessRoleDescriptionFa?: string | ZodOptional<ZodString>;
  businessRoleDescriptionEn?: string | ZodOptional<ZodString>;
}
