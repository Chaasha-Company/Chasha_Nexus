import type { FindBusinessTypeBySlugQuery } from '@/modules/v1/businesses/application';
import type { FindBusinessTypeBySlugRepositoryContract } from '@/modules/v1/businesses/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';
import { AppDataSource } from '@/shared/v1/database/core';
import { BusinessTypesModel } from '@/shared/v1/database/schema/businesses/children';

export const findBusinessTypeBySlugRepository =
  (): FindBusinessTypeBySlugRepositoryContract =>
  (businessData: FindBusinessTypeBySlugQuery, ctx?: TransactionContext): Promise<BusinessTypesModel | null> => {
    const businessTypeRepository = ctx ? ctx.getRepository(BusinessTypesModel) : AppDataSource.getRepository(BusinessTypesModel);

    return businessTypeRepository.findOne({
      where: {
        businessTypeSlug: businessData.businessTypeSlug,
      },
    });
  };
