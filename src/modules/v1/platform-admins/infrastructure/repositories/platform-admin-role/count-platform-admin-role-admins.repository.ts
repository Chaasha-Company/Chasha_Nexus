import type { CountPlatformAdminRoleAdminsRepositoryContract } from '@/modules/v1/platform-admins/domain';
import type { findPlatformAdminRoleByIdQuery } from '@/modules/v1/platform-admins/application';
import type { EntityManager } from 'typeorm';
import { PlatformAdminsModel } from '@/shared/v1/database/schema/platform_admins';
import { AppDataSource } from '@/shared/v1/database/core';

export const countPlatformAdminRoleAdminsRepository =
  (): CountPlatformAdminRoleAdminsRepositoryContract =>
  async (platformAdminRoleData: findPlatformAdminRoleByIdQuery, manager?: EntityManager): Promise<number> => {
    const platformAdminRepository = manager ? manager.getRepository(PlatformAdminsModel) : AppDataSource.getRepository(PlatformAdminsModel);

    return await platformAdminRepository.count({
      where: {
        platformAdminRoleId: platformAdminRoleData.platformAdminRoleId,
      },
    });
  };
