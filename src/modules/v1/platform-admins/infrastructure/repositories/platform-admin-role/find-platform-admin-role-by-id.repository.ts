import type { FindPlatformAdminRoleByIdRepositoryContract } from '@/modules/v1/platform-admins/domain';
import type { findPlatformAdminRoleByIdQuery } from '@/modules/v1/platform-admins/application';
import type { EntityManager } from 'typeorm';
import { PlatformAdminRolesModel } from '@/shared/v1/database/schema/platform_admins/childrens/platform-admin-roles';
import { AppDataSource } from '@/shared/v1/database/core';

export const findPlatformAdminRoleByIdRepository =
  (): FindPlatformAdminRoleByIdRepositoryContract =>
  async (platformAdminRoleData: findPlatformAdminRoleByIdQuery, manager?: EntityManager): Promise<PlatformAdminRolesModel | null> => {
    const platformAdminRepository = manager ? manager.getRepository(PlatformAdminRolesModel) : AppDataSource.getRepository(PlatformAdminRolesModel);

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
