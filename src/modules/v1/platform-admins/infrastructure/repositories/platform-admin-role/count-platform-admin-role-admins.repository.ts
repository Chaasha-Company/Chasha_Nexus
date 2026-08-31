import type { CountPlatformAdminRoleAdminsRepositoryContract } from '@/modules/v1/platform-admins/domain';
import type { findPlatformAdminRoleByIdQuery } from '@/modules/v1/platform-admins/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';
import { PlatformAdminsModel } from '@/shared/v1/database/schema/platform_admins';
import { AppDataSource } from '@/shared/v1/database/core';

export const countPlatformAdminRoleAdminsRepository =
  (): CountPlatformAdminRoleAdminsRepositoryContract =>
  async (platformAdminRoleData: findPlatformAdminRoleByIdQuery, ctx?: TransactionContext): Promise<number> => {
    const platformAdminRepository = ctx ? ctx.getRepository(PlatformAdminsModel) : AppDataSource.getRepository(PlatformAdminsModel);

    return await platformAdminRepository.count({
      where: {
        platformAdminRoleId: platformAdminRoleData.platformAdminRoleId,
      },
    });
  };
