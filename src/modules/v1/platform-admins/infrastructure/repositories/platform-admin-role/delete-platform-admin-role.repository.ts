import type { DeletePlatformAdminRoleRepositoryContract } from '@/modules/v1/platform-admins/domain';
import type { DeletePlatformAdminRoleCommand } from '@/modules/v1/platform-admins/application';
import type { EntityManager } from 'typeorm';

import { AppDataSource } from '@/shared/v1/database/core';
import { PlatformAdminRolesModel } from '@/shared/v1/database/schema/platform_admins/childrens';

export const deletePlatformAdminRoleRepository =
  (): DeletePlatformAdminRoleRepositoryContract =>
  async (deletePlatformAdminRoleData: DeletePlatformAdminRoleCommand, manager?: EntityManager): Promise<void> => {
    const platformAdminRoleRepository = manager ? manager.getRepository(PlatformAdminRolesModel) : AppDataSource.getRepository(PlatformAdminRolesModel);

    await platformAdminRoleRepository.softDelete({
      platformAdminRoleId: deletePlatformAdminRoleData.platformAdminRoleId,
    });
  };
