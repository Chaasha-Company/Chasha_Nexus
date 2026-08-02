import type { CreateEarlyAccessRequestRepositoryContract } from '@/modules/v1/early-access-requests/domain';
import type { CreateGlobalEarlyAccessRequestCommand } from '@/modules/v1/early-access-requests/application';
import { EarlyAccessRequestsModel } from '@/shared/v1/database/schema/early_access_requests';
import { AppDataSource } from '@/shared/v1/database/core';

export const createEarlyAccessRequestRepository =
  (): CreateEarlyAccessRequestRepositoryContract =>
  async (createEarlyAccessRequestData: CreateGlobalEarlyAccessRequestCommand): Promise<void> => {
    const earlyAccessRequestRepository = AppDataSource.getRepository(EarlyAccessRequestsModel);

    const earlyAccessData = earlyAccessRequestRepository.create(createEarlyAccessRequestData);

    await earlyAccessRequestRepository.save(earlyAccessData);
  };
