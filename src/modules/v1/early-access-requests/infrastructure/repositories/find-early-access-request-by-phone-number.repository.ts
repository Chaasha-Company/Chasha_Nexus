import type { FindEarlyAccessRequestByPhoneNumberQuery } from '@/modules/v1/early-access-requests/application';
import { AppDataSource } from '@/shared/v1/database/core';
import { EarlyAccessRequestsModel } from '@/shared/v1/database/schema/early_access_requests';

export const findEarlyAccessRequestByPhoneNumberRepository =
  () =>
  async (earlyAccessRequestData: FindEarlyAccessRequestByPhoneNumberQuery): Promise<EarlyAccessRequestsModel | null> => {
    const earlyAccessRequestRepository = AppDataSource.getRepository(EarlyAccessRequestsModel);

    return await earlyAccessRequestRepository.findOne({
      where: {
        earlyAccessRequestPhoneNumber: earlyAccessRequestData.earlyAccessRequestPhoneNumber,
      },
    });
  };
