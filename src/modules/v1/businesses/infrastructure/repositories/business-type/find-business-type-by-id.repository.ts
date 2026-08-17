import type { FindBusinessTypeByIdQuery } from '@/modules/v1/businesses/application';
import type { FindBusinessTypeByIdRepositoryContract } from '@/modules/v1/businesses/domain';
import type { EntityManager } from 'typeorm';
import { BusinessTypesModel } from '@/shared/v1/database/schema/businesses/childrens';
import { AppDataSource } from '@/shared/v1/database/core';

export const findBusinessTypeByIdRepository =
  (): FindBusinessTypeByIdRepositoryContract =>
  async (businessTypeData: FindBusinessTypeByIdQuery, manager?: EntityManager): Promise<BusinessTypesModel | null> => {
    const businessTypeRepository = manager ? manager.getRepository(BusinessTypesModel) : AppDataSource.getRepository(BusinessTypesModel);

    return businessTypeRepository.findOne({
      where: {
        businessTypeId: businessTypeData.businessTypeId,
      },
    });
  };
