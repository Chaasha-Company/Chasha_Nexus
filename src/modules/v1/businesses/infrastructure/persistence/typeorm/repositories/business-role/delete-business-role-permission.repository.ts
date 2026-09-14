import type { RemoveBusinessRolePermissionCommand } from '@/modules/v1/businesses/application';
import type { DeleteBusinessRolePermissionRepositoryContract } from '@/modules/v1/businesses/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

import { AppDataSource } from '@/shared/v1/database/core';
import { BusinessRolePermissionsModel } from '@/shared/v1/database/schema/businesses/children';

export const deleteBusinessRolePermissionRepository =
  (): DeleteBusinessRolePermissionRepositoryContract =>
  async (deleteBusinessRolePermissionData: RemoveBusinessRolePermissionCommand, ctx?: TransactionContext): Promise<void> => {
    const businessRolePermissionRepository = ctx ? ctx.getRepository(BusinessRolePermissionsModel) : AppDataSource.getRepository(BusinessRolePermissionsModel);

    await businessRolePermissionRepository.softDelete({
      businessRolePermissionBusinessRoleId: deleteBusinessRolePermissionData.businessRoleId,
      businessRolePermissionPermissionId: deleteBusinessRolePermissionData.businessPermissionId,
    });
  };
