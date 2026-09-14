import type { FindAllPlatformAdminPermissionByRoleIdQuery } from '@/modules/v1/authorizations/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';
import type { FindAllPlatformAdminPermissionByRoleIdRepositoryContract } from '@/modules/v1/authorizations/domain';
import { PlatformAdminRolePermissionsModel } from '@/shared/v1/database/schema/platform_admins/children/platform-admin-roles';
import { AppDataSource } from '@/shared/v1/database/core';

export const findAllPlatformAdminPermissionByRoleIdRepository =
  (): FindAllPlatformAdminPermissionByRoleIdRepositoryContract =>
  async (platformAdminPermissionData: FindAllPlatformAdminPermissionByRoleIdQuery, ctx?: TransactionContext): Promise<PlatformAdminRolePermissionsModel[]> => {
    const platformAdminPermissionRoleRepository = ctx ? ctx.getRepository(PlatformAdminRolePermissionsModel) : AppDataSource.getRepository(PlatformAdminRolePermissionsModel);

    return platformAdminPermissionRoleRepository.find({
      where: {
        platformAdminRolePermissionRoleId: platformAdminPermissionData.platformAdminPermissionRoleId,
      },
      relations: {
        platformAdminRolePermissionPermission: true,
      },
    });
  };
