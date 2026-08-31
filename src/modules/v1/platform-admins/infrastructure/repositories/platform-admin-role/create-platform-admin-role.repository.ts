import type { CreatePlatformAdminRoleRepositoryContract } from '@/modules/v1/platform-admins/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

import { AppDataSource } from '@/shared/v1/database/core';
import { PlatformAdminRolesModel } from '@/shared/v1/database/schema/platform_admins/childrens';

export const createPlatformAdminRoleRepository =
  (): CreatePlatformAdminRoleRepositoryContract =>
  async (createPlatformAdminRoleData, ctx?: TransactionContext): Promise<{ platformAdminRoleId: string }> => {
    const platformAdminRoleRepository = ctx ? ctx.getRepository(PlatformAdminRolesModel) : AppDataSource.getRepository(PlatformAdminRolesModel);

    const createdPlatformAdminRole = await platformAdminRoleRepository.save(
      platformAdminRoleRepository.create({
        platformAdminRoleKey: createPlatformAdminRoleData.platformAdminRoleKey,
        platformAdminRoleNameFa: createPlatformAdminRoleData.platformAdminRoleNameFa,
        platformAdminRoleNameEn: createPlatformAdminRoleData.platformAdminRoleNameEn,
        platformAdminRoleDescriptionFa: createPlatformAdminRoleData.platformAdminRoleDescriptionFa,
        platformAdminRoleDescriptionEn: createPlatformAdminRoleData.platformAdminRoleDescriptionEn,
      }),
    );

    return {
      platformAdminRoleId: createdPlatformAdminRole.platformAdminRoleId,
    };
  };
