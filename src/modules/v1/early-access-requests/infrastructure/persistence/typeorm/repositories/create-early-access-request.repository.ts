import type { CreateEarlyAccessRequestRepositoryContract } from '@/modules/v1/early-access-requests/domain';
import type { CreateGlobalEarlyAccessRequestCommand } from '@/modules/v1/early-access-requests/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';
import { invalidateCache } from '@/shared/v1/domain/contracts';
import { EarlyAccessRequestsModel } from '@/shared/v1/database/schema/early_access_requests';
import { AppDataSource } from '@/shared/v1/database/core';

export const createEarlyAccessRequestRepository =
  (): CreateEarlyAccessRequestRepositoryContract =>
  async (createEarlyAccessRequestData: CreateGlobalEarlyAccessRequestCommand, ctx?: TransactionContext): Promise<void> => {
    const earlyAccessRequestRepository = ctx ? ctx.getRepository(EarlyAccessRequestsModel) : AppDataSource.getRepository(EarlyAccessRequestsModel);

    const earlyAccessData = earlyAccessRequestRepository.create(createEarlyAccessRequestData);

    await earlyAccessRequestRepository.save(earlyAccessData);

    await invalidateCache(['early-access-requests', 'early-access-requests-count']);
  };
