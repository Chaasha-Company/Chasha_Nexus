import type { CreateBusinessRoleRepositoryContract } from '@/modules/v1/businesses/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

import { AppDataSource } from '@/shared/v1/database/core';
import { BusinessRolesModel } from '@/shared/v1/database/schema/businesses/children';

export const createBusinessRoleRepository =
  (): CreateBusinessRoleRepositoryContract =>
  async (createBusinessRoleData, ctx?: TransactionContext): Promise<{ businessRoleId: string }> => {
    const businessRoleRepository = ctx ? ctx.getRepository(BusinessRolesModel) : AppDataSource.getRepository(BusinessRolesModel);

    const createdBusinessRole = await businessRoleRepository.save(
      businessRoleRepository.create({
        businessRoleBusinessId: createBusinessRoleData.businessRoleBusinessId,
        businessRoleKey: createBusinessRoleData.businessRoleKey,
        businessRoleNameFa: createBusinessRoleData.businessRoleNameFa,
        businessRoleNameEn: createBusinessRoleData.businessRoleNameEn,
        businessRoleDescriptionFa: createBusinessRoleData.businessRoleDescriptionFa,
        businessRoleDescriptionEn: createBusinessRoleData.businessRoleDescriptionEn,
      }),
    );

    return {
      businessRoleId: createdBusinessRole.businessRoleId,
    };
  };
