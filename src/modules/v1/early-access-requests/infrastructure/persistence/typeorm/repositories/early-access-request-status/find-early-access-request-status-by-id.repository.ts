import type { FindEarlyAccessRequestStatusByIdQuery } from '@/modules/v1/early-access-requests/application';
import type { FindEarlyAccessRequestStatusByIdRepositoryContract } from '@/modules/v1/early-access-requests/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';
import { EarlyAccessRequestStatusesModel } from '@/shared/v1/database/schema/early_access_requests/children';
import { AppDataSource } from '@/shared/v1/database/core';

export const findEarlyAccessRequestStatusByIdRepository =
  (): FindEarlyAccessRequestStatusByIdRepositoryContract =>
  async (earlyAccessRequestStatusData: FindEarlyAccessRequestStatusByIdQuery, ctx?: TransactionContext): Promise<EarlyAccessRequestStatusesModel | null> => {
    const earlyAccessRequestStatusRepository = ctx ? ctx.getRepository(EarlyAccessRequestStatusesModel) : AppDataSource.getRepository(EarlyAccessRequestStatusesModel);

    return earlyAccessRequestStatusRepository.findOne({
      where: {
        earlyAccessRequestStatusId: earlyAccessRequestStatusData.earlyAccessRequestStatusId,
      },
    });
  };
