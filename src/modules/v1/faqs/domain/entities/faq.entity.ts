import type { FaqTypesEntity } from './faq-type.entity';

export interface FaqsEntity {
  faqId: number;
  faqTypeId: number;
  faqQuestionFa: string;
  faqQuestionEn: string;
  faqAnswerFa: string;
  faqAnswerEn: string;
  faqSlug: string;
  faqSortOrder: number;
  faqIsActive: boolean;
  faqType: FaqTypesEntity;
  faqCreatedAt: Date;
  faqUpdatedAt: Date;
  faqDeletedAt: Date | null;
}
