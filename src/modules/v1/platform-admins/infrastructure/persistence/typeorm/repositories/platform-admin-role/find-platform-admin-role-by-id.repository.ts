import type { FindPlatformAdminRoleByIdRepositoryContract } from '@/modules/v1/platform-admins/domain';
import type { findPlatformAdminRoleByIdQuery } from '@/modules/v1/platform-admins/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';
import { PlatformAdminRolesModel } from '@/shared/v1/database/schema/platform_admins/children/platform-admin-roles';
import { AppDataSource } from '@/shared/v1/database/core';

export const findPlatformAdminRoleByIdRepository =
  (): FindPlatformAdminRoleByIdRepositoryContract =>
  async (platformAdminRoleData: findPlatformAdminRoleByIdQuery, ctx?: TransactionContext): Promise<PlatformAdminRolesModel | null> => {
    const platformAdminRepository = ctx ? ctx.getRepository(PlatformAdminRolesModel) : AppDataSource.getRepository(PlatformAdminRolesModel);

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
