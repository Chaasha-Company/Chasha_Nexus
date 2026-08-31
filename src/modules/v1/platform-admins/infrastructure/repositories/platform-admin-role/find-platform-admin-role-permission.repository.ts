import type { FindPlatformAdminRolePermissionRepositoryContract } from '@/modules/v1/platform-admins/domain';
import type { findPlatformAdminRolePermissionQuery } from '@/modules/v1/platform-admins/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';
import { PlatformAdminRolePermissionsModel } from '@/shared/v1/database/schema/platform_admins/childrens';
import { AppDataSource } from '@/shared/v1/database/core';

export const findPlatformAdminRolePermissionRepository =
  (): FindPlatformAdminRolePermissionRepositoryContract =>
  async (platformAdminRolePermissionData: findPlatformAdminRolePermissionQuery, ctx?: TransactionContext): Promise<PlatformAdminRolePermissionsModel | null> => {
    const platformAdminRolePermissionRepository = ctx ? ctx.getRepository(PlatformAdminRolePermissionsModel) : AppDataSource.getRepository(PlatformAdminRolePermissionsModel);

    return await platformAdminRolePermissionRepository.findOne({
      where: {
        platformAdminRolePermissionRoleId: platformAdminRolePermissionData.platformAdminRolePermissionRoleId,
        platformAdminRolePermissionPermissionId: platformAdminRolePermissionData.platformAdminRolePermissionPermissionId,
      },
    });
  };
