import type { FindBusinessTypeByIdQuery } from '@/modules/v1/businesses/application';
import type { FindBusinessTypeByIdRepositoryContract } from '@/modules/v1/businesses/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';
import { BusinessTypesModel } from '@/shared/v1/database/schema/businesses/childrens';
import { AppDataSource } from '@/shared/v1/database/core';

export const findBusinessTypeByIdRepository =
  (): FindBusinessTypeByIdRepositoryContract =>
  async (businessTypeData: FindBusinessTypeByIdQuery, ctx?: TransactionContext): Promise<BusinessTypesModel | null> => {
    const businessTypeRepository = ctx ? ctx.getRepository(BusinessTypesModel) : AppDataSource.getRepository(BusinessTypesModel);

    return businessTypeRepository.findOne({
      where: {
        businessTypeId: businessTypeData.businessTypeId,
      },
    });
  };
