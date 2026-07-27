import type { BusinessEmployeeAuthTokenPayload, PlatformAdminAuthTokenPayload } from '@/shared/v1/types/auth/token';
import type { VerifyRefreshTokenProviderContract } from '@/modules/v1/auth/domain';
import jwt from 'jsonwebtoken';
import { EnvValueConfig } from '@/config/env';

export const verifyRefreshTokenProvider =
  (): VerifyRefreshTokenProviderContract =>
  (token: string): string | BusinessEmployeeAuthTokenPayload | PlatformAdminAuthTokenPayload | null => {
    try {
      const tokenPayload = jwt.verify(token, EnvValueConfig.JWT_REFRESH_TOKEN_SECRET_KEY);
      return tokenPayload as string | BusinessEmployeeAuthTokenPayload | PlatformAdminAuthTokenPayload;
    } catch {
      return null;
    }
  };
