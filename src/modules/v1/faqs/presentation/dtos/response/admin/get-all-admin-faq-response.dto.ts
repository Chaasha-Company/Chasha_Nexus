export interface AdminFaqTypeResponseDTO {
  faqTypeId: number;
  faqTypeNameFa: string;
  faqTypeNameEn: string;
  faqTypeSlug: string;
  faqTypeSortOrder: number;
  faqTypeIsActive: boolean;
}

export interface GetAllAdminFaqResponseDTO {
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
