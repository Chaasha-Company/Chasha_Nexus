import type { FindPlatformAdminPermissionsByIdsRepositoryContract } from '@/modules/v1/authorizations/domain';
import type { findPlatformAdminPermissionsByIdsQuery } from '@/modules/v1/authorizations/application';
import type { EntityManager } from 'typeorm';
import { In } from 'typeorm';
import { PermissionsModel } from '@/shared/v1/database/schema/permissions';
import { AppDataSource } from '@/shared/v1/database/core';

export const findPlatformAdminPermissionsByIdsRepository =
  (): FindPlatformAdminPermissionsByIdsRepositoryContract =>
  async (platformAdminPermissionsData: findPlatformAdminPermissionsByIdsQuery, manager?: EntityManager): Promise<PermissionsModel[]> => {
    if (platformAdminPermissionsData.platformAdminPermissionIds.length === 0) {
      return [];
    }

    const permissionRepository = manager ? manager.getRepository(PermissionsModel) : AppDataSource.getRepository(PermissionsModel);

    return await permissionRepository.find({
      where: {
        permissionId: In(platformAdminPermissionsData.platformAdminPermissionIds),
      },
    });
  };
