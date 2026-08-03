import type { CreatePlatformAdminSessionRepositoryContract } from '@/modules/v1/platform-admin-sessions/domain';
import type { CreatePlatformAdminSessionCommand } from '@/modules/v1/platform-admin-sessions/application';
import { PlatformAdminSessionsModel } from '@/shared/v1/database/schema/platform_admins/childrens';
import { AppDataSource } from '@/shared/v1/database/core';

export const createPlatformAdminSessionRepository =
  (): CreatePlatformAdminSessionRepositoryContract =>
  async (createPlatformAdminSessionData: CreatePlatformAdminSessionCommand): Promise<PlatformAdminSessionsModel> => {
    const platformAdminSessionRepository = AppDataSource.getRepository(PlatformAdminSessionsModel);

    const platformAdminSessionData = platformAdminSessionRepository.create(createPlatformAdminSessionData);

    return platformAdminSessionRepository.save(platformAdminSessionData);
  };
