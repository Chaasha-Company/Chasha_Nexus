import type { FindPaginatedAdminFaqTypeQuery } from '@/modules/v1/faqs/application';
import type { FindPaginatedAdminFaqTypeRepositoryContract } from '@/modules/v1/faqs/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';
import type { PaginationResponseRepository } from '@/shared/v1/database/types';

import { AppDataSource } from '@/shared/v1/database/core';
import { FaqTypesModel } from '@/shared/v1/database/schema/faqs/children';

export const findPaginatedAdminFaqTypeRepository =
  (): FindPaginatedAdminFaqTypeRepositoryContract =>
  async (faqTypeData: FindPaginatedAdminFaqTypeQuery, ctx?: TransactionContext): Promise<PaginationResponseRepository<FaqTypesModel>> => {
    const faqTypeRepository = ctx ? ctx.getRepository(FaqTypesModel) : AppDataSource.getRepository(FaqTypesModel);

    const queryBuilder = faqTypeRepository.createQueryBuilder('faqType');

    if (faqTypeData.faqTypeSearchQuery !== undefined && faqTypeData.faqTypeSearchQuery !== '') {
      queryBuilder.andWhere('(faqType.faqTypeNameFa LIKE :search OR faqType.faqTypeNameEn LIKE :search OR faqType.faqTypeSlug LIKE :search OR faqType.faqTypeDescriptionFa LIKE :search OR faqType.faqTypeDescriptionEn LIKE :search)', {
        search: `%${faqTypeData.faqTypeSearchQuery}%`,
      });
    }

    const cacheKey = ['faq-types', 'admin', faqTypeData.faqTypeSearchQuery ?? '', faqTypeData.faqTypePaginationSkip, faqTypeData.faqTypePaginationTake].join(':');

    queryBuilder.skip(faqTypeData.faqTypePaginationSkip).take(faqTypeData.faqTypePaginationTake).orderBy('faqType.faqTypeSortOrder', 'ASC').addOrderBy('faqType.faqTypeId', 'ASC').cache(cacheKey, 30_000);

    const [data, count] = await queryBuilder.getManyAndCount();

    return {
      data,
      count,
    };
  };
