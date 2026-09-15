import type { AtLeastOne } from '@/shared/v1/types/other';

export type UpdateAdminFaqTypeCommand = AtLeastOne<{
  faqTypeId: number;
  faqTypeNameFa?: string;
  faqTypeNameEn?: string;
  faqTypeSlug?: string;
  faqTypeDescriptionFa?: string;
  faqTypeDescriptionEn?: string;
}>;
