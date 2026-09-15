import type { CreateAdminFaqTypeRepositoryContract } from '@/modules/v1/faqs/domain';
import type { CreateAdminFaqTypeCommand } from '@/modules/v1/faqs/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

import { AppDataSource } from '@/shared/v1/database/core';
import { FaqTypesModel } from '@/shared/v1/database/schema/faqs/children';

export const createAdminFaqTypeRepository =
  (): CreateAdminFaqTypeRepositoryContract =>
  async (createAdminFaqTypeData: CreateAdminFaqTypeCommand, ctx?: TransactionContext): Promise<FaqTypesModel> => {
    const faqTypeRepository = ctx ? ctx.getRepository(FaqTypesModel) : AppDataSource.getRepository(FaqTypesModel);

    const faqTypeData = faqTypeRepository.create({
      faqTypeNameFa: createAdminFaqTypeData.faqTypeNameFa,
      faqTypeNameEn: createAdminFaqTypeData.faqTypeNameEn ?? '',
      faqTypeSlug: createAdminFaqTypeData.faqTypeSlug,
      faqTypeDescriptionFa: createAdminFaqTypeData.faqTypeDescriptionFa,
      faqTypeDescriptionEn: createAdminFaqTypeData.faqTypeDescriptionEn ?? '',
    });

    return await faqTypeRepository.save(faqTypeData);
  };
