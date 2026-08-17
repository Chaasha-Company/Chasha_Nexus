import type { FindEarlyAccessRequestStatusBySlugQuery } from '@/modules/v1/early-access-requests/application';
import type { FindEarlyAccessRequestStatusBySlug } from '@/modules/v1/early-access-requests/domain';
import type { EntityManager } from 'typeorm';
import { AppDataSource } from '@/shared/v1/database/core';
import { EarlyAccessRequestStatusesModel } from '@/shared/v1/database/schema/early_access_requests/childrens';

export const findEarlyAccessRequestStatusBySlugRepository =
  (): FindEarlyAccessRequestStatusBySlug =>
  async (ealryAccessRequestStatusData: FindEarlyAccessRequestStatusBySlugQuery, manager?: EntityManager): Promise<EarlyAccessRequestStatusesModel | null> => {
    const ealryAccessRequestStatusRepository = manager ? manager.getRepository(EarlyAccessRequestStatusesModel) : AppDataSource.getRepository(EarlyAccessRequestStatusesModel);

    return await ealryAccessRequestStatusRepository.findOne({
      where: {
        earlyAccessRequestStatusSlug: ealryAccessRequestStatusData.earlyAccessRequestStatusSlug,
      },
    });
  };
