import type { GetAllBusinessTypeRepositoryContract } from '@/modules/v1/businesses/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';
import { AppDataSource } from '@/shared/v1/database/core';
import { BusinessTypesModel } from '@/shared/v1/database/schema/businesses/children';

export const getAllBusinessTypeRepository =
  (): GetAllBusinessTypeRepositoryContract =>
  async (ctx?: TransactionContext): Promise<BusinessTypesModel[]> => {
    const businessTypeRepository = ctx ? ctx.getRepository(BusinessTypesModel) : AppDataSource.getRepository(BusinessTypesModel);

    return await businessTypeRepository.find({ cache: true });
  };
