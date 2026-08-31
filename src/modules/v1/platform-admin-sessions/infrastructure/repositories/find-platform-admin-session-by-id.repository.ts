import type { FindPlatformAdminSessionByIdQuery } from '@/modules/v1/platform-admin-sessions/application';
import type { FindPlatformAdminSessionByIdRepositoryContract } from '@/modules/v1/platform-admin-sessions/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';
import { AppDataSource } from '@/shared/v1/database/core';
import { PlatformAdminSessionsModel } from '@/shared/v1/database/schema/platform_admins/childrens';

export const findPlatformAdminSessionByIdRepository =
  (): FindPlatformAdminSessionByIdRepositoryContract =>
  async (platformAdminSessionData: FindPlatformAdminSessionByIdQuery, ctx?: TransactionContext): Promise<PlatformAdminSessionsModel | null> => {
    const platformAdminSessionRepository = ctx ? ctx.getRepository(PlatformAdminSessionsModel) : AppDataSource.getRepository(PlatformAdminSessionsModel);

    return await platformAdminSessionRepository.findOne({
      where: { platformAdminSessionId: platformAdminSessionData.platformAdminSessionId },
      cache: true,
    });
  };
