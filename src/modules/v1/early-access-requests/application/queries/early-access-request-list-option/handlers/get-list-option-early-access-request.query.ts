import type { GetListOptionEarlyAccessRequestResponseDTO } from '@/modules/v1/early-access-requests/presentation';
import { getAllEarlyAccessRequestStatusRepository } from '@/modules/v1/early-access-requests/infrastructure';
import { EarlyAccessRequestListDefinition } from '@/modules/v1/early-access-requests/list';

export const getListOptionEarlyAccessRequestQueryHandler = async (): Promise<GetListOptionEarlyAccessRequestResponseDTO> => {
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
