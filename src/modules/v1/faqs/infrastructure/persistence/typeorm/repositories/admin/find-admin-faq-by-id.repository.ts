import type { FindAdminFaqByIdQuery } from '@/modules/v1/faqs/application';
import type { FindAdminFaqByIdRepositoryContract } from '@/modules/v1/faqs/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

import { AppDataSource } from '@/shared/v1/database/core';
import { FaqsModel } from '@/shared/v1/database/schema/faqs';

export const findAdminFaqByIdRepository =
  (): FindAdminFaqByIdRepositoryContract =>
  async (faqData: FindAdminFaqByIdQuery, ctx?: TransactionContext): Promise<null | FaqsModel> => {
    const faqRepository = ctx ? ctx.getRepository(FaqsModel) : AppDataSource.getRepository(FaqsModel);

    return await faqRepository.findOne({
      where: {
        faqId: faqData.faqId,
      },
      relations: {
        faqType: true,
      },
    });
  };
