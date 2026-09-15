import type { FindAdminFaqTypeBySlugQuery } from '@/modules/v1/faqs/application';
import type { FindAdminFaqTypeBySlugRepositoryContract } from '@/modules/v1/faqs/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

import { AppDataSource } from '@/shared/v1/database/core';
import { FaqTypesModel } from '@/shared/v1/database/schema/faqs/children';

export const findAdminFaqTypeBySlugRepository =
  (): FindAdminFaqTypeBySlugRepositoryContract =>
  async (faqTypeData: FindAdminFaqTypeBySlugQuery, ctx?: TransactionContext): Promise<null | FaqTypesModel> => {
    const faqTypeRepository = ctx ? ctx.getRepository(FaqTypesModel) : AppDataSource.getRepository(FaqTypesModel);

    return await faqTypeRepository.findOne({
      where: {
        faqTypeSlug: faqTypeData.faqTypeSlug,
      },
    });
  };
