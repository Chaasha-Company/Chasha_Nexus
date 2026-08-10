export interface GetAllGlobalFaqResponseDTO {
  faqQuestionFa: string;
  faqQuestionEn: string;

  faqAnswerFa: string;
  faqAnswerEn: string;

  faqSlug: string;
  faqSortOrder: number;

  faqIsActive: boolean;
}
