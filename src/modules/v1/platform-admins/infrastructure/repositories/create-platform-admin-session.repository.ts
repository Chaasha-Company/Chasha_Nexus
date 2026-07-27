import type { CreatePlatformAdminSessionRepositoryContract } from '@/modules/v1/platform-admins/domain';
import type { CreatePlatformAdminSessionRequestDTO } from '@/modules/v1/platform-admins/presentation';
import { PlatformAdminSessionsModel } from '@/shared/v1/database/schema/platform_admins/childrens';
import { AppDataSource } from '@/shared/v1/database/core';

export const createPlatformAdminSessionRepository =
  (): CreatePlatformAdminSessionRepositoryContract =>
  async (createPlatformAdminSessionData: CreatePlatformAdminSessionRequestDTO): Promise<PlatformAdminSessionsModel> => {
    const platformAdminSessionRepository = AppDataSource.getRepository(PlatformAdminSessionsModel);

    const platformAdminSessionData = platformAdminSessionRepository.create(createPlatformAdminSessionData);

    return platformAdminSessionRepository.save(platformAdminSessionData);
  };
