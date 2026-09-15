import type { AtLeastOne } from '@/shared/v1/types/other';

export type UpdateAdminFaqCommand = AtLeastOne<{
  faqId: number;
  faqTypeId?: number;
  faqQuestionFa?: string;
  faqQuestionEn?: string;
  faqAnswerFa?: string;
  faqAnswerEn?: string;
  faqSlug?: string;
  faqSortOrder?: number;
}>;
