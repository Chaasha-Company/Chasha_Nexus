import type { UpdatePlatformAdminRoleCommand } from '@/modules/v1/platform-admins/application';
import type { UpdatePlatformAdminRoleRepositoryContract } from '@/modules/v1/platform-admins/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

import { AppDataSource } from '@/shared/v1/database/core';
import { PlatformAdminRolesModel } from '@/shared/v1/database/schema/platform_admins/children';

export const updatePlatformAdminRoleRepository =
  (): UpdatePlatformAdminRoleRepositoryContract =>
  async (updatePlatformAdminRoleData: UpdatePlatformAdminRoleCommand, ctx?: TransactionContext): Promise<void> => {
    const platformAdminRoleRepository = ctx ? ctx.getRepository(PlatformAdminRolesModel) : AppDataSource.getRepository(PlatformAdminRolesModel);

    const { platformAdminRoleId, ...updateData } = updatePlatformAdminRoleData;

    await platformAdminRoleRepository.update(
      {
        platformAdminRoleId,
      },
      updateData,
    );
  };
