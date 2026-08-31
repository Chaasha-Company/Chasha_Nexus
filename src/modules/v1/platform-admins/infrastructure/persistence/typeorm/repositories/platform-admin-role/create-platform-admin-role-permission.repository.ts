import type { CreatePlatformAdminRolePermissionRepositoryContract } from '@/modules/v1/platform-admins/domain';
import type { findPlatformAdminRolePermissionQuery } from '@/modules/v1/platform-admins/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

import { AppDataSource } from '@/shared/v1/database/core';
import { PlatformAdminRolePermissionsModel } from '@/shared/v1/database/schema/platform_admins/childrens';

export const createPlatformAdminRolePermissionRepository =
  (): CreatePlatformAdminRolePermissionRepositoryContract =>
  async (createPlatformAdminRolePermissionData: findPlatformAdminRolePermissionQuery, ctx?: TransactionContext): Promise<{ platformAdminRolePermissionId: string }> => {
    const platformAdminRolePermissionRepository = ctx ? ctx.getRepository(PlatformAdminRolePermissionsModel) : AppDataSource.getRepository(PlatformAdminRolePermissionsModel);

    const createdPlatformAdminRolePermission = await platformAdminRolePermissionRepository.save(
      platformAdminRolePermissionRepository.create({
        platformAdminRolePermissionRoleId: createPlatformAdminRolePermissionData.platformAdminRolePermissionRoleId,
        platformAdminRolePermissionPermissionId: createPlatformAdminRolePermissionData.platformAdminRolePermissionPermissionId,
      }),
    );

    return {
      platformAdminRolePermissionId: createdPlatformAdminRolePermission.platformAdminRolePermissionId,
    };
  };
