import type { FindBusinessRolePermissionQuery } from '@/modules/v1/businesses/application';
import type { FindBusinessRolePermissionRepositoryContract } from '@/modules/v1/businesses/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

import { AppDataSource } from '@/shared/v1/database/core';
import { BusinessRolePermissionsModel } from '@/shared/v1/database/schema/businesses/children';

export const findBusinessRolePermissionRepository =
  (): FindBusinessRolePermissionRepositoryContract =>
  async (businessRolePermissionData: FindBusinessRolePermissionQuery, ctx?: TransactionContext): Promise<BusinessRolePermissionsModel | null> => {
    const businessRolePermissionRepository = ctx ? ctx.getRepository(BusinessRolePermissionsModel) : AppDataSource.getRepository(BusinessRolePermissionsModel);

    return businessRolePermissionRepository.findOne({
      where: {
        businessRolePermissionBusinessRoleId: businessRolePermissionData.businessRolePermissionBusinessRoleId,
        businessRolePermissionPermissionId: businessRolePermissionData.businessRolePermissionPermissionId,
      },
      withDeleted: true,
    });
  };
