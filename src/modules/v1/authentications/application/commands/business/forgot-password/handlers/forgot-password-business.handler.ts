import type { ForgotPasswordBusinessCommand } from '../forgot-password-business.command';
import { findBusinessEmployeeByPhoneNumberRepository } from '@/modules/v1/business-employees';
import { setCacheHelper } from '@/infrastructure/cache-system/node-cache';
import { CacheKey } from '@/shared/v1/enums/cache-key';
import { createHash, randomBytes } from 'crypto';
import { EnvValueConfig } from '@/config/env';

export const forgotPasswordBusinessCommandHandler = async (forgotPasswordData: ForgotPasswordBusinessCommand): Promise<void> => {
  const businessEmployeeExist = await findBusinessEmployeeByPhoneNumberRepository()({
    businessEmployeePhoneNumber: forgotPasswordData.forgotPasswordBusinessPhoneNumber as string,
  });

  if (businessEmployeeExist === null) return;

  const resetPasswordToken = randomBytes(32).toString('hex');

  const resetPasswordTokenHash = createHash('sha256').update(resetPasswordToken).digest('hex');

  const cacheSet = setCacheHelper();
  cacheSet({
    cacheName: `${CacheKey.BUSINESS_FORGOT_PASSWORD}:${resetPasswordTokenHash}`,
    cacheTTL: EnvValueConfig.BUSINESS_EMPLOYEE_FORGOT_PASSWORD_EXPIRES_IN_SECONDS,
    cacheData: {
      forgotPasswordBusinessEmployeeId: businessEmployeeExist.businessEmployeeId as string,
      forgetPasswordBusinessEmployeePhoneNumber: businessEmployeeExist.businessEmployeePhoneNumber as string,
      forgotPasswordBusinessCreatedAt: new Date(),
    },
  });

  // send sms
};
