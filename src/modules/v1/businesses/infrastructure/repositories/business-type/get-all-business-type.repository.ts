import type { GetAllBusinessTypeRepositoryContract } from '@/modules/v1/businesses/domain';
import type { EntityManager } from 'typeorm';
import { AppDataSource } from '@/shared/v1/database/core';
import { BusinessTypesModel } from '@/shared/v1/database/schema/businesses/childrens';

export const getAllBusinessTypeRepository =
  (): GetAllBusinessTypeRepositoryContract =>
  async (manager?: EntityManager): Promise<BusinessTypesModel[]> => {
    const businessTypeRepository = manager ? manager.getRepository(BusinessTypesModel) : AppDataSource.getRepository(BusinessTypesModel);

    return await businessTypeRepository.find({ cache: true });
  };
