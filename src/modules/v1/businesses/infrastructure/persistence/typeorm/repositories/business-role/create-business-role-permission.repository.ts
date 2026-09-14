import type { AssignBusinessRolePermissionCommand } from '@/modules/v1/businesses/application';
import type { CreateBusinessRolePermissionRepositoryContract } from '@/modules/v1/businesses/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

import { AppDataSource } from '@/shared/v1/database/core';
import { BusinessRolePermissionsModel } from '@/shared/v1/database/schema/businesses/children';

export const createBusinessRolePermissionRepository =
  (): CreateBusinessRolePermissionRepositoryContract =>
  async (createBusinessRolePermissionData: AssignBusinessRolePermissionCommand, ctx?: TransactionContext): Promise<{ businessRolePermissionId: string }> => {
    const businessRolePermissionRepository = ctx ? ctx.getRepository(BusinessRolePermissionsModel) : AppDataSource.getRepository(BusinessRolePermissionsModel);

    const createdBusinessRolePermission = await businessRolePermissionRepository.save(
      businessRolePermissionRepository.create({
        businessRolePermissionBusinessRoleId: createBusinessRolePermissionData.businessRoleId,
        businessRolePermissionPermissionId: createBusinessRolePermissionData.businessPermissionId,
      }),
    );

    return {
      businessRolePermissionId: createdBusinessRolePermission.businessRolePermissionId,
    };
  };
