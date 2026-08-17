import type { UpdateEalryAccessRequestCommand } from '@/modules/v1/early-access-requests/application';
import type { UpdateEarlyAccessRequestRepositoryContract } from '@/modules/v1/early-access-requests/domain';
import type { EntityManager } from 'typeorm';
import { EarlyAccessRequestsModel } from '@/shared/v1/database/schema/early_access_requests';
import { AppDataSource } from '@/shared/v1/database/core';

export const updateEarlyAccessRequestRepository =
  (): UpdateEarlyAccessRequestRepositoryContract =>
  async (earlyAccessRequestData: UpdateEalryAccessRequestCommand, manager?: EntityManager): Promise<void> => {
    const earlyAccessRequestRepository = manager ? manager.getRepository(EarlyAccessRequestsModel) : AppDataSource.getRepository(EarlyAccessRequestsModel);

    const { earlyAccessRequestId, earlyAccessRequestMetadata, ...updateData } = earlyAccessRequestData;

    await earlyAccessRequestRepository.update(
      {
        earlyAccessRequestId,
      },
      {
        ...updateData,
        ...(earlyAccessRequestMetadata !== undefined
          ? {
              earlyAccessRequestMetadata: () => JSON.stringify(earlyAccessRequestMetadata),
            }
          : {}),
      },
    );
  };
