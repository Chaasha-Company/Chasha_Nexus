import type { FindAllEarlyAccessRequestResultQuery } from '../results';
import type { GetAllEarlyAccessRequestRequestQueryDTO } from '@/modules/v1/early-access-requests/presentation';
import { findAllEarlyAccessRequestRepository } from '@/modules/v1/early-access-requests/infrastructure';

export const findAllEarlyAccessRequestQueryHandler = async (earlyAccessData: GetAllEarlyAccessRequestRequestQueryDTO): Promise<FindAllEarlyAccessRequestResultQuery> => {
  const paginationPage = Number(earlyAccessData.paginationPage);
  const paginationLimit = Number(earlyAccessData.paginationLimit);
  const paginationSkip = (paginationPage - 1) * paginationLimit;

  const result = await findAllEarlyAccessRequestRepository()({
    earlyAccessRequestSearchQuery: earlyAccessData.earlyAccessRequestSearch as string,
    earlyAccessRequestStatusIdQuery: earlyAccessData.earlyAccessRequestStatusId ? Number(earlyAccessData.earlyAccessRequestStatusId) : undefined,
    earlyAccessRequestPaginationSkip: paginationSkip,
    earlyAccessRequestPaginationTake: paginationLimit,
  });

  return {
    count: result.count,
    data: result.data.map((item) => ({
      earlyAccessRequestId: item.earlyAccessRequestId,

      earlyAccessRequestStatus: {
        earlyAccessRequestStatusNameFa: item.earlyAccessRequestStatus.earlyAccessRequestStatusNameFa,

        earlyAccessRequestStatusNameEn: item.earlyAccessRequestStatus.earlyAccessRequestStatusNameEn,

        earlyAccessRequestStatusSlug: item.earlyAccessRequestStatus.earlyAccessRequestStatusSlug,

        earlyAccessRequestStatusDescriptionFa: item.earlyAccessRequestStatus.earlyAccessRequestStatusDescriptionFa,

        earlyAccessRequestStatusDescriptionEn: item.earlyAccessRequestStatus.earlyAccessRequestStatusDescriptionEn,

        earlyAccessRequestStatusSortOrder: item.earlyAccessRequestStatus.earlyAccessRequestStatusSortOrder,
      },

      earlyAccessRequestBusinessType: {
        businessTypeNameFa: item.earlyAccessRequestBusinessType.businessTypeNameFa,

        businessTypeNameEn: item.earlyAccessRequestBusinessType.businessTypeNameEn,

        businessTypeSlug: item.earlyAccessRequestBusinessType.businessTypeSlug,

        businessTypeSortOrder: item.earlyAccessRequestBusinessType.businessTypeSortOrder,
      },

      earlyAccessRequestFullName: item.earlyAccessRequestFullName,
      earlyAccessRequestPhoneNumber: item.earlyAccessRequestPhoneNumber,
      earlyAccessRequestBusinessName: item.earlyAccessRequestBusinessName,
      earlyAccessRequestCode: item.earlyAccessRequestCode,
      earlyAccessRequestMetadata: item.earlyAccessRequestMetadata,
      earlyAccessRequestCreatedAt: item.earlyAccessRequestCreatedAt,
      earlyAccessRequestUpdatedAt: item.earlyAccessRequestUpdatedAt,
    })),
  };
};
