import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import type { LoginWithPhoneNumberBusinessCommand } from '../login-with-phone-number-business.command';
import type { BusinessEmployeeAuthTokenPayload } from '@/shared/v1/types/auth/token';
import type { LoginWithPhoneNumberBusinessMobileResponseDTO } from '@/modules/v1/authentications/presentation';
import ms from 'ms';
import { findBusinessEmployeeByPhoneNumberRepository } from '@/modules/v1/business-employees';
import { throwBadRequestException, throwNotFoundException } from '@/shared/v1/exceptions';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';
import { createAccessTokenProvider, createRefreshTokenProvider, hashPasswordProvider, passwordCheckerProvider } from '@/modules/v1/authentications/infrastructure';
import { createBusinessEmployeeSessionRepository } from '@/modules/v1/business-employee-sessions';
import { EnvValueConfig } from '@/config/env';

export const loginWithPhoneNumberBusinessCommandHandler = async (loginData: LoginWithPhoneNumberBusinessCommand, lang: Language): Promise<LoginWithPhoneNumberBusinessMobileResponseDTO> => {
  const findBusinessEmployee = findBusinessEmployeeByPhoneNumberRepository();

  const businessEmployee = await findBusinessEmployee({
    businessEmployeePhoneNumber: loginData.loginPhoneNumber,
  });

  if (!businessEmployee) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        loginPhoneNumber: [t(ValidationMessages, ValidationMessage.BUSINESS_LOGIN_NOT_FOUND_PHONE_NUMBER, lang)],
      },
    });
  }

  const passwordChecker = passwordCheckerProvider();

  const passwordIsCorrect = await passwordChecker(loginData.loginPassword, businessEmployee?.businessEmployeePassword as string);

  if (!passwordIsCorrect) {
    throwBadRequestException({
      message: t(ResponseMessages, ResponseMessage.DATA_CONFLICT, lang),
      details: {
        loginPassword: [t(ValidationMessages, ValidationMessage.BUSINESS_LOGIN_PASSWORD_INCORRECT, lang)],
      },
    });
  }

  const sessionId = crypto.randomUUID();
  const authTokenPayload: BusinessEmployeeAuthTokenPayload = {
    auth_token_id: businessEmployee?.businessEmployeeId as string,
    auth_token_business_id: businessEmployee?.businessEmployeeBusinessId as string,
    auth_token_session_id: sessionId,
    auth_token_type: 'business_employee',
  };

  const accessToken = createAccessTokenProvider()(authTokenPayload);
  const refreshToken = createRefreshTokenProvider()(authTokenPayload);

  await createBusinessEmployeeSessionRepository()({
    businessEmployeeSessionId: sessionId,
    businessEmployeeSessionUserId: businessEmployee?.businessEmployeeId as string,
    businessEmployeeSessionRefreshToken: await hashPasswordProvider()(refreshToken),
    businessEmployeeSessionIpAddress: loginData.loginIpAddress,
    businessEmployeeSessionUserAgent: loginData.loginUserAgent,
    businessEmployeeSessionLastActivityAt: new Date(),
    businessEmployeeSessionExpiresAt: new Date(Date.now() + ms(EnvValueConfig.JWT_REFRESH_TOKEN_EXPIRES_AT)),
  });

  return {
    loginAccessToken: accessToken,
    loginRefreshToken: refreshToken,
  };
};
