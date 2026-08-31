import type { FindPlatformAdminPermissionsByIdsRepositoryContract } from '@/modules/v1/authorizations/domain';
import type { findPlatformAdminPermissionsByIdsQuery } from '@/modules/v1/authorizations/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';
import { In } from 'typeorm';
import { PermissionsModel } from '@/shared/v1/database/schema/permissions';
import { AppDataSource } from '@/shared/v1/database/core';

export const findPlatformAdminPermissionsByIdsRepository =
  (): FindPlatformAdminPermissionsByIdsRepositoryContract =>
  async (platformAdminPermissionsData: findPlatformAdminPermissionsByIdsQuery, ctx?: TransactionContext): Promise<PermissionsModel[]> => {
    if (platformAdminPermissionsData.platformAdminPermissionIds.length === 0) {
      return [];
    }

    const permissionRepository = ctx ? ctx.getRepository(PermissionsModel) : AppDataSource.getRepository(PermissionsModel);

    return await permissionRepository.find({
      where: {
        permissionId: In(platformAdminPermissionsData.platformAdminPermissionIds),
      },
    });
  };
