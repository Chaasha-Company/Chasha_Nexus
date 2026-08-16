import type { FindEarlyAccessRequestByIdQuery } from '../find-early-access-request-by-id.query';
import type { FindEarlyAccessRequestByIdQueryResult } from '../results';
import { findEarlyAccessRequestByIdRepository } from '@/modules/v1/early-access-requests/infrastructure';
import { throwNotFoundException } from '@/shared/v1/exceptions';
import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';

export const findEarlyAccessRequestByIdQueryHandler = async (earlyAccessRequestData: FindEarlyAccessRequestByIdQuery, lang: Language): FindEarlyAccessRequestByIdQueryResult => {
  const data = await findEarlyAccessRequestByIdRepository()({
    earlyAccessRequestId: earlyAccessRequestData.earlyAccessRequestId,
  });

  if (data === null) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        earlyAccessRequestId: [t(ValidationMessages, ValidationMessage.EARLY_ACCESS_REQUEST_ID_NOT_FOUND, lang)],
      },
    });
  }

  const {
    earlyAccessRequestStatusId: _earlyAccessRequestStatusId,
    earlyAccessRequestBusinessTypeId: _earlyAccessRequestBusinessTypeId,
    earlyAccessRequestDeletedAt: _earlyAccessRequestDeletedAt,
    earlyAccessRequestStatus,
    earlyAccessRequestBusinessType,
    ...result
  } = data!;

  return {
    ...result,

    earlyAccessRequestStatus: {
      earlyAccessRequestStatusNameFa: earlyAccessRequestStatus.earlyAccessRequestStatusNameFa,
      earlyAccessRequestStatusNameEn: earlyAccessRequestStatus.earlyAccessRequestStatusNameEn,
      earlyAccessRequestStatusSlug: earlyAccessRequestStatus.earlyAccessRequestStatusSlug,
      earlyAccessRequestStatusDescriptionFa: earlyAccessRequestStatus.earlyAccessRequestStatusDescriptionFa,
      earlyAccessRequestStatusDescriptionEn: earlyAccessRequestStatus.earlyAccessRequestStatusDescriptionEn,
      earlyAccessRequestStatusSortOrder: earlyAccessRequestStatus.earlyAccessRequestStatusSortOrder,
    },

    earlyAccessRequestBusinessType: {
      businessTypeNameFa: earlyAccessRequestBusinessType.businessTypeNameFa,
      businessTypeNameEn: earlyAccessRequestBusinessType.businessTypeNameEn,
      businessTypeSlug: earlyAccessRequestBusinessType.businessTypeSlug,
      businessTypeSortOrder: earlyAccessRequestBusinessType.businessTypeSortOrder,
    },
  };
};
