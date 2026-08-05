import type { FindPlatformAdminRoleByIdRepositoryContract } from '@/modules/v1/platform-admins/domain';
import type { findPlatformAdminRoleByIdQuery } from '@/modules/v1/platform-admins/application';
import { PlatformAdminRolesModel } from '@/shared/v1/database/schema/platform_admins/childrens/platform-admin-roles';
import { AppDataSource } from '@/shared/v1/database/core';

export const findPlatformAdminRoleByIdRepository =
  (): FindPlatformAdminRoleByIdRepositoryContract =>
  async (platformAdminRoleData: findPlatformAdminRoleByIdQuery): Promise<PlatformAdminRolesModel | null> => {
    const platformAdminRepository = AppDataSource.getRepository(PlatformAdminRolesModel);

    return await platformAdminRepository.findOne({
      where: {
        platformAdminRoleId: platformAdminRoleData.platformAdminRoleId,
      },
      relations: {
        platformAdminRolePermissions: {
          platformAdminRolePermissionPermission: true,
        },
      },
    });
  };
