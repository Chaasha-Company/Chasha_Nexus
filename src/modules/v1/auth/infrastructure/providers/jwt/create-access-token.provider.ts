import type { BusinessEmployeeAuthTokenPayload, PlatformAdminAuthTokenPayload } from '@/shared/v1/types/auth/token';
import type { CreateAccessTokenProviderContract } from '@/modules/v1/auth/domain/contracts';
import jwt from 'jsonwebtoken';
import { EnvValueConfig } from '@/config/env';

export const createAccessTokenProvider =
  (): CreateAccessTokenProviderContract =>
  (tokenPayload: PlatformAdminAuthTokenPayload | BusinessEmployeeAuthTokenPayload): string =>
    jwt.sign(
      {
        exp: EnvValueConfig.JWT_ACCESS_TOKEN_EXPIRES_AT,
        data: tokenPayload,
      },
      EnvValueConfig.JWT_ACCESS_TOKEN_SECRET_KEY,
    );
