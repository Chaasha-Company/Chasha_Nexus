import type { GetAllAdminFaqTypeQueryRequestDTO } from '@/modules/v1/faqs/presentation';
import type { FindPaginatedAdminFaqTypeQueryResult } from '../results';
import { findPaginatedAdminFaqTypeRepository } from '@/modules/v1/faqs/infrastructure';
import type { Language } from '@/infrastructure/translator-system/i18n';

export const findPaginatedAdminFaqTypeQueryHandler = async (faqTypeData: GetAllAdminFaqTypeQueryRequestDTO, _lang: Language): FindPaginatedAdminFaqTypeQueryResult => {
  const paginationPage = Number(faqTypeData.paginationPage);
  const paginationLimit = Number(faqTypeData.paginationLimit);
  const paginationSkip = (paginationPage - 1) * paginationLimit;

  const result = await findPaginatedAdminFaqTypeRepository()({
    faqTypeSearchQuery: faqTypeData.faqTypeSearch as string | undefined,
    faqTypePaginationSkip: paginationSkip,
    faqTypePaginationTake: paginationLimit,
  });

  return {
    count: result.count,
    data: result.data.map((item) => ({
      faqTypeId: item.faqTypeId,

      faqTypeNameFa: item.faqTypeNameFa,
      faqTypeNameEn: item.faqTypeNameEn,

      faqTypeSlug: item.faqTypeSlug,

      faqTypeDescriptionFa: item.faqTypeDescriptionFa,
      faqTypeDescriptionEn: item.faqTypeDescriptionEn,

      faqTypeSortOrder: item.faqTypeSortOrder,

      faqTypeIsActive: item.faqTypeIsActive,

      faqTypeCreatedAt: item.faqTypeCreatedAt,
      faqTypeUpdatedAt: item.faqTypeUpdatedAt,
    })),
  };
};
