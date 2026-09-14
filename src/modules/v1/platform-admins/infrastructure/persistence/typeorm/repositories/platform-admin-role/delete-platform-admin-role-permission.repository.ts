import type { DeletePlatformAdminRolePermissionRepositoryContract } from '@/modules/v1/platform-admins/domain';
import type { findPlatformAdminRolePermissionQuery } from '@/modules/v1/platform-admins/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

import { AppDataSource } from '@/shared/v1/database/core';
import { PlatformAdminRolePermissionsModel } from '@/shared/v1/database/schema/platform_admins/children';

export const deletePlatformAdminRolePermissionRepository =
  (): DeletePlatformAdminRolePermissionRepositoryContract =>
  async (deletePlatformAdminRolePermissionData: findPlatformAdminRolePermissionQuery, ctx?: TransactionContext): Promise<void> => {
    const platformAdminRolePermissionRepository = ctx ? ctx.getRepository(PlatformAdminRolePermissionsModel) : AppDataSource.getRepository(PlatformAdminRolePermissionsModel);

    await platformAdminRolePermissionRepository.softDelete({
      platformAdminRolePermissionRoleId: deletePlatformAdminRolePermissionData.platformAdminRolePermissionRoleId,
      platformAdminRolePermissionPermissionId: deletePlatformAdminRolePermissionData.platformAdminRolePermissionPermissionId,
    });
  };
