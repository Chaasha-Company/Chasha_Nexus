import type { EarlyAccessRequestsModel } from '@/shared/v1/database/schema/early_access_requests';
import type { SelectQueryBuilder } from 'typeorm';

export const applyEarlyAccessRequestSearch = (queryBuilder: SelectQueryBuilder<EarlyAccessRequestsModel>, search?: string) => {
  if (!search) {
    return queryBuilder;
  }

  return queryBuilder.andWhere(
    `(
      earlyAccessRequest.earlyAccessRequestFullName LIKE :search
      OR earlyAccessRequest.earlyAccessRequestPhoneNumber LIKE :search
      OR earlyAccessRequest.earlyAccessRequestBusinessName LIKE :search
      OR earlyAccessRequest.earlyAccessRequestCode LIKE :search
    )`,
    {
      search: `%${search}%`,
    },
  );
};
