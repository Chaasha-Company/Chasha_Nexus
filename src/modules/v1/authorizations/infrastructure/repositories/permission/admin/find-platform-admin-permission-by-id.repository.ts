import type { FindPlatformAdminPermissionByIdRepositoryContract } from '@/modules/v1/authorizations/domain';
import type { findPlatformAdminPermissionByIdQuery } from '@/modules/v1/authorizations/application';
import type { EntityManager } from 'typeorm';
import { PermissionsModel } from '@/shared/v1/database/schema/permissions';
import { AppDataSource } from '@/shared/v1/database/core';

export const findPlatformAdminPermissionByIdRepository =
  (): FindPlatformAdminPermissionByIdRepositoryContract =>
  async (platformAdminPermissionData: findPlatformAdminPermissionByIdQuery, manager?: EntityManager): Promise<PermissionsModel | null> => {
    const permissionRepository = manager ? manager.getRepository(PermissionsModel) : AppDataSource.getRepository(PermissionsModel);

    return await permissionRepository.findOne({
      where: {
        permissionId: platformAdminPermissionData.platformAdminPermissionId,
      },
    });
  };
