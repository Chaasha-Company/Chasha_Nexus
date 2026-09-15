import type { GetAllAdminFaqQueryRequestDTO } from '@/modules/v1/faqs/presentation';
import type { FindAllAdminFaqQueryResult } from '../results';
import { findAllAdminFaqRepository } from '@/modules/v1/faqs/infrastructure';
import type { Language } from '@/infrastructure/translator-system/i18n';

export const findAllAdminFaqQueryHandler = async (faqData: GetAllAdminFaqQueryRequestDTO, _lang: Language): FindAllAdminFaqQueryResult => {
  const paginationPage = Number(faqData.paginationPage);
  const paginationLimit = Number(faqData.paginationLimit);
  const paginationSkip = (paginationPage - 1) * paginationLimit;

  const result = await findAllAdminFaqRepository()({
    faqSearchQuery: faqData.faqSearch as string | undefined,
    faqTypeIdQuery: faqData.faqTypeId === undefined ? undefined : Number(faqData.faqTypeId),
    faqPaginationSkip: paginationSkip,
    faqPaginationTake: paginationLimit,
  });

  return {
    count: result.count,
    data: result.data.map((item) => ({
      faqId: item.faqId,
      faqTypeId: item.faqTypeId,

      faqQuestionFa: item.faqQuestionFa,
      faqQuestionEn: item.faqQuestionEn,

      faqAnswerFa: item.faqAnswerFa,
      faqAnswerEn: item.faqAnswerEn,

      faqSlug: item.faqSlug,
      faqSortOrder: item.faqSortOrder,

      faqIsActive: item.faqIsActive,

      faqType: {
        faqTypeId: item.faqType.faqTypeId,
        faqTypeNameFa: item.faqType.faqTypeNameFa,
        faqTypeNameEn: item.faqType.faqTypeNameEn,
        faqTypeSlug: item.faqType.faqTypeSlug,
        faqTypeSortOrder: item.faqType.faqTypeSortOrder,
        faqTypeIsActive: item.faqType.faqTypeIsActive,
      },

      faqCreatedAt: item.faqCreatedAt,
      faqUpdatedAt: item.faqUpdatedAt,
    })),
  };
};
