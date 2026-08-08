import type { ForgotPasswordVerifyBusinessCommand } from '../forgot-password-verify-business.command';
import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import { deleteCacheHelper, getCacheHelper, type ForgotPasswordVerifyBusinessSession } from '@/infrastructure/cache-system/node-cache';
import { createHash } from 'crypto';
import { CacheKey, ResponseMessage, ValidationMessage } from '@/shared/v1/enums';
import { throwBadRequestException } from '@/shared/v1/exceptions';
import { findBusinessEmployeeByPhoneNumberRepository, updateBusinessEmployeeRepository } from '@/modules/v1/business-employees';
import { hashPasswordProvider } from '@/modules/v1/authentications/infrastructure';
import { revokedAllBusinessEmployeeSessionByIdRepository } from '@/modules/v1/business-employee-sessions';

export const forgotPasswordVerifyBusinessCommandHandler = async (forgotPasswordVerifyData: ForgotPasswordVerifyBusinessCommand, lang: Language): Promise<void> => {
  const resetPasswordTokenHash = createHash('sha256').update(forgotPasswordVerifyData.forgotPasswordVerifyResetToken).digest('hex');

  const resetPasswordSessionData = getCacheHelper()<ForgotPasswordVerifyBusinessSession>({
    cacheName: `${CacheKey.BUSINESS_FORGOT_PASSWORD}:${resetPasswordTokenHash}`,
  });

  if (resetPasswordSessionData === undefined) {
    throwBadRequestException({
      message: t(ResponseMessages, ResponseMessage.DATA_CONFLICT, lang),
      details: {
        forgotPasswordVerifyResetToken: [t(ValidationMessages, ValidationMessage.BUSINESS_FORGOT_PASSWORD_RESET_SESSION_INVALID, lang)],
      },
    });
  }

  const businessEmployeeIsExist = await findBusinessEmployeeByPhoneNumberRepository()({
    businessEmployeePhoneNumber: resetPasswordSessionData?.forgotPasswordBusinessEmployeePhoneNumber as string,
  });

  if (businessEmployeeIsExist === null) {
    throwBadRequestException({
      message: t(ResponseMessages, ResponseMessage.DATA_CONFLICT, lang),
      details: {
        forgotPasswordVerifyResetToken: [t(ValidationMessages, ValidationMessage.BUSINESS_FORGOT_PASSWORD_RESET_SESSION_INVALID, lang)],
      },
    });
  }

  const hashedNewPassword = await hashPasswordProvider()(forgotPasswordVerifyData.forgotPasswordVerifyNewPassword);

  await updateBusinessEmployeeRepository()({
    businessEmployeeId: resetPasswordSessionData?.forgotPasswordBusinessEmployeeId as string,
    businessEmployeePassword: hashedNewPassword,
  });

  await revokedAllBusinessEmployeeSessionByIdRepository()({
    businessEmployeeSessionUserId: resetPasswordSessionData?.forgotPasswordBusinessEmployeeId as string,
  });

  deleteCacheHelper()({
    cacheName: `${CacheKey.BUSINESS_FORGOT_PASSWORD}:${resetPasswordTokenHash}`,
  });
};
