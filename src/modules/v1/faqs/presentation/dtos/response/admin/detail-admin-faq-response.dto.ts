import type { AdminFaqTypeResponseDTO } from './get-all-admin-faq-response.dto';

export interface DetailAdminFaqResponseDTO {
  faqId: number;
  faqTypeId: number;

  faqQuestionFa: string;
  faqQuestionEn: string;

  faqAnswerFa: string;
  faqAnswerEn: string;

  faqSlug: string;
  faqSortOrder: number;

  faqIsActive: boolean;

  faqType: AdminFaqTypeResponseDTO;

  faqCreatedAt: Date;
  faqUpdatedAt: Date;
}
