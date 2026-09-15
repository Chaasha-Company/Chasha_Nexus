import type { ZodOptional, ZodString } from 'zod';

export interface CreateAdminFaqTypeRequestDTO {
  faqTypeNameFa: string | ZodString;
  faqTypeNameEn?: string | ZodOptional<ZodString>;
  faqTypeSlug: string | ZodString;
  faqTypeDescriptionFa: string | ZodString;
  faqTypeDescriptionEn?: string | ZodOptional<ZodString>;
}
