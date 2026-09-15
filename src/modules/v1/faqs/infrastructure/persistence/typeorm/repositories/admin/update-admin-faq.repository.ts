import type { UpdateAdminFaqRepositoryContract } from '@/modules/v1/faqs/domain';
import type { UpdateAdminFaqCommand } from '@/modules/v1/faqs/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

import { AppDataSource } from '@/shared/v1/database/core';
import { FaqsModel } from '@/shared/v1/database/schema/faqs';

export const updateAdminFaqRepository =
  (): UpdateAdminFaqRepositoryContract =>
  async (updateAdminFaqData: UpdateAdminFaqCommand, ctx?: TransactionContext): Promise<void> => {
    const faqRepository = ctx ? ctx.getRepository(FaqsModel) : AppDataSource.getRepository(FaqsModel);

    const { faqId, ...updateData } = updateAdminFaqData;

    await faqRepository.update(
      {
        faqId,
      },
      updateData,
    );
  };
