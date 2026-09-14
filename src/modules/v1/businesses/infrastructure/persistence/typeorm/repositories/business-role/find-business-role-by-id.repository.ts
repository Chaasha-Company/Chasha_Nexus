import type { findBusinessRoleByIdQuery } from '@/modules/v1/businesses/application/queries/business-role';
import type { FindBusinessRoleByIdRepositoryContract } from '@/modules/v1/businesses/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

import { AppDataSource } from '@/shared/v1/database/core';
import { BusinessRolesModel } from '@/shared/v1/database/schema/businesses/children';

export const findBusinessRoleByIdRepository =
  (): FindBusinessRoleByIdRepositoryContract =>
  async (businessRoleData: findBusinessRoleByIdQuery, ctx?: TransactionContext): Promise<BusinessRolesModel | null> => {
    const businessRoleRepository = ctx ? ctx.getRepository(BusinessRolesModel) : AppDataSource.getRepository(BusinessRolesModel);

    return businessRoleRepository.findOne({
      where: {
        businessRoleId: businessRoleData.businessRoleId,
        ...(businessRoleData.businessRoleBusinessId !== undefined && {
          businessRoleBusinessId: businessRoleData.businessRoleBusinessId,
        }),
      },
      relations: {
        businessRolePermissions: {
          businessRolePermissionPermission: true,
        },
      },
      cache: true,
    });
  };
