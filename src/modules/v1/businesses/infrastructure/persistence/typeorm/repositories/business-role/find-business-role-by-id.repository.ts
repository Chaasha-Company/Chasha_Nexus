import type { FindBusinessRoleByIdRepositoryContract } from '@/modules/v1/businesses/domain';
import type { findBusinessRoleByIdQuery } from '@/modules/v1/businesses/application/queries/business-role';
import type { TransactionContext } from '@/shared/v1/domain/contracts';
import { BusinessRolesModel } from '@/shared/v1/database/schema/businesses/children';
import { AppDataSource } from '@/shared/v1/database/core';

export const findBusinessRoleByIdRepository =
  (): FindBusinessRoleByIdRepositoryContract =>
  async (businessRoleData: findBusinessRoleByIdQuery, ctx?: TransactionContext): Promise<BusinessRolesModel | null> => {
    const businessRoleRepository = ctx ? ctx.getRepository(BusinessRolesModel) : AppDataSource.getRepository(BusinessRolesModel);

    return await businessRoleRepository.findOne({
      where: {
        businessRoleId: businessRoleData.businessRoleId,
      },
      relations: {
        businessRolePermissions: {
          businessRolePermissionPermission: true,
        },
      },
      cache: true,
    });
  };
