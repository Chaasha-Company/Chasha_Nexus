import type { FindAllPlatformAdminPermissionByRoleIdQuery } from '@/modules/v1/authorizations/application';
import type { EntityManager } from 'typeorm';
import type { FindAllPlatformAdminPermissionByRoleIdRepositoryContract } from '@/modules/v1/authorizations/domain';
import { PlatformAdminRolePermissionsModel } from '@/shared/v1/database/schema/platform_admins/childrens/platform-admin-roles';
import { AppDataSource } from '@/shared/v1/database/core';

export const findAllPlatformAdminPermissionByRoleIdRepository =
  (): FindAllPlatformAdminPermissionByRoleIdRepositoryContract =>
  async (platformAdminPermissionData: FindAllPlatformAdminPermissionByRoleIdQuery, manager?: EntityManager): Promise<PlatformAdminRolePermissionsModel[]> => {
    const platformAdminPermissionRoleRepository = manager ? manager.getRepository(PlatformAdminRolePermissionsModel) : AppDataSource.getRepository(PlatformAdminRolePermissionsModel);

    return platformAdminPermissionRoleRepository.find({
      where: {
        platformAdminRolePermissionRoleId: platformAdminPermissionData.platformAdminPermissionRoleId,
      },
      relations: {
        platformAdminRolePermissionPermission: true,
      },
    });
  };
