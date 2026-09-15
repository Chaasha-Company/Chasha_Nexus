import type { GetAllGlobalFaqQueryRequestDTO } from '@/modules/v1/faqs/presentation';
import type { FindAllFaqByTypeQueryResult } from '../results';
import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import { throwNotFoundException } from '@/shared/v1/exceptions';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';
import { findAllFaqByTypeRepository, findFaqTypeBySlugRepository } from '@/modules/v1/faqs/infrastructure';

export const findAllFaqByTypeQueryHandler = async (faqData: GetAllGlobalFaqQueryRequestDTO, lang: Language): FindAllFaqByTypeQueryResult => {
  const paginationPage = Number(faqData.paginationPage);
  const paginationLimit = Number(faqData.paginationLimit);
  const paginationSkip = (paginationPage - 1) * paginationLimit;

  const faqType = await findFaqTypeBySlugRepository()({
    faqTypeSlug: faqData.faqType as 'landing' | 'business',
  });

  if (faqType === null) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        faqType: [t(ValidationMessages, ValidationMessage.FAQ_TYPE_INVALID, lang)],
      },
    });
  }

  const result = await findAllFaqByTypeRepository()({
    faqTypeId: faqType?.faqTypeId as number,
    faqSearchQuery: faqData.faqSearch as string | undefined,
    faqPaginationSkip: paginationSkip,
    faqPaginationTake: paginationLimit,
  });

  return {
    count: result.count,
    data: result.data.map((item) => ({
      faqQuestionFa: item.faqQuestionFa,
      faqQuestionEn: item.faqQuestionEn,

      faqAnswerFa: item.faqAnswerFa,
      faqAnswerEn: item.faqAnswerEn,

      faqSlug: item.faqSlug,
      faqSortOrder: item.faqSortOrder,

      faqIsActive: item.faqIsActive,
    })),
  };
};
