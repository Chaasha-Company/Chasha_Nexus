import type { GetListEarlyAccessRequestQueryResult } from '../results';
import { getAllEarlyAccessRequestStatusRepository } from '@/modules/v1/early-access-requests/infrastructure';
import { EarlyAccessRequestListDefinition } from '@/modules/v1/early-access-requests/list';

export const getListOptionEarlyAccessRequestQueryHandler = async (): GetListEarlyAccessRequestQueryResult => {
  const earlyAccessStatuses = await getAllEarlyAccessRequestStatusRepository()();

  return {
    earlyAccessRequestSearch: EarlyAccessRequestListDefinition.searchFields.map((field) => ({
      earlyAccessRequestSearchField: field,
      earlyAccessRequestSearchLabels: [field],
    })),

    earlyAccessRequestFilters: {
      earlyAccessRequestStatus: earlyAccessStatuses.map((status) => ({
        earlyAccessRequestStatusId: status.earlyAccessRequestStatusId,
        earlyAccessRequestStatusLabels: {
          fa: status.earlyAccessRequestStatusNameFa,
          en: status.earlyAccessRequestStatusNameEn,
        },
      })),
    },
  };
};
