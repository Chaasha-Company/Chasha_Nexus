import type { FindBusinessTypeBySlugQuery } from '@/modules/v1/businesses/application';
import type { FindBusinessTypeBySlugRepositoryContract } from '@/modules/v1/businesses/domain';
import { AppDataSource } from '@/shared/v1/database/core';
import { BusinessTypesModel } from '@/shared/v1/database/schema/businesses/childrens';

export const findBusinessTypeBySlugRepository =
  (): FindBusinessTypeBySlugRepositoryContract =>
  (businessData: FindBusinessTypeBySlugQuery): Promise<BusinessTypesModel | null> => {
    const businessTypeRepository = AppDataSource.getRepository(BusinessTypesModel);

    return businessTypeRepository.findOne({
      where: {
        businessTypeSlug: businessData.businessTypeSlug,
      },
    });
  };
