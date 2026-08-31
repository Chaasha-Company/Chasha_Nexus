import type { FindPlatformAdminPermissionByIdRepositoryContract } from '@/modules/v1/authorizations/domain';
import type { findPlatformAdminPermissionByIdQuery } from '@/modules/v1/authorizations/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';
import { PermissionsModel } from '@/shared/v1/database/schema/permissions';
import { AppDataSource } from '@/shared/v1/database/core';

export const findPlatformAdminPermissionByIdRepository =
  (): FindPlatformAdminPermissionByIdRepositoryContract =>
  async (platformAdminPermissionData: findPlatformAdminPermissionByIdQuery, ctx?: TransactionContext): Promise<PermissionsModel | null> => {
    const permissionRepository = ctx ? ctx.getRepository(PermissionsModel) : AppDataSource.getRepository(PermissionsModel);

    return await permissionRepository.findOne({
      where: {
        permissionId: platformAdminPermissionData.platformAdminPermissionId,
      },
    });
  };
