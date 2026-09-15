import type { DeleteAdminFaqTypeRepositoryContract } from '@/modules/v1/faqs/domain';
import type { DeleteAdminFaqTypeCommand } from '@/modules/v1/faqs/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

import { AppDataSource } from '@/shared/v1/database/core';
import { FaqTypesModel } from '@/shared/v1/database/schema/faqs/children';

export const deleteAdminFaqTypeRepository =
  (): DeleteAdminFaqTypeRepositoryContract =>
  async (deleteAdminFaqTypeData: DeleteAdminFaqTypeCommand, ctx?: TransactionContext): Promise<void> => {
    const faqTypeRepository = ctx ? ctx.getRepository(FaqTypesModel) : AppDataSource.getRepository(FaqTypesModel);

    await faqTypeRepository.softDelete({
      faqTypeId: deleteAdminFaqTypeData.faqTypeId,
    });
  };
