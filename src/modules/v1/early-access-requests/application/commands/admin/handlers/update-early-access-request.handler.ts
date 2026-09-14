import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import type { UpdateEarlyAccessRequestCommand } from '../update-early-access-request.command';
import { findEarlyAccessRequestByIdRepository, findEarlyAccessRequestStatusByIdRepository, updateEarlyAccessRequestRepository } from '@/modules/v1/early-access-requests/infrastructure';
import { throwNotFoundException } from '@/shared/v1/exceptions';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';
import { findBusinessTypeByIdRepository } from '@/modules/v1/businesses';

export const updateEarlyAccessRequestCommandHandler = async (earlyAccessRequestData: UpdateEarlyAccessRequestCommand, lang: Language): Promise<void> => {
  const earlyAccessRequest = await findEarlyAccessRequestByIdRepository()({
    earlyAccessRequestId: earlyAccessRequestData.earlyAccessRequestId as string,
  });

  if (earlyAccessRequest === null) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        earlyAccessRequestId: [t(ValidationMessages, ValidationMessage.EARLY_ACCESS_REQUEST_ID_NOT_FOUND, lang)],
      },
    });
  }

  if (earlyAccessRequestData.earlyAccessRequestStatusId) {
    const earlyAccessRequestStatus = await findEarlyAccessRequestStatusByIdRepository()({
      earlyAccessRequestStatusId: earlyAccessRequestData.earlyAccessRequestStatusId as number,
    });

    if (earlyAccessRequestStatus === null) {
      throwNotFoundException({
        message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
        details: {
          earlyAccessRequestStatusId: [t(ValidationMessages, ValidationMessage.EARLY_ACCESS_REQUEST_STATUS_ID_NOT_FOUND, lang)],
        },
      });
    }
  }

  if (earlyAccessRequestData.earlyAccessRequestBusinessTypeId) {
    const businessType = await findBusinessTypeByIdRepository()({
      businessTypeId: earlyAccessRequestData.earlyAccessRequestBusinessTypeId as number,
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

  await updateEarlyAccessRequestRepository()(earlyAccessRequestData);
};
