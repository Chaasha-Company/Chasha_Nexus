import type { GetListOptionAdminFaqTypeQueryResult } from '../results';
import type { Language } from '@/infrastructure/translator-system/i18n';

export const getListOptionAdminFaqTypeQueryHandler = async (_lang: Language): GetListOptionAdminFaqTypeQueryResult => {
  return {
    faqTypeSearch: [
      { faqTypeSearchField: 'faqTypeNameFa', faqTypeSearchLabels: ['faqTypeNameFa'] },
      { faqTypeSearchField: 'faqTypeNameEn', faqTypeSearchLabels: ['faqTypeNameEn'] },
      { faqTypeSearchField: 'faqTypeSlug', faqTypeSearchLabels: ['faqTypeSlug'] },
      { faqTypeSearchField: 'faqTypeDescriptionFa', faqTypeSearchLabels: ['faqTypeDescriptionFa'] },
      { faqTypeSearchField: 'faqTypeDescriptionEn', faqTypeSearchLabels: ['faqTypeDescriptionEn'] },
    ],
  };
};
