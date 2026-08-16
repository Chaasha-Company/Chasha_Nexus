import type { FindAllEarlyAccessRequestQuery } from '@/modules/v1/early-access-requests/application';
import type { FindAllEarlyAccessRequestRepositoryContract } from '@/modules/v1/early-access-requests/domain';

import type { EntityManager } from 'typeorm';
import type { PaginationResponseRepository } from '@/shared/v1/database/types';

import { AppDataSource } from '@/shared/v1/database/core';
import { EarlyAccessRequestsModel } from '@/shared/v1/database/schema/early_access_requests';

import { applyEarlyAccessRequestSearch } from '@/modules/v1/early-access-requests/list';

export const findAllEarlyAccessRequestRepository =
  (): FindAllEarlyAccessRequestRepositoryContract =>
  async (earlyAccessData: FindAllEarlyAccessRequestQuery, manager?: EntityManager): Promise<PaginationResponseRepository<EarlyAccessRequestsModel>> => {
    const repository = manager ? manager.getRepository(EarlyAccessRequestsModel) : AppDataSource.getRepository(EarlyAccessRequestsModel);

    const queryBuilder = repository.createQueryBuilder('earlyAccessRequest');

    queryBuilder.leftJoinAndSelect('earlyAccessRequest.earlyAccessRequestBusinessType', 'businessType').leftJoinAndSelect('earlyAccessRequest.earlyAccessRequestStatus', 'status');

    applyEarlyAccessRequestSearch(queryBuilder, earlyAccessData.earlyAccessRequestSearchQuery);

    if (earlyAccessData.earlyAccessRequestStatusIdQuery !== undefined) {
      queryBuilder.andWhere('earlyAccessRequest.earlyAccessRequestStatusId = :statusId', {
        statusId: earlyAccessData.earlyAccessRequestStatusIdQuery,
      });
    }

    const cacheKey = ['early-access-requests', earlyAccessData.earlyAccessRequestSearchQuery ?? '', earlyAccessData.earlyAccessRequestStatusIdQuery ?? '', earlyAccessData.earlyAccessRequestPaginationSkip, earlyAccessData.earlyAccessRequestPaginationTake].join(
      ':',
    );

    queryBuilder.skip(earlyAccessData.earlyAccessRequestPaginationSkip).take(earlyAccessData.earlyAccessRequestPaginationTake).orderBy('earlyAccessRequest.earlyAccessRequestCreatedAt', 'DESC').cache(cacheKey, 30_000);

    const [data, count] = await queryBuilder.getManyAndCount();

    return {
      data,
      count,
    };
  };
