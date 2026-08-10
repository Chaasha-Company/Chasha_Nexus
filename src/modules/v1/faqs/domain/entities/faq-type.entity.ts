import type { FaqsEntity } from './faq.entity';

export interface FaqTypesEntity {
  faqTypeId: number;
  faqTypeNameFa: string;
  faqTypeNameEn: string;
  faqTypeSlug: string;
  faqTypeDescriptionFa: string;
  faqTypeDescriptionEn: string;
  faqTypeSortOrder: number;
  faqTypeIsActive: boolean;
  faqTypeFaqs: FaqsEntity[];
  faqTypeCreatedAt: Date;
  faqTypeUpdatedAt: Date;
  faqTypeDeletedAt: Date | null;
}
