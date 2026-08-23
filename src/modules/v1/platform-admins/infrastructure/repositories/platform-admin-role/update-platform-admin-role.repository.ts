import type { UpdatePlatformAdminRoleCommand } from '@/modules/v1/platform-admins/application';
import type { UpdatePlatformAdminRoleRepositoryContract } from '@/modules/v1/platform-admins/domain';
import type { EntityManager } from 'typeorm';

import { AppDataSource } from '@/shared/v1/database/core';
import { PlatformAdminRolesModel } from '@/shared/v1/database/schema/platform_admins/childrens';

export const updatePlatformAdminRoleRepository =
  (): UpdatePlatformAdminRoleRepositoryContract =>
  async (updatePlatformAdminRoleData: UpdatePlatformAdminRoleCommand, manager?: EntityManager): Promise<void> => {
    const platformAdminRoleRepository = manager ? manager.getRepository(PlatformAdminRolesModel) : AppDataSource.getRepository(PlatformAdminRolesModel);

    const { platformAdminRoleId, ...updateData } = updatePlatformAdminRoleData;

    await platformAdminRoleRepository.update(
      {
        platformAdminRoleId,
      },
      updateData,
    );
  };
