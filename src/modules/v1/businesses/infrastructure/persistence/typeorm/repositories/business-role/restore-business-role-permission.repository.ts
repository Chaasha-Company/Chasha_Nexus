import type { UpdateBusinessRolePermissionCommand } from '@/modules/v1/businesses/application';
import type { RestoreBusinessRolePermissionRepositoryContract } from '@/modules/v1/businesses/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

import { AppDataSource } from '@/shared/v1/database/core';
import { BusinessRolePermissionsModel } from '@/shared/v1/database/schema/businesses/children';

export const restoreBusinessRolePermissionRepository =
  (): RestoreBusinessRolePermissionRepositoryContract =>
  async (restoreBusinessRolePermissionData: UpdateBusinessRolePermissionCommand, ctx?: TransactionContext): Promise<void> => {
    const businessRolePermissionRepository = ctx ? ctx.getRepository(BusinessRolePermissionsModel) : AppDataSource.getRepository(BusinessRolePermissionsModel);

    await businessRolePermissionRepository.restore({
      businessRolePermissionBusinessRoleId: restoreBusinessRolePermissionData.businessRoleId,
      businessRolePermissionPermissionId: restoreBusinessRolePermissionData.businessPermissionId,
    });
  };
