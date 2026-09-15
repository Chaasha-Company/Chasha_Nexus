import type { DeleteAdminFaqRepositoryContract } from '@/modules/v1/faqs/domain';
import type { DeleteAdminFaqCommand } from '@/modules/v1/faqs/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

import { AppDataSource } from '@/shared/v1/database/core';
import { FaqsModel } from '@/shared/v1/database/schema/faqs';

export const deleteAdminFaqRepository =
  (): DeleteAdminFaqRepositoryContract =>
  async (deleteAdminFaqData: DeleteAdminFaqCommand, ctx?: TransactionContext): Promise<void> => {
    const faqRepository = ctx ? ctx.getRepository(FaqsModel) : AppDataSource.getRepository(FaqsModel);

    await faqRepository.softDelete({
      faqId: deleteAdminFaqData.faqId,
    });
  };
