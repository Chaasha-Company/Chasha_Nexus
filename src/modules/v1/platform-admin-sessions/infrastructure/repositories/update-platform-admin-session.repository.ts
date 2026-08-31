import type { UpdatePlatformAdminSessionCommand } from '@/modules/v1/platform-admin-sessions/application';
import type { UpdatePlatformAdminSessionRepositoryContract } from '@/modules/v1/platform-admin-sessions/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';
import { PlatformAdminSessionsModel } from '@/shared';
import { AppDataSource } from '@/shared/v1/database/core';

export const updatePlatformAdminSessionRepository =
  (): UpdatePlatformAdminSessionRepositoryContract =>
  async (platformAdminSessionData: UpdatePlatformAdminSessionCommand, ctx?: TransactionContext): Promise<void> => {
    const platformAdminSessionRepository = ctx ? ctx.getRepository(PlatformAdminSessionsModel) : AppDataSource.getRepository(PlatformAdminSessionsModel);

    const { platformAdminSessionId, ...updateData } = platformAdminSessionData;

    await platformAdminSessionRepository.update(
      {
        platformAdminSessionId,
      },
      {
        ...updateData,
      },
    );
  };
