import type { Language } from '@/infrastructure/translator-system/i18n';

export interface GetListOptionAdminFaqResponseDTO {
  faqSearch: {
    faqSearchField: string;
    faqSearchLabels: string[];
  }[];

  faqFilters: {
    faqType: {
      faqTypeId: number;
      faqTypeLabels: Record<Language, string>;
    }[];
  };
}
