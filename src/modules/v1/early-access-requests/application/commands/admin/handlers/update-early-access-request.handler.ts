import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import type { UpdateEalryAccessRequestCommand } from '../update-early-access-request.command';
import { findEarlyAccessRequestByIdRepository, findEarlyAccessRequestStatusByIdRepository, updateEarlyAccessRequestRepository } from '@/modules/v1/early-access-requests/infrastructure';
import { throwNotFoundException } from '@/shared/v1/exceptions';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';
import { findBusinessTypeByIdRepository } from '@/modules/v1/businesses';

export const updateEarlyAccessRequestCommandHandler = async (ealryAccessRequestData: UpdateEalryAccessRequestCommand, lang: Language): Promise<void> => {
  const earlyAccessRequest = await findEarlyAccessRequestByIdRepository()({
    earlyAccessRequestId: ealryAccessRequestData.earlyAccessRequestId as string,
  });

  if (earlyAccessRequest === null) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        earlyAccessRequestId: [t(ValidationMessages, ValidationMessage.EARLY_ACCESS_REQUEST_ID_NOT_FOUND, lang)],
      },
    });
  }

  if (ealryAccessRequestData.earlyAccessRequestStatusId) {
    const ealryAccessRequestStatus = await findEarlyAccessRequestStatusByIdRepository()({
      earlyAccessRequestStatusId: ealryAccessRequestData.earlyAccessRequestStatusId as number,
    });

    if (ealryAccessRequestStatus === null) {
      throwNotFoundException({
        message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
        details: {
          earlyAccessRequestStatusId: [t(ValidationMessages, ValidationMessage.EARLY_ACCESS_REQUEST_STATUS_ID_NOT_FOUND, lang)],
        },
      });
    }
  }

  if (ealryAccessRequestData.earlyAccessRequestBusinessTypeId) {
    const businessType = await findBusinessTypeByIdRepository()({
      businessTypeId: ealryAccessRequestData.earlyAccessRequestBusinessTypeId as number,
    });

    if (businessType === null) {
      throwNotFoundException({
        message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
        details: {
          earlyAccessBusinessTypeId: [t(ValidationMessages, ValidationMessage.EARLY_ACCESS_REQUEST_BUSINESS_TYPE_ID_NOT_FOUND, lang)],
        },
      });
    }
  }

  await updateEarlyAccessRequestRepository()(ealryAccessRequestData);
};
