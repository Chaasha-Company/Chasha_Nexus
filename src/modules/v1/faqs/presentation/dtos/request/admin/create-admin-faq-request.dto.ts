import type { ZodNumber, ZodOptional, ZodString } from 'zod';

export interface CreateAdminFaqRequestDTO {
  faqTypeId: number | ZodNumber;
  faqQuestionFa: string | ZodString;
  faqQuestionEn?: string | ZodOptional<ZodString>;
  faqAnswerFa: string | ZodString;
  faqAnswerEn?: string | ZodOptional<ZodString>;
  faqSlug: string | ZodString;
  faqSortOrder: number | ZodNumber;
}
