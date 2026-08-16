import type { FindEarlyAccessRequestByIdQuery } from '@/modules/v1/early-access-requests/application';
import type { FindEarlyAccessRequestByIdRepositoryContract } from '@/modules/v1/early-access-requests/domain';
import type { EntityManager } from 'typeorm';
import { EarlyAccessRequestsModel } from '@/shared/v1/database/schema/early_access_requests';
import { AppDataSource } from '@/shared/v1/database/core';

export const findEarlyAccessRequestByIdRepository =
  (): FindEarlyAccessRequestByIdRepositoryContract =>
  async (earlyAccessRequestData: FindEarlyAccessRequestByIdQuery, manager?: EntityManager): Promise<null | EarlyAccessRequestsModel> => {
    const earlyAccessRequestRepository = manager ? manager.getRepository(EarlyAccessRequestsModel) : AppDataSource.getRepository(EarlyAccessRequestsModel);

    return earlyAccessRequestRepository.findOne({
      where: {
        earlyAccessRequestId: earlyAccessRequestData.earlyAccessRequestId,
      },
      relations: {
        earlyAccessRequestBusinessType: true,
        earlyAccessRequestStatus: true,
      },
      cache: true,
    });
  };
