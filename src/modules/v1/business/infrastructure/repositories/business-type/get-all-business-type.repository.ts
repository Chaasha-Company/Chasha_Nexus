import type { GetAllBusinessTypeRepositoryContract } from '@/modules/v1/business/domain';
import { AppDataSource } from '@/shared/v1/database/core';
import { BusinessTypesModel } from '@/shared/v1/database/schema/businesses/childrens';

export const getAllBusinessTypeRepository = (): GetAllBusinessTypeRepositoryContract => async (): Promise<BusinessTypesModel[]> => {
  const businessTypeRepository = AppDataSource.getRepository(BusinessTypesModel);

  return await businessTypeRepository.find();
};
