import type { ReplaceBusinessRolePermissionsCommand } from '@/modules/v1/businesses/application';
import type { DeleteBusinessRolePermissionsRepositoryContract } from '@/modules/v1/businesses/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

import { AppDataSource } from '@/shared/v1/database/core';
import { BusinessRolePermissionsModel } from '@/shared/v1/database/schema/businesses/children';

export const deleteBusinessRolePermissionsRepository =
  (): DeleteBusinessRolePermissionsRepositoryContract =>
  async (deleteBusinessRolePermissionsData: ReplaceBusinessRolePermissionsCommand, ctx?: TransactionContext): Promise<void> => {
    const businessRolePermissionRepository = ctx ? ctx.getRepository(BusinessRolePermissionsModel) : AppDataSource.getRepository(BusinessRolePermissionsModel);

    await businessRolePermissionRepository.softDelete({
      businessRolePermissionBusinessRoleId: deleteBusinessRolePermissionsData.businessRoleId,
    });
  };
