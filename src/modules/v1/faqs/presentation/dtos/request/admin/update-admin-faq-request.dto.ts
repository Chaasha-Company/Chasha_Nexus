import type { ZodNumber, ZodOptional, ZodString } from 'zod';

export interface UpdateAdminFaqRequestDTO {
  faqId: number | ZodNumber;
  faqTypeId?: number | ZodOptional<ZodNumber>;
  faqQuestionFa?: string | ZodOptional<ZodString>;
  faqQuestionEn?: string | ZodOptional<ZodString>;
  faqAnswerFa?: string | ZodOptional<ZodString>;
  faqAnswerEn?: string | ZodOptional<ZodString>;
  faqSlug?: string | ZodOptional<ZodString>;
  faqSortOrder?: number | ZodOptional<ZodNumber>;
}
