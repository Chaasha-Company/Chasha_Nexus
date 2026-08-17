import type { GetAllEarlyAccessRequestStatusRepositoryContract } from '@/modules/v1/early-access-requests/domain';
import type { EntityManager } from 'typeorm';
import { EarlyAccessRequestStatusesModel } from '@/shared/v1/database/schema/early_access_requests/childrens';
import { AppDataSource } from '@/shared/v1/database/core';

export const getAllEarlyAccessRequestStatusRepository =
  (): GetAllEarlyAccessRequestStatusRepositoryContract =>
  async (manager?: EntityManager): Promise<EarlyAccessRequestStatusesModel[]> => {
    const earlyAccessRequestRepository = manager ? manager.getRepository(EarlyAccessRequestStatusesModel) : AppDataSource.getRepository(EarlyAccessRequestStatusesModel);

    return await earlyAccessRequestRepository.find({ cache: true });
  };
