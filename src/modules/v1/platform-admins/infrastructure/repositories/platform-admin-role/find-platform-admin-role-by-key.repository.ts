import type { FindPlatformAdminRoleByKeyQuery } from '@/modules/v1/platform-admins/application';
import type { FindPlatformAdminRoleByKeyRepositoryContract } from '@/modules/v1/platform-admins/domain';
import type { EntityManager } from 'typeorm';

import { AppDataSource } from '@/shared/v1/database/core';
import { PlatformAdminRolesModel } from '@/shared/v1/database/schema/platform_admins/childrens';

export const findPlatformAdminRoleByKeyRepository =
  (): FindPlatformAdminRoleByKeyRepositoryContract =>
  async (platformAdminRoleData: FindPlatformAdminRoleByKeyQuery, manager?: EntityManager): Promise<PlatformAdminRolesModel | null> => {
    const platformAdminRoleRepository = manager ? manager.getRepository(PlatformAdminRolesModel) : AppDataSource.getRepository(PlatformAdminRolesModel);

    return await platformAdminRoleRepository.findOne({
      where: {
        platformAdminRoleKey: platformAdminRoleData.platformAdminRoleKey,
      },
    });
  };
