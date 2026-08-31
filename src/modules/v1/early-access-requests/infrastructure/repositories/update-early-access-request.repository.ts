import type { UpdateEalryAccessRequestCommand } from '@/modules/v1/early-access-requests/application';
import type { UpdateEarlyAccessRequestRepositoryContract } from '@/modules/v1/early-access-requests/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';
import { EarlyAccessRequestsModel } from '@/shared/v1/database/schema/early_access_requests';
import { AppDataSource } from '@/shared/v1/database/core';

export const updateEarlyAccessRequestRepository =
  (): UpdateEarlyAccessRequestRepositoryContract =>
  async (earlyAccessRequestData: UpdateEalryAccessRequestCommand, ctx?: TransactionContext): Promise<void> => {
    const earlyAccessRequestRepository = ctx ? ctx.getRepository(EarlyAccessRequestsModel) : AppDataSource.getRepository(EarlyAccessRequestsModel);

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
