import type { FindEarlyAccessRequestStatusBySlugQuery } from '@/modules/v1/early-access-requests/application';
import type { FindEarlyAccessRequestStatusBySlug } from '@/modules/v1/early-access-requests/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';
import { AppDataSource } from '@/shared/v1/database/core';
import { EarlyAccessRequestStatusesModel } from '@/shared/v1/database/schema/early_access_requests/childrens';

export const findEarlyAccessRequestStatusBySlugRepository =
  (): FindEarlyAccessRequestStatusBySlug =>
  async (ealryAccessRequestStatusData: FindEarlyAccessRequestStatusBySlugQuery, ctx?: TransactionContext): Promise<EarlyAccessRequestStatusesModel | null> => {
    const ealryAccessRequestStatusRepository = ctx ? ctx.getRepository(EarlyAccessRequestStatusesModel) : AppDataSource.getRepository(EarlyAccessRequestStatusesModel);

    return await ealryAccessRequestStatusRepository.findOne({
      where: {
        earlyAccessRequestStatusSlug: ealryAccessRequestStatusData.earlyAccessRequestStatusSlug,
      },
    });
  };
