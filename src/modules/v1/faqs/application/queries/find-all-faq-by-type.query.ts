export interface FindAllFaqByTypeQuery {
  faqTypeId: number;
  faqSearchQuery?: string;
  faqPaginationSkip: number;
  faqPaginationTake: number;
}
