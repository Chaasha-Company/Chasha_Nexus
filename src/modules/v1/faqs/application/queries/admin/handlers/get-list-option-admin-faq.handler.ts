import type { GetListOptionAdminFaqQueryResult } from '../results';
import { findAllAdminFaqTypeRepository } from '@/modules/v1/faqs/infrastructure';
import type { Language } from '@/infrastructure/translator-system/i18n';

export const getListOptionAdminFaqQueryHandler = async (_lang: Language): GetListOptionAdminFaqQueryResult => {
  const faqTypes = await findAllAdminFaqTypeRepository()();

  return {
    faqSearch: [
      { faqSearchField: 'faqQuestionFa', faqSearchLabels: ['faqQuestionFa'] },
      { faqSearchField: 'faqQuestionEn', faqSearchLabels: ['faqQuestionEn'] },
      { faqSearchField: 'faqAnswerFa', faqSearchLabels: ['faqAnswerFa'] },
      { faqSearchField: 'faqAnswerEn', faqSearchLabels: ['faqAnswerEn'] },
      { faqSearchField: 'faqSlug', faqSearchLabels: ['faqSlug'] },
    ],

    faqFilters: {
      faqType: faqTypes.map((faqType) => ({
        faqTypeId: faqType.faqTypeId,
        faqTypeLabels: {
          fa: faqType.faqTypeNameFa,
          en: faqType.faqTypeNameEn,
        },
      })),
    },
  };
};
