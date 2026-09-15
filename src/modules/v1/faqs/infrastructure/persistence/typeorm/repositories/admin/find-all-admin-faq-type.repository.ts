import type { FindAllAdminFaqTypeRepositoryContract } from '@/modules/v1/faqs/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

import { AppDataSource } from '@/shared/v1/database/core';
import { FaqTypesModel } from '@/shared/v1/database/schema/faqs/children';

export const findAllAdminFaqTypeRepository =
  (): FindAllAdminFaqTypeRepositoryContract =>
  async (ctx?: TransactionContext): Promise<FaqTypesModel[]> => {
    const faqTypeRepository = ctx ? ctx.getRepository(FaqTypesModel) : AppDataSource.getRepository(FaqTypesModel);

    return await faqTypeRepository.find({
      order: {
        faqTypeSortOrder: 'ASC',
        faqTypeId: 'ASC',
      },
      cache: true,
    });
  };
