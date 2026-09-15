import type { FindAdminFaqBySlugQuery } from '@/modules/v1/faqs/application';
import type { FindAdminFaqBySlugRepositoryContract } from '@/modules/v1/faqs/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

import { AppDataSource } from '@/shared/v1/database/core';
import { FaqsModel } from '@/shared/v1/database/schema/faqs';

export const findAdminFaqBySlugRepository =
  (): FindAdminFaqBySlugRepositoryContract =>
  async (faqData: FindAdminFaqBySlugQuery, ctx?: TransactionContext): Promise<null | FaqsModel> => {
    const faqRepository = ctx ? ctx.getRepository(FaqsModel) : AppDataSource.getRepository(FaqsModel);

    return await faqRepository.findOne({
      where: {
        faqSlug: faqData.faqSlug,
      },
    });
  };
