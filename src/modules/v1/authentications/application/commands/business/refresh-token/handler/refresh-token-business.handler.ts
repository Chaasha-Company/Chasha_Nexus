import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import type { RefreshTokenBusinessRequestDTO, RefreshTokenBusinessResponseDTO } from '@/modules/v1/authentications/presentation';
import type { BusinessEmployeeAuthTokenPayload } from '@/shared';
import ms from 'ms';
import { createAccessTokenProvider, createRefreshTokenProvider, hashPasswordProvider, passwordCheckerProvider, verifyRefreshTokenProvider } from '@/modules/v1/authentications/infrastructure';
import { throwUnAuthenticatedException } from '@/shared/v1/exceptions';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';
import { findBusinessEmployeeSessionByIdRepository } from '@/modules/v1/business-employee-sessions';
import { updateBusinessEmployeeSessionRepository } from '@/modules/v1/business-employee-sessions/infrastructure/repositories/update-business-employee-session.repository';
import { EnvValueConfig } from '@/config/env';

export const refreshTokenBusinessCommandHandler = async (tokenData: RefreshTokenBusinessRequestDTO, lang: Language): Promise<RefreshTokenBusinessResponseDTO> => {
  const { refreshTokenBusiness } = tokenData;

  const verifiedToken = verifyRefreshTokenProvider()(refreshTokenBusiness as string) as BusinessEmployeeAuthTokenPayload;

  if (verifiedToken === null) {
    throwUnAuthenticatedException({
      message: t(ResponseMessages, ResponseMessage.UNAUTHORIZED, lang),
      details: {
        refreshTokenBusiness: [t(ValidationMessages, ValidationMessage.BUSINESS_REFRESH_TOKEN_INVALID, lang)],
      },
    });
  }

  if (verifiedToken.auth_token_type !== 'business_employee') {
    throwUnAuthenticatedException({
      message: t(ResponseMessages, ResponseMessage.UNAUTHORIZED, lang),
      details: {
        refreshTokenBusiness: [t(ValidationMessages, ValidationMessage.BUSINESS_REFRESH_TOKEN_INVALID, lang)],
      },
    });
  }

  const businessEmployeeSessionIsExist = await findBusinessEmployeeSessionByIdRepository()({ businessEmployeeSessionId: verifiedToken.auth_token_session_id });

  if (businessEmployeeSessionIsExist === null) {
    throwUnAuthenticatedException({
      message: t(ResponseMessages, ResponseMessage.UNAUTHORIZED, lang),
      details: {
        refreshTokenBusiness: [t(ValidationMessages, ValidationMessage.BUSINESS_REFRESH_TOKEN_INVALID, lang)],
      },
    });
  }

  if ((businessEmployeeSessionIsExist?.businessEmployeeSessionExpiresAt as Date) < new Date()) {
    throwUnAuthenticatedException({
      message: t(ResponseMessages, ResponseMessage.UNAUTHORIZED, lang),
      details: {
        refreshTokenBusiness: [t(ValidationMessages, ValidationMessage.BUSINESS_REFRESH_TOKEN_INVALID, lang)],
      },
    });
  }

  const isRefreshTokenValid = await passwordCheckerProvider()(refreshTokenBusiness as string, businessEmployeeSessionIsExist?.businessEmployeeSessionRefreshToken as string);
  if (isRefreshTokenValid === false) {
    throwUnAuthenticatedException({
      message: t(ResponseMessages, ResponseMessage.UNAUTHORIZED, lang),
      details: {
        refreshTokenBusiness: [t(ValidationMessages, ValidationMessage.BUSINESS_REFRESH_TOKEN_INVALID, lang)],
      },
    });
  }

  const authTokenPayload: BusinessEmployeeAuthTokenPayload = {
    auth_token_id: verifiedToken.auth_token_id,
    auth_token_business_id: verifiedToken.auth_token_business_id,
    auth_token_session_id: businessEmployeeSessionIsExist?.businessEmployeeSessionId as string,
    auth_token_role_id: verifiedToken.auth_token_role_id,
    auth_token_type: 'business_employee',
  };

  const accessToken = createAccessTokenProvider()(authTokenPayload);
  const refreshToken = createRefreshTokenProvider()(authTokenPayload);

  await updateBusinessEmployeeSessionRepository()({
    businessEmployeeSessionId: businessEmployeeSessionIsExist?.businessEmployeeSessionId as string,
    businessEmployeeSessionRefreshToken: await hashPasswordProvider()(refreshToken),
    businessEmployeeSessionLastActivityAt: new Date(),
    businessEmployeeSessionExpiresAt: new Date(Date.now() + ms(EnvValueConfig.JWT_REFRESH_TOKEN_EXPIRES_AT)),
  });

  return {
    newBusinessAccessToken: accessToken,
    newBusinessRefreshToken: refreshToken,
  };
};
