import type { CreatePlatformAdminSessionRepositoryContract } from '@/modules/v1/platform-admin-sessions/domain';
import type { CreatePlatformAdminSessionCommand } from '@/modules/v1/platform-admin-sessions/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';
import { PlatformAdminSessionsModel } from '@/shared/v1/database/schema/platform_admins/children';
import { AppDataSource } from '@/shared/v1/database/core';

export const createPlatformAdminSessionRepository =
  (): CreatePlatformAdminSessionRepositoryContract =>
  async (createPlatformAdminSessionData: CreatePlatformAdminSessionCommand, ctx?: TransactionContext): Promise<PlatformAdminSessionsModel> => {
    const platformAdminSessionRepository = ctx ? ctx.getRepository(PlatformAdminSessionsModel) : AppDataSource.getRepository(PlatformAdminSessionsModel);

    const platformAdminSessionData = platformAdminSessionRepository.create(createPlatformAdminSessionData);

    return platformAdminSessionRepository.save(platformAdminSessionData);
  };
