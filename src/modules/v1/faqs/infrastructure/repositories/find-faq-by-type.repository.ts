import type { FindAllFaqByTypeQuery } from '@/modules/v1/faqs/application';
import type { FindAllFaqByTypeRepositoryContract } from '@/modules/v1/faqs/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';
import { FaqsModel } from '@/shared/v1/database/schema/faqs';
import { AppDataSource } from '@/shared/v1/database/core';

export const findAllFaqByTypeRepository =
  (): FindAllFaqByTypeRepositoryContract =>
  async (faqData: FindAllFaqByTypeQuery, ctx?: TransactionContext): Promise<null | FaqsModel[]> => {
    const faqRepository = ctx ? ctx.getRepository(FaqsModel) : AppDataSource.getRepository(FaqsModel);

    return await faqRepository.find({
      where: {
        faqTypeId: faqData.faqTypeId,
      },
      cache: true,
    });
  };
