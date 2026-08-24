import type { DeletePlatformAdminRolePermissionsRepositoryContract } from '@/modules/v1/platform-admins/domain';
import type { DeletePlatformAdminRoleCommand } from '@/modules/v1/platform-admins/application';
import type { EntityManager } from 'typeorm';

import { AppDataSource } from '@/shared/v1/database/core';
import { PlatformAdminRolePermissionsModel } from '@/shared/v1/database/schema/platform_admins/childrens';

export const deletePlatformAdminRolePermissionsRepository =
  (): DeletePlatformAdminRolePermissionsRepositoryContract =>
  async (deletePlatformAdminRolePermissionsData: DeletePlatformAdminRoleCommand, manager?: EntityManager): Promise<void> => {
    const platformAdminRolePermissionRepository = manager ? manager.getRepository(PlatformAdminRolePermissionsModel) : AppDataSource.getRepository(PlatformAdminRolePermissionsModel);

    await platformAdminRolePermissionRepository.softDelete({
      platformAdminRolePermissionRoleId: deletePlatformAdminRolePermissionsData.platformAdminRoleId,
    });
  };
