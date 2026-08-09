import type { FindBusinessTypeBySlugQuery } from '@/modules/v1/businesses/application';
import type { FindBusinessTypeBySlugRepositoryContract } from '@/modules/v1/businesses/domain';
import type { EntityManager } from 'typeorm';
import { AppDataSource } from '@/shared/v1/database/core';
import { BusinessTypesModel } from '@/shared/v1/database/schema/businesses/childrens';

export const findBusinessTypeBySlugRepository =
  (): FindBusinessTypeBySlugRepositoryContract =>
  (businessData: FindBusinessTypeBySlugQuery, manager?: EntityManager): Promise<BusinessTypesModel | null> => {
    const businessTypeRepository = manager ? manager.getRepository(BusinessTypesModel) : AppDataSource.getRepository(BusinessTypesModel);

    return businessTypeRepository.findOne({
      where: {
        businessTypeSlug: businessData.businessTypeSlug,
      },
    });
  };
