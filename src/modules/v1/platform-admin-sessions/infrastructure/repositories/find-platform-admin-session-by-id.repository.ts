import type { FindPlatformAdminSessionByIdQuery } from '@/modules/v1/platform-admin-sessions/application';
import type { FindPlatformAdminSessionByIdRepositoryContract } from '@/modules/v1/platform-admin-sessions/domain';
import type { EntityManager } from 'typeorm';
import { AppDataSource } from '@/shared/v1/database/core';
import { PlatformAdminSessionsModel } from '@/shared/v1/database/schema/platform_admins/childrens';

export const findPlatformAdminSessionByIdRepository =
  (): FindPlatformAdminSessionByIdRepositoryContract =>
  async (platformAdminSessionData: FindPlatformAdminSessionByIdQuery, manager?: EntityManager): Promise<PlatformAdminSessionsModel | null> => {
    const platformAdminSessionRepository = manager ? manager.getRepository(PlatformAdminSessionsModel) : AppDataSource.getRepository(PlatformAdminSessionsModel);

    return await platformAdminSessionRepository.findOne({
      where: { platformAdminSessionId: platformAdminSessionData.platformAdminSessionId },
      cache: true,
    });
  };
