import type { FindFaqTypeBySlugQuery } from '@/modules/v1/faqs/application';
import type { FindFaqTypeBySlugRepositoryContract } from '@/modules/v1/faqs/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';
import { FaqTypesModel } from '@/shared/v1/database/schema/faqs';
import { AppDataSource } from '@/shared/v1/database/core';

export const findFaqTypeBySlugRepository =
  (): FindFaqTypeBySlugRepositoryContract =>
  async (faqTypeData: FindFaqTypeBySlugQuery, ctx?: TransactionContext): Promise<null | FaqTypesModel> => {
    const faqTypeRepository = ctx ? ctx.getRepository(FaqTypesModel) : AppDataSource.getRepository(FaqTypesModel);

    return await faqTypeRepository.findOne({
      where: {
        faqTypeSlug: faqTypeData.faqTypeSlug,
      },
      cache: true,
    });
  };
