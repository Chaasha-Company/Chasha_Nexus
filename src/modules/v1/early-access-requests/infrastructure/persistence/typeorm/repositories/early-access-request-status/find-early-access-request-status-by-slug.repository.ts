import type { FindEarlyAccessRequestStatusBySlugQuery } from '@/modules/v1/early-access-requests/application';
import type { FindEarlyAccessRequestStatusBySlug } from '@/modules/v1/early-access-requests/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';
import { AppDataSource } from '@/shared/v1/database/core';
import { EarlyAccessRequestStatusesModel } from '@/shared/v1/database/schema/early_access_requests/children';

export const findEarlyAccessRequestStatusBySlugRepository =
  (): FindEarlyAccessRequestStatusBySlug =>
  async (earlyAccessRequestStatusData: FindEarlyAccessRequestStatusBySlugQuery, ctx?: TransactionContext): Promise<EarlyAccessRequestStatusesModel | null> => {
    const earlyAccessRequestStatusRepository = ctx ? ctx.getRepository(EarlyAccessRequestStatusesModel) : AppDataSource.getRepository(EarlyAccessRequestStatusesModel);

    return await earlyAccessRequestStatusRepository.findOne({
      where: {
        earlyAccessRequestStatusSlug: earlyAccessRequestStatusData.earlyAccessRequestStatusSlug,
      },
    });
  };
