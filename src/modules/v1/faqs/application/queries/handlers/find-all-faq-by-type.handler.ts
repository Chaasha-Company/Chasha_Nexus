import type { GetAllGlobalFaqQueryRequestDTO, GetAllGlobalFaqResponseDTO } from '@/modules/v1/faqs/presentation';
import type { FaqsModel } from '@/shared/v1/database/schema/faqs';
import { findAllFaqByTypeRepository, findFaqTypeBySlugRepository } from '@/modules/v1/faqs/infrastructure';

export const findAllFaqByTypeQueryHandler = async (faqData: GetAllGlobalFaqQueryRequestDTO): Promise<GetAllGlobalFaqResponseDTO[]> => {
  const faqType = await findFaqTypeBySlugRepository()({
    faqTypeSlug: faqData.faqType as 'landing' | 'business',
  });

  const faqs = await findAllFaqByTypeRepository()({
    faqTypeId: faqType?.faqTypeId as number,
  });

  return (faqs as FaqsModel[]).map((item) => ({
    faqQuestionFa: item.faqQuestionFa,
    faqQuestionEn: item.faqQuestionEn,

    faqAnswerFa: item.faqAnswerFa,
    faqAnswerEn: item.faqAnswerEn,

    faqSlug: item.faqSlug,
    faqSortOrder: item.faqSortOrder,

    faqIsActive: item.faqIsActive,
  }));
};
