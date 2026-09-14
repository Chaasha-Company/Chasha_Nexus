import type { FindBusinessRoleByKeyQuery } from '@/modules/v1/businesses/application';
import type { FindBusinessRoleByKeyRepositoryContract } from '@/modules/v1/businesses/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

import { AppDataSource } from '@/shared/v1/database/core';
import { BusinessRolesModel } from '@/shared/v1/database/schema/businesses/children';

export const findBusinessRoleByKeyRepository =
  (): FindBusinessRoleByKeyRepositoryContract =>
  async (businessRoleData: FindBusinessRoleByKeyQuery, ctx?: TransactionContext): Promise<BusinessRolesModel | null> => {
    const businessRoleRepository = ctx ? ctx.getRepository(BusinessRolesModel) : AppDataSource.getRepository(BusinessRolesModel);

    return businessRoleRepository.findOne({
      where: {
        businessRoleKey: businessRoleData.businessRoleKey,
        businessRoleBusinessId: businessRoleData.businessRoleBusinessId,
      },
      cache: true,
    });
  };
