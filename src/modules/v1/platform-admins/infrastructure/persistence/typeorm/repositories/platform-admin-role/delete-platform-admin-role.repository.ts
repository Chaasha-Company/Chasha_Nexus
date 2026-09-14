import type { DeletePlatformAdminRoleRepositoryContract } from '@/modules/v1/platform-admins/domain';
import type { DeletePlatformAdminRoleCommand } from '@/modules/v1/platform-admins/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

import { AppDataSource } from '@/shared/v1/database/core';
import { PlatformAdminRolesModel } from '@/shared/v1/database/schema/platform_admins/children';

export const deletePlatformAdminRoleRepository =
  (): DeletePlatformAdminRoleRepositoryContract =>
  async (deletePlatformAdminRoleData: DeletePlatformAdminRoleCommand, ctx?: TransactionContext): Promise<void> => {
    const platformAdminRoleRepository = ctx ? ctx.getRepository(PlatformAdminRolesModel) : AppDataSource.getRepository(PlatformAdminRolesModel);

    await platformAdminRoleRepository.softDelete({
      platformAdminRoleId: deletePlatformAdminRoleData.platformAdminRoleId,
    });
  };
