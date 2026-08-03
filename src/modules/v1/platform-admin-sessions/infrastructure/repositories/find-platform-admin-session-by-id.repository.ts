import type { FindPlatformAdminSessionByIdQuery } from '@/modules/v1/platform-admin-sessions/application';
import type { FindPlatformAdminSessionByIdRepositoryContract } from '@/modules/v1/platform-admin-sessions/domain';
import { AppDataSource } from '@/shared/v1/database/core';
import { PlatformAdminSessionsModel } from '@/shared/v1/database/schema/platform_admins/childrens';

export const findPlatformAdminSessionByIdRepository =
  (): FindPlatformAdminSessionByIdRepositoryContract =>
  async (platformAdminSessionData: FindPlatformAdminSessionByIdQuery): Promise<PlatformAdminSessionsModel | null> => {
    const platformAdminSessionRepository = AppDataSource.getRepository(PlatformAdminSessionsModel);

    return await platformAdminSessionRepository.findOneBy({ platformAdminSessionId: platformAdminSessionData.platformAdminSessionId });
  };
