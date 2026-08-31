import type { GetAllEarlyAccessRequestStatusRepositoryContract } from '@/modules/v1/early-access-requests/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';
import { EarlyAccessRequestStatusesModel } from '@/shared/v1/database/schema/early_access_requests/childrens';
import { AppDataSource } from '@/shared/v1/database/core';

export const getAllEarlyAccessRequestStatusRepository =
  (): GetAllEarlyAccessRequestStatusRepositoryContract =>
  async (ctx?: TransactionContext): Promise<EarlyAccessRequestStatusesModel[]> => {
    const earlyAccessRequestRepository = ctx ? ctx.getRepository(EarlyAccessRequestStatusesModel) : AppDataSource.getRepository(EarlyAccessRequestStatusesModel);

    return await earlyAccessRequestRepository.find({ cache: true });
  };
