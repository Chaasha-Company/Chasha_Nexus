import type { FindPlatformAdminRolePermissionRepositoryContract } from '@/modules/v1/platform-admins/domain';
import type { findPlatformAdminRolePermissionQuery } from '@/modules/v1/platform-admins/application';
import type { EntityManager } from 'typeorm';
import { PlatformAdminRolePermissionsModel } from '@/shared/v1/database/schema/platform_admins/childrens';
import { AppDataSource } from '@/shared/v1/database/core';

export const findPlatformAdminRolePermissionRepository =
  (): FindPlatformAdminRolePermissionRepositoryContract =>
  async (platformAdminRolePermissionData: findPlatformAdminRolePermissionQuery, manager?: EntityManager): Promise<PlatformAdminRolePermissionsModel | null> => {
    const platformAdminRolePermissionRepository = manager ? manager.getRepository(PlatformAdminRolePermissionsModel) : AppDataSource.getRepository(PlatformAdminRolePermissionsModel);

    return await platformAdminRolePermissionRepository.findOne({
      where: {
        platformAdminRolePermissionRoleId: platformAdminRolePermissionData.platformAdminRolePermissionRoleId,
        platformAdminRolePermissionPermissionId: platformAdminRolePermissionData.platformAdminRolePermissionPermissionId,
      },
    });
  };
