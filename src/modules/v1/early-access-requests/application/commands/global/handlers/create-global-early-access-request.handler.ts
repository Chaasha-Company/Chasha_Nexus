import type { CreateGlobalEarlyAccessRequestRequestDTO } from '@/modules/v1/early-access-requests/presentation';
import type { CreateGlobalEarlyAccessRequestQueryResult } from '../results';
import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import { findBusinessTypeBySlugRepository } from '@/modules/v1/businesses';
import { throwNotFoundException, throwRequestConflictException } from '@/shared/v1/exceptions';
import { EventName, ResponseMessage, ValidationMessage } from '@/shared/v1/enums';
import { createEarlyAccessRequestRepository, findEarlyAccessRequestByPhoneNumberRepository, findEarlyAccessRequestBySlugRepository, generateChashaEarlyAccessRequestCodeHelper } from '@/modules/v1/early-access-requests/infrastructure';
import { eventEmitterConfig } from '@/config/emitter';

export const createGlobalEarlyAccessRequestCommandHandler = async (createEarlyAccessRequestData: CreateGlobalEarlyAccessRequestRequestDTO, lang: Language): CreateGlobalEarlyAccessRequestQueryResult => {
  const businessTypeIsExist = await findBusinessTypeBySlugRepository()({ businessTypeSlug: createEarlyAccessRequestData.earlyAccessRequestBusinessTypeSlug as string });

  if (businessTypeIsExist === null) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        earlyAccessRequestBusinessTypeSlug: [t(ValidationMessages, ValidationMessage.EARLY_ACCESS_REQUEST_BUSINESS_TYPE_NOT_FOUND, lang)],
      },
    });
  }

  const earlyAccessRequestIsExist = await findEarlyAccessRequestByPhoneNumberRepository()({ earlyAccessRequestPhoneNumber: createEarlyAccessRequestData.earlyAccessRequestPhoneNumber as string });

  if (earlyAccessRequestIsExist !== null) {
    throwRequestConflictException({
      message: t(ResponseMessages, ResponseMessage.DATA_CONFLICT, lang),
      details: {
        earlyAccessRequestPhoneNumber: [t(ValidationMessages, ValidationMessage.EARLY_ACCESS_REQUEST_ALREADY_EXISTS, lang)],
      },
    });
  }

  const ealryAccessRequestPendingStatus = await findEarlyAccessRequestBySlugRepository()({ earlyAccessRequestStatusSlug: 'pending' });
  const earlyAccessRequestCode = generateChashaEarlyAccessRequestCodeHelper();

  await createEarlyAccessRequestRepository()({
    earlyAccessRequestBusinessTypeId: businessTypeIsExist?.businessTypeId as number,
    earlyAccessRequestFullName: createEarlyAccessRequestData.earlyAccessRequestFullName as string,
    earlyAccessRequestPhoneNumber: createEarlyAccessRequestData.earlyAccessRequestPhoneNumber as string,
    earlyAccessRequestBusinessName: createEarlyAccessRequestData.earlyAccessRequestBusinessName as string,
    earlyAccessRequestStatusId: ealryAccessRequestPendingStatus?.earlyAccessRequestStatusId as number,
    earlyAccessRequestCode,
  });

  eventEmitterConfig.emit(EventName.EARLY_ACCESS_REQUEST_CREATED, {
    earlyAccessRequestPatternCode: 1234 /* --> Development <-- */,
    earlyAccessRequestPhoneNumber: createEarlyAccessRequestData.earlyAccessRequestPhoneNumber,
    earlyAccessRequestSmsParameters: [createEarlyAccessRequestData.earlyAccessRequestFullName, createEarlyAccessRequestData.earlyAccessRequestBusinessName],
  });

  return {
    earlyAccessRequestCode,
  };
};
