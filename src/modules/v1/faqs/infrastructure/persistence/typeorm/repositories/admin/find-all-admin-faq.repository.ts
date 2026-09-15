import type { FindAllAdminFaqQuery } from '@/modules/v1/faqs/application';
import type { FindAllAdminFaqRepositoryContract } from '@/modules/v1/faqs/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';
import type { PaginationResponseRepository } from '@/shared/v1/database/types';

import { AppDataSource } from '@/shared/v1/database/core';
import { FaqsModel } from '@/shared/v1/database/schema/faqs';

export const findAllAdminFaqRepository =
  (): FindAllAdminFaqRepositoryContract =>
  async (faqData: FindAllAdminFaqQuery, ctx?: TransactionContext): Promise<PaginationResponseRepository<FaqsModel>> => {
    const faqRepository = ctx ? ctx.getRepository(FaqsModel) : AppDataSource.getRepository(FaqsModel);

    const queryBuilder = faqRepository.createQueryBuilder('faq');

    queryBuilder.leftJoinAndSelect('faq.faqType', 'faqType');

    if (faqData.faqTypeIdQuery !== undefined) {
      queryBuilder.andWhere('faq.faqTypeId = :faqTypeId', {
        faqTypeId: faqData.faqTypeIdQuery,
      });
    }

    if (faqData.faqSearchQuery !== undefined && faqData.faqSearchQuery !== '') {
      queryBuilder.andWhere('(faq.faqQuestionFa LIKE :search OR faq.faqQuestionEn LIKE :search OR faq.faqAnswerFa LIKE :search OR faq.faqAnswerEn LIKE :search OR faq.faqSlug LIKE :search)', {
        search: `%${faqData.faqSearchQuery}%`,
      });
    }

    const cacheKey = ['faqs', 'admin', faqData.faqTypeIdQuery ?? '', faqData.faqSearchQuery ?? '', faqData.faqPaginationSkip, faqData.faqPaginationTake].join(':');

    queryBuilder.skip(faqData.faqPaginationSkip).take(faqData.faqPaginationTake).orderBy('faq.faqSortOrder', 'ASC').addOrderBy('faq.faqId', 'ASC').cache(cacheKey, 30_000);

    const [data, count] = await queryBuilder.getManyAndCount();

    return {
      data,
      count,
    };
  };
