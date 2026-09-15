import type { UpdateAdminFaqTypeRepositoryContract } from '@/modules/v1/faqs/domain';
import type { UpdateAdminFaqTypeCommand } from '@/modules/v1/faqs/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

import { AppDataSource } from '@/shared/v1/database/core';
import { FaqTypesModel } from '@/shared/v1/database/schema/faqs/children';

export const updateAdminFaqTypeRepository =
  (): UpdateAdminFaqTypeRepositoryContract =>
  async (updateAdminFaqTypeData: UpdateAdminFaqTypeCommand, ctx?: TransactionContext): Promise<void> => {
    const faqTypeRepository = ctx ? ctx.getRepository(FaqTypesModel) : AppDataSource.getRepository(FaqTypesModel);

    const { faqTypeId, ...updateData } = updateAdminFaqTypeData;

    await faqTypeRepository.update(
      {
        faqTypeId,
      },
      updateData,
    );
  };
