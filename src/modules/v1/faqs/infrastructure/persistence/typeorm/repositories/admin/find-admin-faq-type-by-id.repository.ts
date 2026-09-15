import type { FindAdminFaqTypeByIdQuery } from '@/modules/v1/faqs/application';
import type { FindAdminFaqTypeByIdRepositoryContract } from '@/modules/v1/faqs/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

import { AppDataSource } from '@/shared/v1/database/core';
import { FaqTypesModel } from '@/shared/v1/database/schema/faqs/children';

export const findAdminFaqTypeByIdRepository =
  (): FindAdminFaqTypeByIdRepositoryContract =>
  async (faqTypeData: FindAdminFaqTypeByIdQuery, ctx?: TransactionContext): Promise<null | FaqTypesModel> => {
    const faqTypeRepository = ctx ? ctx.getRepository(FaqTypesModel) : AppDataSource.getRepository(FaqTypesModel);

    return await faqTypeRepository.findOne({
      where: {
        faqTypeId: faqTypeData.faqTypeId,
      },
    });
  };
