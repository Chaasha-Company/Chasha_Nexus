import type { FindBusisnessRoleByIdRepositoryContract } from '@/modules/v1/businesses/domain';
import type { findBusinessRoleByIdQuery } from '@/modules/v1/businesses/application/queries/business-role';
import { BusinessRolesModel } from '@/shared/v1/database/schema/businesses/childrens';
import { AppDataSource } from '@/shared/v1/database/core';

export const findBusinessRoleByIdRepository =
  (): FindBusisnessRoleByIdRepositoryContract =>
  async (businessRoleData: findBusinessRoleByIdQuery): Promise<BusinessRolesModel | null> => {
    const businessRoleRepository = AppDataSource.getRepository(BusinessRolesModel);

    return await businessRoleRepository.findOne({
      where: {
        businessRoleId: businessRoleData.businessRoleId,
      },
      relations: {
        businessRolePermissions: {
          businessRolePermissionPermission: true,
        },
      },
    });
  };
