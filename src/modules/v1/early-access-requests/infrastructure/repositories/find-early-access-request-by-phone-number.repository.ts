import type { FindEarlyAccessRequestByPhoneNumberQuery } from '@/modules/v1/early-access-requests/application';
import type { EntityManager } from 'typeorm';
import { AppDataSource } from '@/shared/v1/database/core';
import { EarlyAccessRequestsModel } from '@/shared/v1/database/schema/early_access_requests';

export const findEarlyAccessRequestByPhoneNumberRepository =
  () =>
  async (earlyAccessRequestData: FindEarlyAccessRequestByPhoneNumberQuery, manager?: EntityManager): Promise<EarlyAccessRequestsModel | null> => {
    const earlyAccessRequestRepository = manager ? manager.getRepository(EarlyAccessRequestsModel) : AppDataSource.getRepository(EarlyAccessRequestsModel);

    return await earlyAccessRequestRepository.findOne({
      where: {
        earlyAccessRequestPhoneNumber: earlyAccessRequestData.earlyAccessRequestPhoneNumber,
      },
    });
  };
