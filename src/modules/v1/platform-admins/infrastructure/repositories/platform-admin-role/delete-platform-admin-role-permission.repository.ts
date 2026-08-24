import type { DeletePlatformAdminRolePermissionRepositoryContract } from '@/modules/v1/platform-admins/domain';
import type { findPlatformAdminRolePermissionQuery } from '@/modules/v1/platform-admins/application';
import type { EntityManager } from 'typeorm';

import { AppDataSource } from '@/shared/v1/database/core';
import { PlatformAdminRolePermissionsModel } from '@/shared/v1/database/schema/platform_admins/childrens';

export const deletePlatformAdminRolePermissionRepository =
  (): DeletePlatformAdminRolePermissionRepositoryContract =>
  async (deletePlatformAdminRolePermissionData: findPlatformAdminRolePermissionQuery, manager?: EntityManager): Promise<void> => {
    const platformAdminRolePermissionRepository = manager ? manager.getRepository(PlatformAdminRolePermissionsModel) : AppDataSource.getRepository(PlatformAdminRolePermissionsModel);

    await platformAdminRolePermissionRepository.softDelete({
      platformAdminRolePermissionRoleId: deletePlatformAdminRolePermissionData.platformAdminRolePermissionRoleId,
      platformAdminRolePermissionPermissionId: deletePlatformAdminRolePermissionData.platformAdminRolePermissionPermissionId,
    });
  };
