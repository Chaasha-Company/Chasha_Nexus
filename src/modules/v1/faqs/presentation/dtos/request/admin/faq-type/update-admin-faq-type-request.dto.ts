import type { ZodNumber, ZodOptional, ZodString } from 'zod';

export interface UpdateAdminFaqTypeRequestDTO {
  faqTypeId: number | ZodNumber;
  faqTypeNameFa?: string | ZodOptional<ZodString>;
  faqTypeNameEn?: string | ZodOptional<ZodString>;
  faqTypeSlug?: string | ZodOptional<ZodString>;
  faqTypeDescriptionFa?: string | ZodOptional<ZodString>;
  faqTypeDescriptionEn?: string | ZodOptional<ZodString>;
}
