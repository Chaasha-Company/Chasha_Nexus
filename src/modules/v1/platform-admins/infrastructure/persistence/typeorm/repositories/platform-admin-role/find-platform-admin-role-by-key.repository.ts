import type { FindPlatformAdminRoleByKeyQuery } from '@/modules/v1/platform-admins/application';
import type { FindPlatformAdminRoleByKeyRepositoryContract } from '@/modules/v1/platform-admins/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

import { AppDataSource } from '@/shared/v1/database/core';
import { PlatformAdminRolesModel } from '@/shared/v1/database/schema/platform_admins/children';

export const findPlatformAdminRoleByKeyRepository =
  (): FindPlatformAdminRoleByKeyRepositoryContract =>
  async (platformAdminRoleData: FindPlatformAdminRoleByKeyQuery, ctx?: TransactionContext): Promise<PlatformAdminRolesModel | null> => {
    const platformAdminRoleRepository = ctx ? ctx.getRepository(PlatformAdminRolesModel) : AppDataSource.getRepository(PlatformAdminRolesModel);

    return await platformAdminRoleRepository.findOne({
      where: {
        platformAdminRoleKey: platformAdminRoleData.platformAdminRoleKey,
      },
    });
  };
