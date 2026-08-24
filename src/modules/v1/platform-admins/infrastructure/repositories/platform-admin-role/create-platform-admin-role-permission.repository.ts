import type { CreatePlatformAdminRolePermissionRepositoryContract } from '@/modules/v1/platform-admins/domain';
import type { findPlatformAdminRolePermissionQuery } from '@/modules/v1/platform-admins/application';
import type { EntityManager } from 'typeorm';

import { AppDataSource } from '@/shared/v1/database/core';
import { PlatformAdminRolePermissionsModel } from '@/shared/v1/database/schema/platform_admins/childrens';

export const createPlatformAdminRolePermissionRepository =
  (): CreatePlatformAdminRolePermissionRepositoryContract =>
  async (createPlatformAdminRolePermissionData: findPlatformAdminRolePermissionQuery, manager?: EntityManager): Promise<{ platformAdminRolePermissionId: string }> => {
    const platformAdminRolePermissionRepository = manager ? manager.getRepository(PlatformAdminRolePermissionsModel) : AppDataSource.getRepository(PlatformAdminRolePermissionsModel);

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
