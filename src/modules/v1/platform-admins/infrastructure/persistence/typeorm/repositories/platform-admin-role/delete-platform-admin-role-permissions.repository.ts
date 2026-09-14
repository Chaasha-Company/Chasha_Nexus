import type { DeletePlatformAdminRolePermissionsRepositoryContract } from '@/modules/v1/platform-admins/domain';
import type { DeletePlatformAdminRoleCommand } from '@/modules/v1/platform-admins/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

import { AppDataSource } from '@/shared/v1/database/core';
import { PlatformAdminRolePermissionsModel } from '@/shared/v1/database/schema/platform_admins/children';

export const deletePlatformAdminRolePermissionsRepository =
  (): DeletePlatformAdminRolePermissionsRepositoryContract =>
  async (deletePlatformAdminRolePermissionsData: DeletePlatformAdminRoleCommand, ctx?: TransactionContext): Promise<void> => {
    const platformAdminRolePermissionRepository = ctx ? ctx.getRepository(PlatformAdminRolePermissionsModel) : AppDataSource.getRepository(PlatformAdminRolePermissionsModel);

    await platformAdminRolePermissionRepository.softDelete({
      platformAdminRolePermissionRoleId: deletePlatformAdminRolePermissionsData.platformAdminRoleId,
    });
  };
