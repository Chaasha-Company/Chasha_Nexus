import type { BusinessEmployeeAuthTokenPayload, PlatformAdminAuthTokenPayload } from '@/shared/v1/types/auth/token';
import type { CreateRefreshTokenProviderContract } from '@/modules/v1/authentications/domain';
import jwt from 'jsonwebtoken';
import { EnvValueConfig } from '@/config/env';

export const createRefreshTokenProvider =
  (): CreateRefreshTokenProviderContract =>
  (tokenPayload: PlatformAdminAuthTokenPayload | BusinessEmployeeAuthTokenPayload): string =>
    jwt.sign(
      {
        exp: EnvValueConfig.JWT_REFRESH_TOKEN_EXPIRES_AT,
        data: tokenPayload,
      },
      EnvValueConfig.JWT_REFRESH_TOKEN_SECRET_KEY,
    );
