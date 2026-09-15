export interface CreateAdminFaqCommand {
  faqTypeId: number;
  faqQuestionFa: string;
  faqQuestionEn?: string;
  faqAnswerFa: string;
  faqAnswerEn?: string;
  faqSlug: string;
  faqSortOrder: number;
}
