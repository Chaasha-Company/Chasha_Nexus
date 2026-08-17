import type { FindEarlyAccessRequestStatusByIdQuery } from '@/modules/v1/early-access-requests/application';
import type { FindEarlyAccessRequestStatusByIdRepositoryContract } from '@/modules/v1/early-access-requests/domain';
import type { EntityManager } from 'typeorm';
import { EarlyAccessRequestStatusesModel } from '@/shared/v1/database/schema/early_access_requests/childrens';
import { AppDataSource } from '@/shared/v1/database/core';

export const findEarlyAccessRequestStatusByIdRepository =
  (): FindEarlyAccessRequestStatusByIdRepositoryContract =>
  async (earlyAccessRequestStatusData: FindEarlyAccessRequestStatusByIdQuery, manager?: EntityManager): Promise<EarlyAccessRequestStatusesModel | null> => {
    const ealryAccessRequestStatusRepository = manager ? manager.getRepository(EarlyAccessRequestStatusesModel) : AppDataSource.getRepository(EarlyAccessRequestStatusesModel);

    return ealryAccessRequestStatusRepository.findOne({
      where: {
        earlyAccessRequestStatusId: earlyAccessRequestStatusData.earlyAccessRequestStatusId,
      },
    });
  };
